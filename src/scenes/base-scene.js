import Phaser from 'phaser'
import { playerAnimations } from '../animations/player'
import { miscAnimations } from '../animations/misc'
import { enemyAnimations } from '../animations/enemies'
import { setupEnemy, updateEnemy } from '../characters/enemies.js'
import { setupPlayer, updatePlayer } from '../characters/player.js'
import { assetsDict } from '../assets/images.js'
import { dialogueDict } from '../assets/dialogue.js'
import { enemiesDict } from '../scenes/enemylocations.js'

export default class BaseScene extends Phaser.Scene {
  constructor () {
    super()
      this.TILE_SIZE = 40
      this.WORLD_SIZE = {width: 2000, height:1280}
      this.player
      this.playerActive = false
      this.cursors
      this.spacekey
      this.gameOver = false
      this.sky
      this.phaser = Phaser
      this.textIndex = -1
      this.sceneName = this.constructor.name
      this.dialogueList = dialogueDict[this.sceneName]
      this.enemies = []
      this.endingIntersection
      Phaser.Scene.call(this, {key: this.sceneName})
  }
  
  preload () {
    this.preloadDialogueImages(this.dialogueList)
  }
  
  buildMap() {
    var map
    var tiles

    map = this.make.tilemap({ key: this.sceneName+'-map', tileWidth: this.TILE_SIZE, tileHeight: this.TILE_SIZE })
    this.sky = this.add.image(1000, 780, 'background')
    this.sky.fixedToCamera = true

    this.cameras.main.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height)
    this.physics.world.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height)

    tiles = map.addTilesetImage('springlarge', 'tiles')
    this.blocksLayer = map.createStaticLayer('blocks', tiles, 0, 0)
    this.blocksLayer.setCollisionBetween(0, 200)
    this.groundLayer = map.createStaticLayer('ground', tiles, 0, 0)
    this.groundLayer.setCollisionBetween(0, 200)
    
    return {map, tiles}
  }

  create () {

    var mapthings
    mapthings = this.buildMap()
    
    enemiesDict[this.sceneName].forEach( item => {
      this.enemies.push({name: item.type, enemy: this.physics.add.sprite(this.tilesFromZero(item.location[0]), this.tilesFromBottom(item.location[1]), item.type)})
    })
    
    this.enemies.forEach(e => {
      setupEnemy(e.name, e.enemy)
      this.physics.add.collider(e.enemy, this.groundLayer)
      this.physics.add.collider(e.enemy, this.blocksLayer)
      // this.physics.add.collider(this.enemies[key], this.player)
    })
    
    this.player = this.physics.add.sprite(this.tilesFromZero(4.5), this.tilesFromBottom(5), 'hapax').setScale(2)
    this.player = setupPlayer(this.player)

    mapthings.map.createStaticLayer('water', mapthings.tiles, 0, 0) // eslint-disable-line
    
    let animations = playerAnimations.concat(miscAnimations).concat(enemyAnimations)
    animations.forEach((animation) => {
      this.anims.create(animation())
    })

    this.events.on('toggleActive', (isActive) => {this.playerActive = isActive}, this)
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
    this.spacekey = this.input.keyboard.addKey(this.phaser.Input.Keyboard.KeyCodes.SPACE)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.collider(this.player, this.groundLayer)
    this.physics.add.collider(this.player, this.blocksLayer, this.enableClimbPlatform)
    this.dialog.create()
    this.lifebar.create()
    this.lifebar.setText(this.player.hp)
  }

  update () {
    if (this.gameOver) { return }
    this.sky.tilePositionX = -(this.cameras.x * 0.7)
    updatePlayer(this.player)
    this.enemies = this.enemies.filter(e => e.enemy.destroyed === false)
    this.enemies.forEach(e => {
      updateEnemy(e.name, e.enemy, {x: this.player.body.center.x, y: this.player.body.center.y},  this.player.getFacing() )
      this.handleHits(e.enemy)
    })
  }
  
  destroyAll() {
    this.player.destroySelf()
    this.enemies.forEach(e => {e.enemy.destroySelf()})
  }
  
  handleHits (enemy) {
    let enemyHitsPlayer = false
    let intersecting = this.phaser.Geom.Intersects.RectangleToRectangle(enemy.getBounds(), this.player.getBounds())

    if (intersecting) {
      if ((this.player.currentState == 'bite' || this.player.currentState == 'smash') && enemy.hitcooldown == 0) { enemy.stateMachine.transition('takingDamage') }
      else { enemyHitsPlayer = enemyHitsPlayer || enemy.currentState == 'attack' }
    }
    if ( enemyHitsPlayer && this.player.hitcooldown <= 0) {
      this.player.stateMachine.transition('takingDamage')
      this.lifebar.setText(this.player.hp)
    }
    if (enemy.hp === 0 && this.player.currentState == 'bite' && this.checkIfEnemyCanBeEaten(enemy, this.player)) {
      this.player.stateMachine.transition('consuming')
      enemy.stateMachine.transition('gettingEaten')
      this.lifebar.setText(this.player.hp)
    }
  }
  
  checkIfEnemyCanBeEaten (enemy, player) {
    let relevantSide = player.flipX == true ? player.edges.left : player.edges.right
    
    if(Math.abs(enemy.body.center.x - relevantSide) < enemy.body.halfWidth ){
      return true
    }
    else {return false}
  }
  
  preloadDialogueImages (dialogueList) {
      dialogueList.forEach( dialogueItem => {
      this.load.image(dialogueItem[0], assetsDict.characters[dialogueItem[0]])
    })
  }
  
  enableClimbPlatform (player, platform) {
    let platformEdges = {
      "left": platform.pixelX - (platform.width/2),
      "right": platform.pixelX + (platform.width/2),
      "top": platform.pixelY - (platform.height/2),
      "bottom": platform.pixelY + (platform.height/2)
    }
      player.platform = platformEdges
  }
  
  incrementText() {
    this.textIndex +=1
    setTimeout(() => { this.setNextText(this.textIndex) }, 1000)
  }
  
  setNextText(index) {
    if (index < this.dialogueList.length) {
      this.dialog.setText(this.dialogueList[index] , true)  
    }
    else {
      this.dialog.toggleWindow()
      this.events.emit('toggleActive', true)
    }
  }
  
  tilesFromBottom(number) {
    return this.WORLD_SIZE.height - (this.TILE_SIZE*number)
  }
  
  tilesFromZero(number) {
    return this.TILE_SIZE*number
  }
  
  tilesFromRight(number) {
    return this.WORLD_SIZE.width - (this.TILE_SIZE*number)
  }
}
