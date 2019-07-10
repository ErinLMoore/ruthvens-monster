import Phaser from 'phaser'

import Spring1 from './scenes/spring-1'
import Spring2 from './scenes/spring-2'

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
      debug: true
    }
  },
  plugins: {
    scene: [
      { key: 'DialogPlugin', plugin: DialogPlugin, mapping: 'dialog' },
      { key: 'LifebarPlugin', plugin: LifebarPlugin, mapping: 'lifebar' }
    ]
  },
  scene: [Spring1, Spring2]
}
new Phaser.Game(gameConfig)
