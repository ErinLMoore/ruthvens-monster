export const createFrames = (spritesheet, framesarray) => {
  var returnframes = []
  framesarray.forEach((f) => { returnframes.push({ key: spritesheet, frame: f }) })
  return returnframes
}

export const isLastFrame = (character) => {
  return (character.anims.currentFrame) ? character.anims.currentFrame.isLast : false
}

export const getEdges = (character) => {
    return {
      "top": (character.body.center.y - character.body.halfHeight) - character.body.offset.y,
      "bottom": (character.body.center.y + character.body.halfHeight) +  character.body.offset.y,
      "left": (character.body.center.x - character.body.halfWidth) - character.body.offset.x,
      "right": (character.body.center.x + character.body.halfWidth) - character.body.offset.x,
    }
  }
