import { createFrames, createAnimation } from '../helpers/helper_functions.js'

let walk, idle, bite, climb, rearup, rear, reardown, crouch, sleep, consume, takedamage, fall, smash

export const playerAnimations = [
  walk = () => (createAnimation('walk_hapax', [0, 1, 2, 3, 4, 5, 6, 7], 10)),
  idle = () => (createAnimation('idle_hapax', [8, 9, 10, 10, 9], 3)),
  bite = () => (createAnimation('bite_hapax', [11, 12, 11], 7)),
  climb = () => (createAnimation('climb_hapax', [13, 14, 15, 16], 10)),
  rearup = () => (createAnimation('rearup_hapax', [13, 14, 15, 16], 10, 1)),
  rear = () => (createAnimation('rear_hapax', [16], 1, 1)),
  reardown = () => (createAnimation('reardown_hapax', [16, 15, 14, 13], 10, 1)),
  smash = () => (createAnimation('smash_hapax', [17, 17, 18, 19], 10, 1)),
  crouch = () => (createAnimation('crouch_hapax', [22, 23, 24, 23], 3)),
  sleep = () => (createAnimation('sleep_hapax', [25, 26, 27, 27, 27, 26, 25], 3)),
  consume = () => (createAnimation('consume_hapax', [28, 6, 29, 30, 30, 31, 31, 30, 30, 32], 3)),
  takedamage = () => (createAnimation('damage_hapax', [23], 3)),
  fall = () => (createAnimation('fall_hapax', [20, 21], 3))
]
