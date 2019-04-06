import { createFrames } from '../helpers/helper_functions.js'

let walk, idle, bite, climb, rearup, rear, reardown, crouch, sleep, consume, takedamage, fall, smash

export const playerAnimations = [

  walk = () => ({
    key: 'walk',
    frames: createFrames('hapax', [0, 1, 2, 3, 4, 5, 6, 7]),
    frameRate: 10,
    repeat: -1
  }),

  idle = () => ({
    key: 'idle',
    frames: createFrames('hapax', [8, 9, 10, 10, 9]),
    frameRate: 3,
    hideOnComplete: true,
    repeat: -1
  }),

  bite = () => ({
    key: 'bite',
    frames: createFrames('hapax', [11, 12, 11]),
    frameRate: 7,
    repeat: -1
  }),

  climb = () => ({
    key: 'climb',
    frames: createFrames('hapax', [13, 14, 15, 16]),
    frameRate: 10,
    repeat: -1
  }),

  rearup = () => ({
    key: 'rearup',
    frames: createFrames('hapax', [13, 14, 15, 16]),
    frameRate: 10,
    repeat: 1
  }),
  
  rear = () => ({
    key: 'rear',
    frames: createFrames('hapax', [16]),
    frameRate: 1,
    repeat: 1
  }),
  
  reardown = () => ({
    key: 'reardown',
    frames: createFrames('hapax', [16, 15, 14, 13]),
    frameRate: 10,
    repeat: 1
  }),
  
  smash = () => ({
    key: 'smash',
    frames: createFrames('hapax', [17, 17, 18, 19]),
    frameRate: 10,
    repeat: 1
  }),

  crouch = () => ({
    key: 'crouch',
    frames: createFrames('hapax', [22,23,24,23]),
    frameRate: 3,
    repeat: -1
  }),

  sleep = () => ({
    key: 'sleep',
    frames: createFrames('hapax', [25, 26, 27, 27, 27, 26, 25]),
    frameRate: 3,
    repeat: -1
  }),
  
  consume = () => ({
    key: 'consume',
    frames: createFrames('hapax', [28, 6, 29, 30, 30, 31, 31, 30, 30, 32]),
    frameRate: 3,
    repeat: -1
  }),
  
   takedamage = () => ({
    key: 'damage',
    frames: createFrames('hapax', [23]),
    frameRate: 3,
    repeat: -1
  }),
  
 fall = () => ({
    key: 'fall',
    frames: createFrames('hapax', [20,21]),
    frameRate: 3,
    repeat: -1
  })

]
