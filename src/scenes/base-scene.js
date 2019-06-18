import Phaser from 'phaser'
import { playerAnimations } from '../animations/player'
import { miscAnimations } from '../animations/misc'
import { enemyAnimations } from '../animations/enemies'
import { setupEnemy, updateEnemy } from '../characters/enemies.js'
import { setupPlayer, updatePlayer } from '../characters/player.js'
import assetsDict from '../assets/images.js'
import dialogueDict from '../assets/dialogue.js'
import characterLocations  from '../scenes/characterlocations.js'
import characterConfig  from '../characters/characterconfig.js'

export default class BaseScene extends Phaser.Scene {
  constructor () {
    super()
      this.TILE_SIZE = 30
      this.WORLD_SIZE = {width: 1500, height:960}
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
    characterLocations[this.sceneName].forEach(sprite => {
      let spriteSize = characterConfig[sprite.type].size
      this.load.spritesheet(sprite.type, assetsDict.sprites[sprite.type], { frameWidth: spriteSize[0], frameHeight: spriteSize[1] })
    })
    this.preloadDialogueImages(this.dialogueList)
  }
  

  buildMap() {
    var map
    var tiles
    var backtiles

    map = this.make.tilemap({ key: this.sceneName+'-map', tileWidth: this.TILE_SIZE, tileHeight: this.TILE_SIZE })


    this.cameras.main.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height)
    this.physics.world.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height)

    tiles = map.addTilesetImage('springlarge2', 'tiles')
    backtiles = map.addTilesetImage('spring-background-tiles-large', 'backtiles')
    this.backgroundLayer = map.createStaticLayer('background', backtiles, 0, 0)
    this.groundLayer = map.createStaticLayer('ground', tiles, 0, 0)
    this.groundLayer.setCollisionBetween(0, 200)
    this.blocksLayer = map.createStaticLayer('blocks', tiles, 0, 0)
    this.blocksLayer.setCollisionBetween(0, 200)
    this.waterLayer = map.createStaticLayer('water', tiles, 0, 0) // eslint-disable-lin
  }

  create () {

    var mapthings
    mapthings = this.buildMap()
    
    characterLocations[this.sceneName].forEach( item => {
      //if you put them right on the tile they'll get stuck.
      if (item.enemy == true) {
        this.enemies.push({name: item.type, enemy: this.physics.add.sprite(this.tilesFromZero(item.location[0]), this.tilesFromBottom(item.location[1])+3, item.type)})
      }
    })
    
    this.enemies.forEach(e => {
      setupEnemy(e.name, e.enemy)
      this.physics.add.collider(e.enemy, this.groundLayer)
      this.physics.add.collider(e.enemy, this.blocksLayer)
      // this.physics.add.collider(this.enemies[key], this.player)
    })

    this.player = this.setupPlayer()
    let animations = playerAnimations.concat(miscAnimations).concat(enemyAnimations)
    animations.forEach((animation) => {
      this.anims.create(animation())
    })
    this.waterLayer.setDepth(1)
    this.backgroundLayer.setDepth(0)
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
    // this.sky.tilePositionX = -(this.cameras.x * 0.7)
    updatePlayer(this.player)
    this.enemies = this.enemies.filter(e => e.enemy.destroyed === false)
    this.enemies.forEach(e => {
      updateEnemy(e.name, e.enemy, {x: this.player.body.center.x, y: this.player.body.center.y},  this.player.getFacing() )
      this.handleHits(e.enemy)
    })
  }
  
    
  addASprite(name) {
    // location = characterLocations[this.sceneName].filter (character => character.type == name)[0].location
    // console.log(location)
    return this.physics.add.sprite(this.tilesFromZero(4.5), this.tilesFromBottom(5)+3, 'hapax').setScale(2)
    // return this.physics.add.sprite(this.tilesFromZero(location[0]), this.tilesFromBottom(location[1])+3, name)
  }
  
  setupPlayer() {
    let player = this.addASprite('hapax')
    // player.setScale(2)
    // let player = this.physics.add.sprite(this.tilesFromZero(4.5), this.tilesFromBottom(5)+3, 'hapax').setScale(2)
    setupPlayer(player)
    return player
  }

  destroyAll() {
    this.player.destroySelf()
    this.enemies.forEach(e => {e.enemy.destroySelf()})
  }
  
  handleHits (enemy) {
    let enemyHitsPlayer = false
    let intersecting = this.phaser.Geom.Intersects.RectangleToRectangle(enemy.getBounds(), this.player.getBounds())

    if (intersecting) {
      if ((this.player.currentState == 'bite' || this.player.currentState == 'smash') && enemy.hitcooldown == 0) { 
        enemy.stateMachine.transition('takingDamage') 
        if (this.player.currentState == 'smash') {
          enemy.stateMachine.transition('launched')
        }
      }
      else { enemyHitsPlayer = enemyHitsPlayer || enemy.currentState == 'attack' }
    }
    if ( enemyHitsPlayer && this.player.hitcooldown <= 0) {
      this.player.stateMachine.transition('takingDamage')
      this.lifebar.setText(this.player.hp)
    }
    if (enemy.hp <= 0 && this.player.currentState == 'bite' && this.checkIfEnemyCanBeEaten(enemy, this.player)) {
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
      this.load.image(dialogueItem[0], assetsDict.portraits[dialogueItem[0]])
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
  
  createLightBeam(origin, length, width=8, angle=100) {
    let height = 8
    var data = [ 
      0, height,
      width, 0,
      angle+(width*3),length,
      angle,length
    ]
    this.add.polygon(origin[0], origin[1], data,  0xffffbb).setBlendMode(this.phaser.BlendModes.SCREEN).setAlpha(.4)

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
