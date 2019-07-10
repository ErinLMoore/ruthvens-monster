
import { isLastFrame, getEdges } from '../helpers/helper_functions.js'
import { State, StateMachine } from '../helpers/statemachine.js'
import enemiesConfig  from './characterconfig.json'


export const setupEnemy= (name, enemy) => {
  enemy.setCollideWorldBounds(true)
  enemy.currentState = 'idle'
  enemy.playerlocation = 1000
  enemy.playerfacing = 'left'
  enemy.canBeEaten = false
  enemy.destroyed = false
  enemy.hitcooldown = 0
  enemy.bitecooldown = 0
  enemy.distance
  enemy.prev_velocity = 0
  enemy.name = name
  Object.keys(enemiesConfig[name]).forEach(key => {
    enemy[key] = enemiesConfig[name][key]
  })
  
  enemy.setMass(enemy.mass)
  enemy.setDrag(enemy.drag[0], enemy.drag[1])
  enemy.setOffset(enemy.offset[0], enemy.offset[1])  
  enemy.stateMachine = new StateMachine('idling', {
        idling: new IdleState(),
        walking: new WalkingState(),
        biting: new BitingState(),
        takingDamage: new TakingDamageState(),
        dead: new DeadState(),
        gettingEaten: new GettingEatenState(),
        launched: new LaunchedState()
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
  if (enemy.hitcooldown > 0) {enemy.hitcooldown --}
  
  let distancex =  Math.abs(enemy.body.center.x - playerlocation.x)
  let distancey = Math.abs(enemy.body.center.y - playerlocation.y)
  enemy.distance =(distancex + distancey)/2
  enemy.stateMachine.step()
  enemy.anims.play(enemy.currentState +'_'+name, true) 
  

  var d_velocity = (enemy.prev_velocity) - Math.trunc(enemy.body.velocity.x)
  
  if (Math.abs(d_velocity > 50) && enemy.body.velocity.x === 0) {
      console.log(enemy.body.deltaAbsX(), enemy.body.deltaAbsY())
    console.log(d_velocity)
      }
 enemy.prev_velocity = Math.trunc(enemy.body.velocity.x)
}

class IdleState extends State {
  enter(enemy) {
    enemy.setVelocityX(0)
    enemy.currentState = 'idle'
  }
  
  execute(enemy) {
    if (enemy.distance < 100 && enemy.distance > 50) {
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
    if (enemy.distance > 100 || enemy.distance < 20) {
      this.stateMachine.transition('idling')
      return
    }
    if ( enemy.distance < 45  && enemy.bitecooldown === 0) {
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
    if (enemy.hp <= 0) { 
      enemy.tint = undefined
      this.stateMachine.transition('dead')
      return
    }
    // enemy.hitcooldown -- 
    if (enemy.hitcooldown === 0) {
      enemy.tint = undefined
      this.stateMachine.transition('idling')
      return
    }
  }
}

class LaunchedState extends State {
  enter(enemy) {
    enemy.tint = undefined
    let modifier = enemy.playerfacing === 'left' ? -1 : 1
    enemy.setVelocity(100*modifier, -165)
    enemy.currentState = 'dead'
  }
  
  execute(enemy) {
    
    if (Math.abs(enemy.body._dy) < .2 && Math.abs(enemy.body._dx) < .2) {
      if (enemy.hp <= 0) { 
      enemy.tint = undefined
        this.stateMachine.transition('dead')
        return
      }
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
    let rotationModifier = enemy.playerfacing === 'left' ? -1 : 1
    enemy.body.allowGravity = true
    enemy.rotation = -.2 * rotationModifier
    enemy.setVelocityX(0)
    enemy.currentState = 'dead'
    enemy.setVelocityY(-165)
    setTimeout(() => {
      enemy.setVelocityY(10)
      enemy.setVelocityX(10) * rotationModifier
      enemy.rotation = -.45 * rotationModifier
    },1500)
    setTimeout( () => {
      enemy.destroySelf()
    }, 1600)
  }

  execute(enemy) {
  }
}
