import BaseScene from './base-scene'

export default class Spring2 extends BaseScene {

  create () {
    super.create()
    this.player.stateMachine.transition('idling')
    this.events.on('endOfText', () => { this.incrementText() }, this)
    this.input.keyboard.on(this.phaser.Input.Keyboard.KeyCodes.SPACE, (event) => {this.incrementText()})   
    this.endTriggerRect = {x: this.tilesFromRight(3), y: this.tilesFromZero(12), width: 120, height:120}
  }

  update () {
    super.update()
    this.endingIntersection = this.phaser.Geom.Intersects.RectangleToRectangle(this.endTriggerRect, this.player.getBounds())
    if (this.endingIntersection) {this.onEndingIntersection()}
  }
  
  onEndingIntersection() {
    console.log('ending')
  }

}
