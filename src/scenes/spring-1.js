import BaseScene from './base-scene'
import assetsDict from '../assets/images.json'
import { updateMiscSprite } from '../characters/misc'
import { setupEnemy, updateEnemy } from '../characters/enemies.js'

export default class Spring1 extends BaseScene {

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
    let endingBoundary = [this.tilesFromRight(3), this.tilesFromZero(12), 100, 100]
    this.endTriggerRect =  new this.phaser.Geom.Rectangle(...endingBoundary)

    this.createLightBeam([this.tilesFromZero(15)- this.TILE_SIZE/2, this.tilesFromZero(24)- this.TILE_SIZE/2], 450)
    this.createLightBeam([this.tilesFromZero(16), this.tilesFromZero(24)], 430)
    this.physics.config.debug && this.add.rectangle(...endingBoundary, 0xff00ff)
    

    this.groundLayer.setTileLocationCallback(47, 15, 6, 6, () => {console.log('bye')}, this)
  }

  update () {
    super.update()
    if (this.tam) {updateMiscSprite(this.tam, 'float')}
    if (this.textIndex === 2 && this.playerActive === false) {
      this.player.stateMachine.transition('crouching')
    }
    if (this.tam && this.player.body.center.x > this.tam.body.center.x) {
      this.tam.flipX = true
    }
    // this.endingIntersection = this.phaser.Geom.Intersects.RectangleToRectangle(this.endTriggerRect, this.player.getBounds())
    // if (this.endingIntersection){
      // var exiting = true
      // this.onEndingIntersection()

    // }
    if (this.player.controlled === true &! this.exiting) {
      this.input.keyboard.on('keydown', (event) => {
        this.events.emit('toggleActive', true)
        this.player.controlled = false
      })
    }
  }
  
  onEndingIntersection() {
    // >:[]
    this.exiting = true
    this.physics.world.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height, true, false)
    this.player.stateMachine.transition('controlled')
    this.player.currentState = 'walk'
    this.player.setVelocityX(75)
    this.player.facing = 'right'
    if (this.player.edges.left > this.tilesFromRight(0))
    {
      this.scene.switch('Spring2')
    }
  }
  
  onTimedEventOne () {
    this.textIndex = 0
    this.dialog.toggleWindow()
    this.setNextText(0)
  }
}
