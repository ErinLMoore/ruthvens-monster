import BaseScene from './base-scene'
import { assetsDict } from '../assets/images.js'
import { updateMiscSprite } from '../characters/misc'
import { setupEnemy, updateEnemy } from '../characters/enemies.js'

export default class Scene2 extends BaseScene {
  preload () {
    super.preload()
    this.load.tilemapTiledJSON(this.sceneName+'-map', assetsDict.maps.spring2)
    this.load.image('tiles', assetsDict.tiles.spring)
    this.load.image('background', assetsDict.backgrounds.spring)
    this.load.spritesheet('hapax', assetsDict.sprites.hapax, { frameWidth: 64, frameHeight: 48 })
    this.load.spritesheet('rarebit', assetsDict.enemies.rarebit, { frameWidth: 40, frameHeight: 32 })
    this.load.image('background', assetsDict.backgrounds.spring)
  }

  create () {
    super.create()
    this.player.x, this.player.y = this.tilesFromZero(2), this.tilesFromZero(3),
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

  }

}
