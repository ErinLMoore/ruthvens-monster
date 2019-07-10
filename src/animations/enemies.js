import { createAnimation } from '../helpers/helper_functions.js'

let walk_rarebit, idle_rarebit, attack_rarebit, dead_rarebit, damage_rarebit
let walk_frorse, idle_frorse, attack_frorse, dead_frorse, damage_frorse

export const enemyAnimations = [
  walk_rarebit = () => (createAnimation('walk_rarebit', [4, 5, 6, 7, 8, 9], 6)),
  idle_rarebit = () => (createAnimation('idle_rarebit', [0], 1, 0)),
  attack_rarebit = () => (createAnimation('attack_rarebit', [1, 2, 3, 2, 1, 1], 6)),
  damage_rarebit = () => (createAnimation('damage_rarebit', [10], 1, 0)),
  dead_rarebit = () => (createAnimation('dead_rarebit', [10], 1, 0)),

  walk_frorse = () => (createAnimation('walk_frorse', [4, 5, 6, 7], 6)),
  idle_frorse = () => (createAnimation('idle_frorse', [3], 1, 0)),
  attack_frorse = () => (createAnimation('attack_frorse', [3, 1, 0, 0, 0, 1, 3], 6)),
  damage_frorse = () => (createAnimation('damage_frorse', [1], 1, 0)),
  dead_frorse = () => (createAnimation('dead_frorse', [2], 1, 0))

]
