import { createFrames } from '../helpers/helper_functions.js'

let float

export const miscAnimations = [
  float = () => ({
    key: 'float',
    frames: createFrames('tam', [0, 1, 2, 3]),
    frameRate: 3,
    repeat: -1
  })
]
