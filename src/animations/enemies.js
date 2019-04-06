import { createFrames } from '../helpers/helper_functions.js'

let walkrarebit, idlerarebit, attackrarebit, deadrarebit, damagerarebit 

export const enemyAnimations = [
  walkrarebit = () => ({
    key: 'walkrarebit',
    frames: createFrames('rarebit', [4, 5, 6, 7, 8, 9]),
    frameRate: 6,
    repeat: -1
  }),

  idlerarebit = () => ({
    key: 'idlerarebit',
    frames: createFrames('rarebit', [0]),
    frameRate: 1,
    repeat: 0
  }),

  attackrarebit = () => ({
    key: 'attackrarebit',
    frames: createFrames('rarebit', [1, 2, 3, 2, 1, 1]),
    frameRate: 6,
    repeat: -1
  }),
  
  damagerarebit = () => ({
    key: 'damagerarebit',
    frames: createFrames('rarebit', [10]),
    frameRate: 1,
    repeat: 0
  }),

  deadrarebit = () => ({
    key: 'deadrarebit',
    frames: createFrames('rarebit', [10]),
    frameRate: 1,
    repeat: 0
  }),
]
