import BaseScene from './base-scene'
import assetsDict from '../assets/images.js'
import { updateMiscSprite } from '../characters/misc'
import { setupEnemy, updateEnemy } from '../characters/enemies.js'

export default class Scene1 extends BaseScene {
  preload () {
    super.preload()
    this.load.tilemapTiledJSON(this.sceneName+'-map', assetsDict.maps.spring)
    this.load.image('tiles', assetsDict.tiles.spring)
    this.load.image('backtiles', assetsDict.tiles.springback)
    // this.load.image('background', assetsDict.backgrounds.spring)
    // this.load.spritesheet('hapax', assetsDict.sprites.hapax, { frameWidth: 64, frameHeight: 48 })
    // this.load.spritesheet('tam', assetsDict.sprites.tam, { frameWidth: 27, frameHeight: 29 })
  }

  create () {
    super.create()
    
    this.tam = this.physics.add.sprite(this.tilesFromZero(7), this.tilesFromBottom(4), 'tam')
    this.tam.body.allowGravity= false

    this.player.stateMachine.transition('controlled')
    this.player.currentState = 'sleep'
    this.events.on('endOfText', () => { this.incrementText() }, this)
    this.input.keyboard.on(this.phaser.Input.Keyboard.KeyCodes.SPACE, (event) => {this.incrementText()})   
    let timedEventOne = this.time.addEvent({ delay: 5000, callback: this.onTimedEventOne, callbackScope: this, repeat: 0, startAt: 5000 })
    let timedEventTwo = this.time.addEvent({ delay: 10000, callback: this.onTimedEventTwo, callbackScope: this, repeat: 0, startAt: 10000 })
    this.endTriggerRect = (this.tilesFromRight(3), this.tilesFromZero(16), 100, 100)
    this.createLightBeam([this.tilesFromZero(15)- this.TILE_SIZE/2, this.tilesFromZero(24)- this.TILE_SIZE/2], 450)
    this.createLightBeam([this.tilesFromZero(17), this.tilesFromZero(23)], 450)
    this.add.rectangle(this.endTriggerRect, 0xff00ff)
  }

  update () {
    super.update()

    if (this.tam) {updateMiscSprite(this.tam, 'float')}

    if (this.textIndex == 2 && this.playerActive == false) {
      this.player.stateMachine.transition('crouching')
    }
    if (this.tam && this.player.body.center.x > this.tam.body.center.x) {
      this.tam.flipX = true
    }
    this.endingIntersection = this.phaser.Geom.Intersects.RectangleToRectangle(this.endTriggerRect, this.player.getBounds())
    if (this.player.edges.right > this.endingIntersection[0] && this.player.edges.top < this.endingIntersection[16]) {
      var exiting = true
      this.onEndingIntersection()

    }
    if (this.player.controlled == true &! exiting) {
      this.input.keyboard.on('keydown', (event) => {
        this.events.emit('toggleActive', true)
        this.player.controlled = false
      })
    }
  }
  
  onEndingIntersection() {
    this.physics.world.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height, true, false)
    this.player.stateMachine.transition('controlled')
    this.player.currentState = 'walk'
    this.player.setVelocityX(75)
    this.player.facing = 'right'
    if (this.player.edges.left > this.tilesFromRight(0))
    {
      this.scene.switch('Scene2')
    }
  }
  
  onTimedEventOne () {
    this.textIndex = 0
    this.dialog.toggleWindow()
    this.setNextText(0)
  }
}
