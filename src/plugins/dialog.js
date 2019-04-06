
import Phaser from 'phaser'

export class DialogPlugin extends Phaser.Plugins.ScenePlugin {
  constructor (scene, pluginManager) {
    super(scene, pluginManager)
    this.pluginManager = pluginManager
    this.eventCounter = 0
    this.visible = true
    this.text
    this.dialog
    this.graphics
    this.closeBtn
    this.sceneOffset = scene.game.config.height
    this.characterImage
    this.widthScaler = .75
  }
  
  create (arg_opts = {}) {
    let defaults = {
      borderThickness: 3,
      borderColor: 0x907748,
      borderAlpha: 1,
      windowAlpha: 0.8,
      windowColor: 0x303030,
      windowHeight: 75,
      padding: 24,
      closeBtnColor: 'darkgoldenrod',
      dialogSpeed: 3
    }
    this.opts = {}

    for (var property in defaults) {
      this.opts[property] = arg_opts[property] || defaults[property]
    }

    this._createWindow()
    this.toggleWindow()
  }

  toggleWindow () {
    this.visible = !this.visible
    if (this.text) this.text.visible = this.visible
    if (this.graphics) this.graphics.visible = this.visible
    if (this.closeBtn) this.closeBtn.visible = this.visible
    if (this.characterImage) this.characterImage.visible = this.visible
    this.scene.events.emit('toggleActive', !this.visible)
  }
  

  setText (text, animate) {
    if (this.visible) {
          let textLine = text[1]
      this.eventCounter = 0
      this.dialog = textLine .split('')
      if (this.timedEvent) this.timedEvent.remove()

      var tempText = animate ? '' : textLine
      this._setText(tempText)

      this._createCharacterGraphic(text[0])

      if (animate) {
        this.timedEvent = this.scene.time.addEvent({
          delay: 150 - (this.opts.dialogSpeed * 30),
          callback: this._animateText,
          callbackScope: this,
          loop: true
        })
      }
      this.text.scrollFactorX = 0
      this.text.scrollFactorY = 0
    }
  }

  shutdown () {
    if (this.timedEvent) this.timedEvent.remove()
    this.graphics.clear()
    // if (this.text) this.text.destroy()
    // if (this.characterImage) this.characterImage.destroy()
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
    this._createCloseModalButton()
    this._createCloseModalButtonBorder()
    this._createCharacterGraphic()
    this.graphics.scrollFactorX = 0
    this.graphics.scrollFactorY = 0
  }
  
  _createCharacterGraphic (character) {
    let x = this.opts.padding + 40
    let y = this._getWindowY() + 40
    if (this.characterImage) this.characterImage.destroy()
    this.characterImage = this.scene.add.image(x, y, character)
    this.characterImage.scrollFactorX = 0
    this.characterImage.scrollFactorY = 0
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
    return (this.scene.sys.game.config.width)* this.widthScaler
  }

  _getGameHeight () {
    return this.scene.sys.game.config.height
  }
  
  _getWindowY () {
    return (this.opts.windowHeight - this.opts.padding)
  }

  _calculateWindowDimensions () {
    var x = this.opts.padding 
    var y = this._getWindowY()
    var rectWidth = (this._getGameWidth() - (this.opts.padding * 2))
    var rectHeight = this.opts.windowHeight
    return {
      x,
      y,
      rectWidth,
      rectHeight
    }
  }

  _createCloseModalButton () {
    this.closeBtn = this.scene.make.text({
      x: (this._getGameWidth() - this.opts.padding - 14),
      y: this._getWindowY() + 3,
      text: 'X',
      style: {
        font: 'bold 10px Arial',
        fill: this.opts.closeBtnColor
      }
    })
    this.closeBtn.setInteractive()

    this.closeBtn.on('pointerover', function () {
      this.setTint(0xff0000)
    })
    this.closeBtn.on('pointerout', function () {
      this.clearTint()
    })
    this.closeBtn.on('pointerdown', function () {
      this.toggleWindow()
      this.shutdown()
    }.bind(this))
    this.closeBtn.scrollFactorX = 0
    this.closeBtn.scrollFactorY = 0
  }

  _createCloseModalButtonBorder () {
    var x = (this._getGameWidth() - this.opts.padding - 20)
    var y = this._getWindowY()
    this.graphics.strokeRect(x, y, 20, 20)
  }

  _setText (text) {
    if (this.text) this.text.destroy()

    var x = this.opts.padding + 80
    var y = this._getWindowY() + 10

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: { width: this._getGameWidth() - (this.opts.padding * 2) - 80}
      }
    })
  }

  _animateText () {
    this.eventCounter++
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1])
    if (this.eventCounter === this.dialog.length) { 
      this.timedEvent.remove()
      this.scene.events.emit('endOfText', true)
    }
  }
}
