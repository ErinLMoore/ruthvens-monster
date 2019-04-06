
import { isLastFrame, getEdges } from '../helpers/helper_functions.js'
import { State, StateMachine } from '../helpers/statemachine.js'

export const setupEnemy= (name, enemy) => {
  enemy.setCollideWorldBounds(true)
  enemy.currentState = 'idle'
  enemy.name = name
  enemy.hitcooldown = 0
  enemy.maxhitcooldown = 20
  enemy.bitecooldown = 0
  enemy.maxbitecooldown = 50
  enemy.hp = 3
  enemy.canBeEaten = false
  enemy.destroyed = false
  enemy.playerlocation = 1000
  enemy.playerfacing = 'left'
  enemy.WALKING_SPEED = 20
  
  enemy.stateMachine = new StateMachine('idling', {
        idling: new IdleState(),
        walking: new WalkingState(),
        biting: new BitingState(),
        takingDamage: new TakingDamageState(),
        dead: new DeadState(),
        gettingEaten: new GettingEatenState()
      }, [enemy])

  enemy.isBlocked = () => {
    return (enemy.body.blocked.right) || (enemy.body.blocked.left)
  }
  
  enemy.getFacing = () => {
    return enemy.body.facing < 14 ? 'left':'right'
  }
    
  enemy.getWalkingModifier = () => {
    return enemy.flipX ? -1 : 1
  }
  
  enemy.destroySelf = () => {
    enemy.destroy()
    enemy.destroyed = true  
  }
  
  return enemy
}

export const updateEnemy = (name, enemy, playerlocation, playerfacing) => {
  enemy.edges = getEdges(enemy)

  enemy.playerlocation = playerlocation
  enemy.playerfacing = playerfacing
  if (enemy.currentState != 'dead') { 
      playerlocation.x > enemy.body.center.x ? enemy.flipX = true : enemy.flipX = false
  }
  if (enemy.bitecooldown > 0) {enemy.bitecooldown --}
  enemy.stateMachine.step()

  enemy.anims.play(enemy.currentState+name, true) 
}

class IdleState extends State {
  enter(enemy) {
    enemy.setVelocityX(0)
    enemy.currentState = 'idle'
  }
  
  execute(enemy) {
    let distancex =  Math.abs(enemy.body.center.x - enemy.playerlocation.x)
    let distancey = Math.abs(enemy.body.center.y - enemy.playerlocation.y)
    let distance =(distancex + distancey)/2
    if ((85 < distance && distance < 160)) {
      this.stateMachine.transition('walking')
      return
    }
  }
}

class WalkingState extends State {
  enter(enemy) {
    enemy.currentState = 'walk'
    enemy.playerlocation.x > enemy.body.center.x ? enemy.flipX = true : enemy.flipX = false
    let walkingModifier = enemy.flipX ? 1 : -1
    enemy.setVelocityX(enemy.WALKING_SPEED * walkingModifier)

  }
  
  execute(enemy) {
    let distancex =  Math.abs(enemy.body.center.x - enemy.playerlocation.x)
    let distancey = Math.abs(enemy.body.center.y - enemy.playerlocation.y)
    let distance =(distancex + distancey)/2
    if (distance > 160) {
      this.stateMachine.transition('idling')
      return
    }
    if ( distancex < 75 && enemy.bitecooldown === 0) {
      this.stateMachine.transition('biting')
      return
   }
  }
}

class BitingState extends State {
  enter(enemy) {
    enemy.currentState = 'attack'
    enemy.bitecooldown = enemy.maxbitecooldown
    enemy.setVelocityX( -10 * enemy.getWalkingModifier())
  }
  
  execute(enemy) {
    if (isLastFrame(enemy)) {
      this.stateMachine.transition('idling')
      return
    }
  }
}

class TakingDamageState extends State {
  enter(enemy) {
    enemy.setVelocityX( -5 * enemy.getWalkingModifier())
    enemy.currentState = 'damage'
    enemy.tint = 0xff00ff
    enemy.hitcooldown = enemy.maxhitcooldown
    enemy.hp --
  }
  
  execute(enemy) {
    if (enemy.hp == 0) { 
      enemy.tint = undefined
      this.stateMachine.transition('dead')
      return
    }
    enemy.hitcooldown -- 
    if (enemy.hitcooldown == 0) {
      enemy.tint = undefined
      this.stateMachine.transition('idling')
      return
    }
  }
}

class DeadState extends State {
  enter(enemy) {
    enemy.setVelocityX(0)
    enemy.currentState = 'dead'
  }

  execute(enemy) {
  }
}

class GettingEatenState extends State {
  enter(enemy) {
    let rotationModifier = enemy.playerfacing == 'left' ? -1 : 1
    enemy.body.allowGravity = false
    enemy.rotation = -.2 * rotationModifier
    enemy.setVelocityX(0)
    enemy.currentState = 'dead'
    enemy.setVelocityY(-35)
    setTimeout(() => {
      enemy.setVelocityY(10)
      enemy.setVelocityX(10) * rotationModifier
      enemy.rotation = -.45 * rotationModifier
    },1500)
    setTimeout( () => {
      enemy.destroySelf()
    }, 3000)
  }

  execute(enemy) {
  }
}
