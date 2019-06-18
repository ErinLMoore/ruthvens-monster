const charactersConfig = {
  'hapax': {
    size: [64, 48]
  },
  'tam': {
    size: [27, 29]
  },
  'rarebit': {
    size: [40, 32],
    maxhitcooldown: 20,
    maxbitecooldown: 50,
    hp: 2,
    WALKING_SPEED: 40,
    mass: 1,
    drag: [10, 0]
    
  },
  'frorse': {
    size: [48, 48],
    maxhitcooldown: 20,
    maxbitecooldown: 50,
    hp: 3,
    WALKING_SPEED: 30,
    mass: 3,
    drag: [20, 0]
  },
}

export { charactersConfig as default }