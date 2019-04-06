import Phaser from 'phaser'

import Scene1 from './scenes/scene-1'
import Scene2 from './scenes/scene-2'
  
import { DialogPlugin } from './plugins/dialog'
import { LifebarPlugin } from './plugins/lifebar'

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 640,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  },
  plugins: {
    scene: [
      { key: 'DialogPlugin', plugin: DialogPlugin, mapping: 'dialog' },
      { key: 'LifebarPlugin', plugin: LifebarPlugin, mapping: 'lifebar' }
    ]
  },
  scene: [Scene1, Scene2]
}
new Phaser.Game(gameConfig)
