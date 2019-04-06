import { isLastFrame, getEdges } from '../helpers/helper_functions.js'
import { State, StateMachine } from '../helpers/statemachine.js'

export const setupPlayer = (player) => {
  player.setCollideWorldBounds(true)
  player.isClimbing = false
  player.currentState = 'idle'
  player.isBlocked = false
  player.platform
  player.edges
  player.rearcooldown = 0
  player.maxrearcooldown = 70
  player.bitecooldown = 0
  player.maxbitecooldown = 30
  player.hitcooldown = 0
  player.maxhitcooldown = 20
  player.currentlyConsuming = false
  player.hp = player.maxhp = 3
  player.canEatEnemy = false
  player.destroyed = false
  player.WALKING_SPEED = 100
  player.controlled = false
  
    
  player.stateMachine = new StateMachine('idling', {
        idling: new IdleState(),
        walking: new WalkingState(),
        biting: new BitingState(),
        sleeping: new SleepingState(),
        crouching: new CrouchingState(),
        rearing: new RearingState(),
        falling: new FallingState(), 
        climbing: new ClimbingState(),
        takingDamage: new TakingDamageState(),
        consuming: new ConsumingState(),
        rearingDown: new RearingDownState(),
        smashing: new SmashingState(),
        controlled: new ControlledState()
        
      }, [player])
  
  player.isBlocked = () => {
    return (player.body.blocked.right) || (player.body.blocked.left)
  }
  
  player.getFacing = () => {
    return player.body.facing < 14 ? 'left':'right'
  }
  
  player.getWalkingModifier = () => {
    return player.flipX ? -1 : 1
  }
  
  player.destroySelf = () => {
    player.destroy()
    player.destroyed = true  
  }
  
  player.handleHit= () => {
    if ( player.hitcooldown == 0) {
      player.tint = 0xff00ff
      player.hitcooldown = player.maxhitcooldown
      if (player.hp > 0) { player.hp -- }    
    }
  }
  
  player.canClimbPlatform = () => {
    let isClose = false
    if(player.platform){
      if((player.flipX == true) &&  (Math.abs(player.platform.right - player.edges.left ) ) < 31 ){
       isClose = true
      }
      else if((player.flipX == false)  && (Math.abs(player.platform.left -player.edges.right)) < 31){
        isClose = true
      }
      if(isClose && (player.edges.bottom > (player.platform.top+25))  ){
        // player.platform = undefined
        return true
      }
      else {
        player.platform = undefined
        return false
      }
    }
  }

  return player
}

export const updatePlayer = (player) => {
  player.edges = getEdges(player)
  player.stateMachine.step()

  if (player.bitecooldown > 0) {player.bitecooldown --}
  if (player.rearcooldown > 0) {player.rearcooldown --}
  player.anims.play(player.currentState, true) 
  // console.log(player.currentState)
}


class IdleState extends State {
  enter(player) {
    player.setVelocityX(0)
    player.currentState = 'idle'
    player.setSize(40, 33, true).setOffset(10, 13)
  }
  
  execute(player) {
    if (player.rearcooldown == 0 && player.scene.cursors.up.isDown &! player.body.blocked.up)  {
      player.stateMachine.transition('rearing')
      return
    }
    if (!player.body.blocked.down) {
      player.stateMachine.transition('falling')
      return
    }
    if (player.scene.cursors.left.isDown || player.scene.cursors.right.isDown)  {
      player.stateMachine.transition('walking')
      return
    } 
    if (player.scene.cursors.down.isDown)  {
      player.stateMachine.transition('crouching')
      return
    }
    if (player.scene.phaser.Input.Keyboard.JustDown(player.scene.spacekey) && player.bitecooldown === 0 ) {
      player.stateMachine.transition('biting')
      return
    }
  }
}

class WalkingState extends State {
  enter(player) {
    player.currentState = 'walk'
    player.flipX = player.scene.cursors.left.isDown && !player.scene.cursors.right.isDown
    player.setVelocityX(player.WALKING_SPEED * player.getWalkingModifier())
  }
  
  execute(player) {
    if (!player.body.blocked.down ) {
      player.stateMachine.transition('falling')
      return
    }
    if (!player.scene.cursors.left.isDown && !player.scene.cursors.right.isDown)  {
      player.stateMachine.transition('idling')
      return
    } 
    if (player.scene.cursors.left.isDown || player.scene.cursors.right.isDown)  {
      player.stateMachine.transition('walking')
      return
    } 
  }
}

class BitingState extends State {
  enter(player) {
    player.setVelocityX( -2 * player.getWalkingModifier())
    player.currentState = 'bite'
    player.bitecooldown = player.maxbitecooldown
  }
  
  execute(player) {
    if (isLastFrame(player))  {
      player.stateMachine.transition('idling')
      return
    } 
  }
}

class ConsumingState extends State {
  enter(player) {
    player.setVelocityX(0)
    player.currentState = 'consume'
    if (player.hp < player.maxhp) {player.hp += 1}
  }
  
  execute(player) {
    if (isLastFrame(player))  {
      player.stateMachine.transition('idling')
      return
    } 
  }
}

class CrouchingState extends State {
  enter(player) {
    player.setVelocityX(0)
    player.setSize(40, 14, true).setOffset(10, 31)
    player.currentState = 'crouch'
  }
  
  execute(player) {
    if (player.scene.playerActive) {
      if (!player.scene.cursors.down.isDown)  {
        player.stateMachine.transition('idling')
        return
      } 
    }
  }
}

class RearingState extends State {
  enter(player) {
    player.setVelocityX(.01 * player.getWalkingModifier())
    player.setSize(40, 44, true).setOffset(10, 0)
    player.currentState = 'rearup'
  }
   
  execute(player) {
    if (isLastFrame(player))  {
      player.currentState = 'rear'
    }
    if (player.scene.playerActive) {
      if (player.scene.phaser.Input.Keyboard.JustDown(player.scene.spacekey) ) {
          player.stateMachine.transition('smashing')
          return
      }
      if (player.canClimbPlatform() &! player.body.blocked.up) {
        player.stateMachine.transition('climbing')
        return
      }
      if ((player.body.blocked.up || !player.scene.cursors.up.isDown) && player.scene.playerActive)  {
        player.stateMachine.transition('rearingDown')
        return
      }     
    }

  }
}

class RearingDownState extends State {
  enter(player) {
    player.setVelocityX(0)
    player.setSize(40, 44, true).setOffset(10, 0)
    player.currentState = 'reardown'
  }
   
  execute(player) {
    if (isLastFrame(player))  {
      player.stateMachine.transition('idling')
      return
    } 
  }
}

class SmashingState extends State {
  enter(player) {
    player.currentState = 'smash'
  }
   
  execute(player) {
    if (isLastFrame(player))  {
      player.stateMachine.transition('idling')
      return
    } 
  }
}



class FallingState extends State {
  enter(player) {
    player.currentState = 'fall'
  }
   
  execute(player) {
    if (player.body.blocked.down)  {
      player.stateMachine.transition('idling')
      return
    } 
  }
}


class ClimbingState extends State {
  enter(player) {
    player.body.allowGravity = false
    player.setSize(40, 48, true).setOffset(10, 0)
    player.currentState = 'climb'
  }
   
  execute(player) {
    player.y -=2
    if ((player.edges.bottom<player.platform.top ) && player.scene.playerActive)  {
      player.body.allowGravity = true
      player.x += 25 * player.getWalkingModifier()
      let playerok = player.getFacing() == 'left' ? player.edges.left < player.platform.right : player.edges.right > player.platform.left
      if (playerok) {
        player.platform = undefined
        player.rearcooldown = player.maxrearcooldown
        player.stateMachine.transition('idling')
      }
      return
    } 
  }
}

class TakingDamageState extends State {
  enter(player) {
    player.hitcooldown = player.maxhitcooldown
    player.hp --
    player.setVelocityX( 5 * player.getWalkingModifier())
    player.setSize(40, 14, true).setOffset(10, 31)
    player.currentState = 'damage'
  }
  
  execute(player) {
    player.hitcooldown --
    if (player.hitcooldown <= 0) {
      player.stateMachine.transition('idling')
      return
    }
  }
}

class SleepingState extends State {
  enter(player) {
    player.setVelocityX(0)
    player.currentState = 'sleep'
  }
  
  execute(player) {
    // player.stateMachine.transition('idling')
    // return
  }
}

class ControlledState extends State {
  enter(player) { 
    player.controlled = true
  }
  execute(player) {
    if (player.controlled == false) {
      player.stateMachine.transition('idling')
    }
  }
}

//pixels :(

//ANIMATIONS:
//damage
// better climbing
// :(