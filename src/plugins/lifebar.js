
import Phaser from 'phaser'

export class LifebarPlugin extends Phaser.Plugins.ScenePlugin {
  constructor (scene, pluginManager) {
    super(scene, pluginManager)
    this.pluginManager = pluginManager
    this.visible = true
    this.text
    this.graphics
    this.sceneOffset = 0// scene.game.config.height
  }

  create (arg_opts = {}) {
    let defaults = {
      borderThickness: 3,
      borderColor: 0x907748,
      borderAlpha: 1,
      windowAlpha: 0.8,
      windowColor: 0x303030,
      windowHeight: 50,
      windowWidth: 50,
      padding: 24
    }
    this.opts = {}

    for (var property in defaults) {
      this.opts[property] = arg_opts[property] || defaults[property]
    }

    this._createWindow()
    // this.toggleWindow()
    this.setText('HELLO')
    this.graphics.scrollFactorX = 0
    this.graphics.scrollFactorY = 0
  }

  toggleWindow () {
    this.visible = !this.visible
    if (this.text) this.text.visible = this.visible
    if (this.graphics) this.graphics.visible = this.visible
    this.scene.events.emit('toggleActive', !this.visible)
  }

  setText (text) {
    this._setText(text)
    this.text.scrollFactorX = 0
    this.text.scrollFactorY = 0
  }

  shutdown () {
    this.graphics.clear()
    if (this.text) this.text.destroy()
  }

  destroy () {
    this.shutdown()
    this.scene = undefined
  }

  _createWindow () {
    var dimensions = this._calculateWindowDimensions()
    this.graphics = this.scene.add.graphics()
    this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight)
    this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight)
  }

  _createInnerWindow (x, y, rectWidth, rectHeight) {
    this.graphics.fillStyle(this.opts.windowColor, this.opts.windowAlpha)
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1)
  }

  _createOuterWindow (x, y, rectWidth, rectHeight) {
    this.graphics.lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
    this.graphics.strokeRect(x, y, rectWidth, rectHeight)
  }

  _getGameWidth () {
    return (this.scene.sys.game.config.width)
  }

  _getGameHeight () {
    return this.scene.sys.game.config.height
  }

  _getWindowY () {
    return (this.opts.padding)
  }

  _getWindowX () {
    return (this._getGameWidth() - this.opts.padding - this.opts.windowWidth)
  }

  _calculateWindowDimensions () {
    var x = this._getWindowX()
    var y = this._getWindowY()
    var rectWidth = this.opts.windowWidth
    var rectHeight = this.opts.windowHeight
    return {
      x,
      y,
      rectWidth,
      rectHeight
    }
  }

  _setText (text) {
    if (this.text) this.text.destroy()
    var x = this._getWindowX() + 10
    var y = this._getWindowY() + 10

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: { width: this._getGameWidth() - (this.opts.padding * 2) - 80 }
      }
    })
  }
}
