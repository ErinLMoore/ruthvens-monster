webpackJsonp([0],{

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEdges = exports.isLastFrame = exports.createFrames = void 0;

var createFrames = function createFrames(spritesheet, framesarray) {
  var returnframes = [];
  framesarray.forEach(function (f) {
    returnframes.push({
      key: spritesheet,
      frame: f
    });
  });
  return returnframes;
};

exports.createFrames = createFrames;

var isLastFrame = function isLastFrame(character) {
  return character.anims.currentFrame ? character.anims.currentFrame.isLast : false;
};

exports.isLastFrame = isLastFrame;

var getEdges = function getEdges(character) {
  return {
    "top": character.body.center.y - character.body.halfHeight - character.body.offset.y,
    "bottom": character.body.center.y + character.body.halfHeight + character.body.offset.y,
    "left": character.body.center.x - character.body.halfWidth - character.body.offset.x,
    "right": character.body.center.x + character.body.halfWidth - character.body.offset.x
  };
};

exports.getEdges = getEdges;

/***/ }),

/***/ 1390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseScene = _interopRequireDefault(__webpack_require__(504));

var _images = __webpack_require__(240);

var _misc = __webpack_require__(506);

var _enemies = __webpack_require__(239);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scene1 =
/*#__PURE__*/
function (_BaseScene) {
  _inherits(Scene1, _BaseScene);

  function Scene1() {
    _classCallCheck(this, Scene1);

    return _possibleConstructorReturn(this, _getPrototypeOf(Scene1).apply(this, arguments));
  }

  _createClass(Scene1, [{
    key: "preload",
    value: function preload() {
      _get(_getPrototypeOf(Scene1.prototype), "preload", this).call(this);

      this.load.tilemapTiledJSON(this.sceneName + '-map', _images.assetsDict.maps.spring);
      this.load.image('tiles', _images.assetsDict.tiles.spring);
      this.load.image('background', _images.assetsDict.backgrounds.spring);
      this.load.spritesheet('hapax', _images.assetsDict.sprites.hapax, {
        frameWidth: 64,
        frameHeight: 48
      });
      this.load.spritesheet('tam', _images.assetsDict.sprites.tam, {
        frameWidth: 27,
        frameHeight: 29
      });
      this.load.spritesheet('rarebit', _images.assetsDict.enemies.rarebit, {
        frameWidth: 40,
        frameHeight: 32
      });
      this.load.image('background', _images.assetsDict.backgrounds.spring);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      _get(_getPrototypeOf(Scene1.prototype), "create", this).call(this);

      this.tam = this.physics.add.sprite(this.tilesFromZero(7), this.tilesFromBottom(4), 'tam');
      this.tam.body.allowGravity = false;
      this.player.stateMachine.transition('controlled');
      this.player.currentState = 'sleep';
      this.events.on('endOfText', function () {
        _this.incrementText();
      }, this);
      this.input.keyboard.on(this.phaser.Input.Keyboard.KeyCodes.SPACE, function (event) {
        _this.incrementText();
      });
      var timedEventOne = this.time.addEvent({
        delay: 5000,
        callback: this.onTimedEventOne,
        callbackScope: this,
        repeat: 0,
        startAt: 5000
      });
      var timedEventTwo = this.time.addEvent({
        delay: 10000,
        callback: this.onTimedEventTwo,
        callbackScope: this,
        repeat: 0,
        startAt: 10000
      });
      this.endingIntersection = (this.tilesFromRight(3), this.tilesFromZero(16));
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      _get(_getPrototypeOf(Scene1.prototype), "update", this).call(this);

      if (this.tam) {
        (0, _misc.updateMiscSprite)(this.tam, 'float');
      }

      if (this.textIndex == 2 && this.playerActive == false) {
        this.player.stateMachine.transition('crouching');
      }

      if (this.tam && this.player.body.center.x > this.tam.body.center.x) {
        this.tam.flipX = true;
      } // this.endingIntersection = this.phaser.Geom.Intersects.RectangleToRectangle(this.endTriggerRect, this.player.getBounds())


      if (this.player.edges.right > this.endingIntersection[0] && this.player.edges.top < this.endingIntersection[16]) {
        var exiting = true;
        this.onEndingIntersection();
      }

      if (this.player.controlled == true & !exiting) {
        this.input.keyboard.on('keydown', function (event) {
          _this2.events.emit('toggleActive', true);

          _this2.player.controlled = false;
        });
      } // this.graphics.strokeRectShape(this.endTriggerRect)

    }
  }, {
    key: "onEndingIntersection",
    value: function onEndingIntersection() {
      this.physics.world.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height, true, false);
      this.player.stateMachine.transition('controlled');
      this.player.currentState = 'walk';
      this.player.setVelocityX(75);
      this.player.facing = 'right';

      if (this.player.edges.left > this.tilesFromRight(0)) {
        this.scene.switch('Scene2');
      }
    }
  }, {
    key: "onTimedEventOne",
    value: function onTimedEventOne() {
      this.textIndex = 0;
      this.dialog.toggleWindow();
      this.setNextText(0);
    }
  }]);

  return Scene1;
}(_baseScene.default);

exports.default = Scene1;

/***/ }),

/***/ 1391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerAnimations = void 0;

var _helper_functions = __webpack_require__(114);

var walk, idle, bite, climb, rearup, rear, reardown, crouch, sleep, consume, takedamage, fall, smash;
var playerAnimations = [walk = function walk() {
  return {
    key: 'walk',
    frames: (0, _helper_functions.createFrames)('hapax', [0, 1, 2, 3, 4, 5, 6, 7]),
    frameRate: 10,
    repeat: -1
  };
}, idle = function idle() {
  return {
    key: 'idle',
    frames: (0, _helper_functions.createFrames)('hapax', [8, 9, 10, 10, 9]),
    frameRate: 3,
    hideOnComplete: true,
    repeat: -1
  };
}, bite = function bite() {
  return {
    key: 'bite',
    frames: (0, _helper_functions.createFrames)('hapax', [11, 12, 11]),
    frameRate: 7,
    repeat: -1
  };
}, climb = function climb() {
  return {
    key: 'climb',
    frames: (0, _helper_functions.createFrames)('hapax', [13, 14, 15, 16]),
    frameRate: 10,
    repeat: -1
  };
}, rearup = function rearup() {
  return {
    key: 'rearup',
    frames: (0, _helper_functions.createFrames)('hapax', [13, 14, 15, 16]),
    frameRate: 10,
    repeat: 1
  };
}, rear = function rear() {
  return {
    key: 'rear',
    frames: (0, _helper_functions.createFrames)('hapax', [16]),
    frameRate: 1,
    repeat: 1
  };
}, reardown = function reardown() {
  return {
    key: 'reardown',
    frames: (0, _helper_functions.createFrames)('hapax', [16, 15, 14, 13]),
    frameRate: 10,
    repeat: 1
  };
}, smash = function smash() {
  return {
    key: 'smash',
    frames: (0, _helper_functions.createFrames)('hapax', [17, 17, 18, 19]),
    frameRate: 10,
    repeat: 1
  };
}, crouch = function crouch() {
  return {
    key: 'crouch',
    frames: (0, _helper_functions.createFrames)('hapax', [22, 23, 24, 23]),
    frameRate: 3,
    repeat: -1
  };
}, sleep = function sleep() {
  return {
    key: 'sleep',
    frames: (0, _helper_functions.createFrames)('hapax', [25, 26, 27, 27, 27, 26, 25]),
    frameRate: 3,
    repeat: -1
  };
}, consume = function consume() {
  return {
    key: 'consume',
    frames: (0, _helper_functions.createFrames)('hapax', [28, 6, 29, 30, 30, 31, 31, 30, 30, 32]),
    frameRate: 3,
    repeat: -1
  };
}, takedamage = function takedamage() {
  return {
    key: 'damage',
    frames: (0, _helper_functions.createFrames)('hapax', [23]),
    frameRate: 3,
    repeat: -1
  };
}, fall = function fall() {
  return {
    key: 'fall',
    frames: (0, _helper_functions.createFrames)('hapax', [20, 21]),
    frameRate: 3,
    repeat: -1
  };
}];
exports.playerAnimations = playerAnimations;

/***/ }),

/***/ 1392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.miscAnimations = void 0;

var _helper_functions = __webpack_require__(114);

var float;
var miscAnimations = [float = function float() {
  return {
    key: 'float',
    frames: (0, _helper_functions.createFrames)('tam', [0, 1, 2, 3]),
    frameRate: 3,
    repeat: -1
  };
}];
exports.miscAnimations = miscAnimations;

/***/ }),

/***/ 1393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enemyAnimations = void 0;

var _helper_functions = __webpack_require__(114);

var walkrarebit, idlerarebit, attackrarebit, deadrarebit, damagerarebit;
var enemyAnimations = [walkrarebit = function walkrarebit() {
  return {
    key: 'walkrarebit',
    frames: (0, _helper_functions.createFrames)('rarebit', [4, 5, 6, 7, 8, 9]),
    frameRate: 6,
    repeat: -1
  };
}, idlerarebit = function idlerarebit() {
  return {
    key: 'idlerarebit',
    frames: (0, _helper_functions.createFrames)('rarebit', [0]),
    frameRate: 1,
    repeat: 0
  };
}, attackrarebit = function attackrarebit() {
  return {
    key: 'attackrarebit',
    frames: (0, _helper_functions.createFrames)('rarebit', [1, 2, 3, 2, 1, 1]),
    frameRate: 6,
    repeat: -1
  };
}, damagerarebit = function damagerarebit() {
  return {
    key: 'damagerarebit',
    frames: (0, _helper_functions.createFrames)('rarebit', [10]),
    frameRate: 1,
    repeat: 0
  };
}, deadrarebit = function deadrarebit() {
  return {
    key: 'deadrarebit',
    frames: (0, _helper_functions.createFrames)('rarebit', [10]),
    frameRate: 1,
    repeat: 0
  };
}];
exports.enemyAnimations = enemyAnimations;

/***/ }),

/***/ 1394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePlayer = exports.setupPlayer = void 0;

var _helper_functions = __webpack_require__(114);

var _statemachine = __webpack_require__(505);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var setupPlayer = function setupPlayer(player) {
  player.setCollideWorldBounds(true);
  player.isClimbing = false;
  player.currentState = 'idle';
  player.isBlocked = false;
  player.platform;
  player.edges;
  player.rearcooldown = 0;
  player.maxrearcooldown = 70;
  player.bitecooldown = 0;
  player.maxbitecooldown = 30;
  player.hitcooldown = 0;
  player.maxhitcooldown = 20;
  player.currentlyConsuming = false;
  player.hp = player.maxhp = 3;
  player.canEatEnemy = false;
  player.destroyed = false;
  player.WALKING_SPEED = 100;
  player.controlled = false;
  player.stateMachine = new _statemachine.StateMachine('idling', {
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
  }, [player]);

  player.isBlocked = function () {
    return player.body.blocked.right || player.body.blocked.left;
  };

  player.getFacing = function () {
    return player.body.facing < 14 ? 'left' : 'right';
  };

  player.getWalkingModifier = function () {
    return player.flipX ? -1 : 1;
  };

  player.destroySelf = function () {
    player.destroy();
    player.destroyed = true;
  };

  player.handleHit = function () {
    if (player.hitcooldown == 0) {
      player.tint = 0xff00ff;
      player.hitcooldown = player.maxhitcooldown;

      if (player.hp > 0) {
        player.hp--;
      }
    }
  };

  player.canClimbPlatform = function () {
    var isClose = false;

    if (player.platform) {
      if (player.flipX == true && Math.abs(player.platform.right - player.edges.left) < 31) {
        isClose = true;
      } else if (player.flipX == false && Math.abs(player.platform.left - player.edges.right) < 31) {
        isClose = true;
      }

      if (isClose && player.edges.bottom > player.platform.top + 25) {
        // player.platform = undefined
        return true;
      } else {
        player.platform = undefined;
        return false;
      }
    }
  };

  return player;
};

exports.setupPlayer = setupPlayer;

var updatePlayer = function updatePlayer(player) {
  player.edges = (0, _helper_functions.getEdges)(player);
  player.stateMachine.step();

  if (player.bitecooldown > 0) {
    player.bitecooldown--;
  }

  if (player.rearcooldown > 0) {
    player.rearcooldown--;
  }

  player.anims.play(player.currentState, true); // console.log(player.currentState)
};

exports.updatePlayer = updatePlayer;

var IdleState =
/*#__PURE__*/
function (_State) {
  _inherits(IdleState, _State);

  function IdleState() {
    _classCallCheck(this, IdleState);

    return _possibleConstructorReturn(this, _getPrototypeOf(IdleState).apply(this, arguments));
  }

  _createClass(IdleState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(0);
      player.currentState = 'idle';
      player.setSize(40, 33, true).setOffset(10, 13);
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if (player.rearcooldown == 0 && player.scene.cursors.up.isDown & !player.body.blocked.up) {
        player.stateMachine.transition('rearing');
        return;
      }

      if (!player.body.blocked.down) {
        player.stateMachine.transition('falling');
        return;
      }

      if (player.scene.cursors.left.isDown || player.scene.cursors.right.isDown) {
        player.stateMachine.transition('walking');
        return;
      }

      if (player.scene.cursors.down.isDown) {
        player.stateMachine.transition('crouching');
        return;
      }

      if (player.scene.phaser.Input.Keyboard.JustDown(player.scene.spacekey) && player.bitecooldown === 0) {
        player.stateMachine.transition('biting');
        return;
      }
    }
  }]);

  return IdleState;
}(_statemachine.State);

var WalkingState =
/*#__PURE__*/
function (_State2) {
  _inherits(WalkingState, _State2);

  function WalkingState() {
    _classCallCheck(this, WalkingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(WalkingState).apply(this, arguments));
  }

  _createClass(WalkingState, [{
    key: "enter",
    value: function enter(player) {
      player.currentState = 'walk';
      player.flipX = player.scene.cursors.left.isDown && !player.scene.cursors.right.isDown;
      player.setVelocityX(player.WALKING_SPEED * player.getWalkingModifier());
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if (!player.body.blocked.down) {
        player.stateMachine.transition('falling');
        return;
      }

      if (!player.scene.cursors.left.isDown && !player.scene.cursors.right.isDown) {
        player.stateMachine.transition('idling');
        return;
      }

      if (player.scene.cursors.left.isDown || player.scene.cursors.right.isDown) {
        player.stateMachine.transition('walking');
        return;
      }
    }
  }]);

  return WalkingState;
}(_statemachine.State);

var BitingState =
/*#__PURE__*/
function (_State3) {
  _inherits(BitingState, _State3);

  function BitingState() {
    _classCallCheck(this, BitingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(BitingState).apply(this, arguments));
  }

  _createClass(BitingState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(-2 * player.getWalkingModifier());
      player.currentState = 'bite';
      player.bitecooldown = player.maxbitecooldown;
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if ((0, _helper_functions.isLastFrame)(player)) {
        player.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return BitingState;
}(_statemachine.State);

var ConsumingState =
/*#__PURE__*/
function (_State4) {
  _inherits(ConsumingState, _State4);

  function ConsumingState() {
    _classCallCheck(this, ConsumingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConsumingState).apply(this, arguments));
  }

  _createClass(ConsumingState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(0);
      player.currentState = 'consume';

      if (player.hp < player.maxhp) {
        player.hp += 1;
      }
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if ((0, _helper_functions.isLastFrame)(player)) {
        player.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return ConsumingState;
}(_statemachine.State);

var CrouchingState =
/*#__PURE__*/
function (_State5) {
  _inherits(CrouchingState, _State5);

  function CrouchingState() {
    _classCallCheck(this, CrouchingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(CrouchingState).apply(this, arguments));
  }

  _createClass(CrouchingState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(0);
      player.setSize(40, 14, true).setOffset(10, 31);
      player.currentState = 'crouch';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if (player.scene.playerActive) {
        if (!player.scene.cursors.down.isDown) {
          player.stateMachine.transition('idling');
          return;
        }
      }
    }
  }]);

  return CrouchingState;
}(_statemachine.State);

var RearingState =
/*#__PURE__*/
function (_State6) {
  _inherits(RearingState, _State6);

  function RearingState() {
    _classCallCheck(this, RearingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(RearingState).apply(this, arguments));
  }

  _createClass(RearingState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(.01 * player.getWalkingModifier());
      player.setSize(40, 44, true).setOffset(10, 0);
      player.currentState = 'rearup';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if ((0, _helper_functions.isLastFrame)(player)) {
        player.currentState = 'rear';
      }

      if (player.scene.playerActive) {
        if (player.scene.phaser.Input.Keyboard.JustDown(player.scene.spacekey)) {
          player.stateMachine.transition('smashing');
          return;
        }

        if (player.canClimbPlatform() & !player.body.blocked.up) {
          player.stateMachine.transition('climbing');
          return;
        }

        if ((player.body.blocked.up || !player.scene.cursors.up.isDown) && player.scene.playerActive) {
          player.stateMachine.transition('rearingDown');
          return;
        }
      }
    }
  }]);

  return RearingState;
}(_statemachine.State);

var RearingDownState =
/*#__PURE__*/
function (_State7) {
  _inherits(RearingDownState, _State7);

  function RearingDownState() {
    _classCallCheck(this, RearingDownState);

    return _possibleConstructorReturn(this, _getPrototypeOf(RearingDownState).apply(this, arguments));
  }

  _createClass(RearingDownState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(0);
      player.setSize(40, 44, true).setOffset(10, 0);
      player.currentState = 'reardown';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if ((0, _helper_functions.isLastFrame)(player)) {
        player.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return RearingDownState;
}(_statemachine.State);

var SmashingState =
/*#__PURE__*/
function (_State8) {
  _inherits(SmashingState, _State8);

  function SmashingState() {
    _classCallCheck(this, SmashingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(SmashingState).apply(this, arguments));
  }

  _createClass(SmashingState, [{
    key: "enter",
    value: function enter(player) {
      player.currentState = 'smash';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if ((0, _helper_functions.isLastFrame)(player)) {
        player.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return SmashingState;
}(_statemachine.State);

var FallingState =
/*#__PURE__*/
function (_State9) {
  _inherits(FallingState, _State9);

  function FallingState() {
    _classCallCheck(this, FallingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(FallingState).apply(this, arguments));
  }

  _createClass(FallingState, [{
    key: "enter",
    value: function enter(player) {
      player.currentState = 'fall';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if (player.body.blocked.down) {
        player.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return FallingState;
}(_statemachine.State);

var ClimbingState =
/*#__PURE__*/
function (_State10) {
  _inherits(ClimbingState, _State10);

  function ClimbingState() {
    _classCallCheck(this, ClimbingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClimbingState).apply(this, arguments));
  }

  _createClass(ClimbingState, [{
    key: "enter",
    value: function enter(player) {
      player.body.allowGravity = false;
      player.setSize(40, 48, true).setOffset(10, 0);
      player.currentState = 'climb';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      player.y -= 2;

      if (player.edges.bottom < player.platform.top && player.scene.playerActive) {
        player.body.allowGravity = true;
        player.x += 25 * player.getWalkingModifier();
        var playerok = player.getFacing() == 'left' ? player.edges.left < player.platform.right : player.edges.right > player.platform.left;

        if (playerok) {
          player.platform = undefined;
          player.rearcooldown = player.maxrearcooldown;
          player.stateMachine.transition('idling');
        }

        return;
      }
    }
  }]);

  return ClimbingState;
}(_statemachine.State);

var TakingDamageState =
/*#__PURE__*/
function (_State11) {
  _inherits(TakingDamageState, _State11);

  function TakingDamageState() {
    _classCallCheck(this, TakingDamageState);

    return _possibleConstructorReturn(this, _getPrototypeOf(TakingDamageState).apply(this, arguments));
  }

  _createClass(TakingDamageState, [{
    key: "enter",
    value: function enter(player) {
      player.hitcooldown = player.maxhitcooldown;
      player.hp--;
      player.setVelocityX(5 * player.getWalkingModifier());
      player.setSize(40, 14, true).setOffset(10, 31);
      player.currentState = 'damage';
    }
  }, {
    key: "execute",
    value: function execute(player) {
      player.hitcooldown--;

      if (player.hitcooldown <= 0) {
        player.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return TakingDamageState;
}(_statemachine.State);

var SleepingState =
/*#__PURE__*/
function (_State12) {
  _inherits(SleepingState, _State12);

  function SleepingState() {
    _classCallCheck(this, SleepingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(SleepingState).apply(this, arguments));
  }

  _createClass(SleepingState, [{
    key: "enter",
    value: function enter(player) {
      player.setVelocityX(0);
      player.currentState = 'sleep';
    }
  }, {
    key: "execute",
    value: function execute(player) {// player.stateMachine.transition('idling')
      // return
    }
  }]);

  return SleepingState;
}(_statemachine.State);

var ControlledState =
/*#__PURE__*/
function (_State13) {
  _inherits(ControlledState, _State13);

  function ControlledState() {
    _classCallCheck(this, ControlledState);

    return _possibleConstructorReturn(this, _getPrototypeOf(ControlledState).apply(this, arguments));
  }

  _createClass(ControlledState, [{
    key: "enter",
    value: function enter(player) {
      player.controlled = true;
    }
  }, {
    key: "execute",
    value: function execute(player) {
      if (player.controlled == false) {
        player.stateMachine.transition('idling');
      }
    }
  }]);

  return ControlledState;
}(_statemachine.State); //pixels :(
//ANIMATIONS:
//damage
// better climbing
// :(

/***/ }),

/***/ 1395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dialogueDict = void 0;
var dialogueDict = {
  Scene1: [["p_hapax", "Ad quia voluptate blanditiis qui...."], ["p_tam", "umque optio id sunt aut doloremque. Alias quis exercitationem umque optio id sunt aut doloremque. Alias quis exercitationem"], ["p_tam", "voluptas adipisci aut quia. Et dicta in ut veritatis qui."], ["p_hapax", "glorp..."]],
  Scene2: []
};
exports.dialogueDict = dialogueDict;

/***/ }),

/***/ 1396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enemiesDict = void 0;
var enemiesDict = {
  Scene1: [{
    'type': 'rarebit',
    'location': [24, 3]
  }, {
    'type': 'rarebit',
    'location': [34, 13]
  }],
  Scene2: []
};
exports.enemiesDict = enemiesDict;

/***/ }),

/***/ 1397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseScene = _interopRequireDefault(__webpack_require__(504));

var _images = __webpack_require__(240);

var _misc = __webpack_require__(506);

var _enemies = __webpack_require__(239);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Scene2 =
/*#__PURE__*/
function (_BaseScene) {
  _inherits(Scene2, _BaseScene);

  function Scene2() {
    _classCallCheck(this, Scene2);

    return _possibleConstructorReturn(this, _getPrototypeOf(Scene2).apply(this, arguments));
  }

  _createClass(Scene2, [{
    key: "preload",
    value: function preload() {
      _get(_getPrototypeOf(Scene2.prototype), "preload", this).call(this);

      this.load.tilemapTiledJSON(this.sceneName + '-map', _images.assetsDict.maps.spring2);
      this.load.image('tiles', _images.assetsDict.tiles.spring);
      this.load.image('background', _images.assetsDict.backgrounds.spring);
      this.load.spritesheet('hapax', _images.assetsDict.sprites.hapax, {
        frameWidth: 64,
        frameHeight: 48
      });
      this.load.spritesheet('rarebit', _images.assetsDict.enemies.rarebit, {
        frameWidth: 40,
        frameHeight: 32
      });
      this.load.image('background', _images.assetsDict.backgrounds.spring);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      _get(_getPrototypeOf(Scene2.prototype), "create", this).call(this);

      this.player.x, this.player.y = this.tilesFromZero(2), this.tilesFromZero(3), this.player.stateMachine.transition('idling');
      this.events.on('endOfText', function () {
        _this.incrementText();
      }, this);
      this.input.keyboard.on(this.phaser.Input.Keyboard.KeyCodes.SPACE, function (event) {
        _this.incrementText();
      });
      this.endTriggerRect = {
        x: this.tilesFromRight(3),
        y: this.tilesFromZero(12),
        width: 120,
        height: 120
      };
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(Scene2.prototype), "update", this).call(this);

      this.endingIntersection = this.phaser.Geom.Intersects.RectangleToRectangle(this.endTriggerRect, this.player.getBounds());

      if (this.endingIntersection) {
        this.onEndingIntersection();
      }
    }
  }, {
    key: "onEndingIntersection",
    value: function onEndingIntersection() {}
  }]);

  return Scene2;
}(_baseScene.default);

exports.default = Scene2;

/***/ }),

/***/ 1398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogPlugin = void 0;

var _phaser = _interopRequireDefault(__webpack_require__(94));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DialogPlugin =
/*#__PURE__*/
function (_Phaser$Plugins$Scene) {
  _inherits(DialogPlugin, _Phaser$Plugins$Scene);

  function DialogPlugin(scene, pluginManager) {
    var _this;

    _classCallCheck(this, DialogPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DialogPlugin).call(this, scene, pluginManager));
    _this.pluginManager = pluginManager;
    _this.eventCounter = 0;
    _this.visible = true;
    _this.text;
    _this.dialog;
    _this.graphics;
    _this.closeBtn;
    _this.sceneOffset = scene.game.config.height;
    _this.characterImage;
    _this.widthScaler = .75;
    return _this;
  }

  _createClass(DialogPlugin, [{
    key: "create",
    value: function create() {
      var arg_opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaults = {
        borderThickness: 3,
        borderColor: 0x907748,
        borderAlpha: 1,
        windowAlpha: 0.8,
        windowColor: 0x303030,
        windowHeight: 75,
        padding: 24,
        closeBtnColor: 'darkgoldenrod',
        dialogSpeed: 3
      };
      this.opts = {};

      for (var property in defaults) {
        this.opts[property] = arg_opts[property] || defaults[property];
      }

      this._createWindow();

      this.toggleWindow();
    }
  }, {
    key: "toggleWindow",
    value: function toggleWindow() {
      this.visible = !this.visible;
      if (this.text) this.text.visible = this.visible;
      if (this.graphics) this.graphics.visible = this.visible;
      if (this.closeBtn) this.closeBtn.visible = this.visible;
      if (this.characterImage) this.characterImage.visible = this.visible;
      this.scene.events.emit('toggleActive', !this.visible);
    }
  }, {
    key: "setText",
    value: function setText(text, animate) {
      if (this.visible) {
        var textLine = text[1];
        this.eventCounter = 0;
        this.dialog = textLine.split('');
        if (this.timedEvent) this.timedEvent.remove();
        var tempText = animate ? '' : textLine;

        this._setText(tempText);

        this._createCharacterGraphic(text[0]);

        if (animate) {
          this.timedEvent = this.scene.time.addEvent({
            delay: 150 - this.opts.dialogSpeed * 30,
            callback: this._animateText,
            callbackScope: this,
            loop: true
          });
        }

        this.text.scrollFactorX = 0;
        this.text.scrollFactorY = 0;
      }
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      if (this.timedEvent) this.timedEvent.remove();
      this.graphics.clear(); // if (this.text) this.text.destroy()
      // if (this.characterImage) this.characterImage.destroy()
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.shutdown();
      this.scene = undefined;
    }
  }, {
    key: "_createWindow",
    value: function _createWindow() {
      var dimensions = this._calculateWindowDimensions();

      this.graphics = this.scene.add.graphics();

      this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);

      this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);

      this._createCloseModalButton();

      this._createCloseModalButtonBorder();

      this._createCharacterGraphic();

      this.graphics.scrollFactorX = 0;
      this.graphics.scrollFactorY = 0;
    }
  }, {
    key: "_createCharacterGraphic",
    value: function _createCharacterGraphic(character) {
      var x = this.opts.padding + 40;
      var y = this._getWindowY() + 40;
      if (this.characterImage) this.characterImage.destroy();
      this.characterImage = this.scene.add.image(x, y, character);
      this.characterImage.scrollFactorX = 0;
      this.characterImage.scrollFactorY = 0;
    }
  }, {
    key: "_createInnerWindow",
    value: function _createInnerWindow(x, y, rectWidth, rectHeight) {
      this.graphics.fillStyle(this.opts.windowColor, this.opts.windowAlpha);
      this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
  }, {
    key: "_createOuterWindow",
    value: function _createOuterWindow(x, y, rectWidth, rectHeight) {
      this.graphics.lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha);
      this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }
  }, {
    key: "_getGameWidth",
    value: function _getGameWidth() {
      return this.scene.sys.game.config.width * this.widthScaler;
    }
  }, {
    key: "_getGameHeight",
    value: function _getGameHeight() {
      return this.scene.sys.game.config.height;
    }
  }, {
    key: "_getWindowY",
    value: function _getWindowY() {
      return this.opts.windowHeight - this.opts.padding;
    }
  }, {
    key: "_calculateWindowDimensions",
    value: function _calculateWindowDimensions() {
      var x = this.opts.padding;

      var y = this._getWindowY();

      var rectWidth = this._getGameWidth() - this.opts.padding * 2;
      var rectHeight = this.opts.windowHeight;
      return {
        x: x,
        y: y,
        rectWidth: rectWidth,
        rectHeight: rectHeight
      };
    }
  }, {
    key: "_createCloseModalButton",
    value: function _createCloseModalButton() {
      this.closeBtn = this.scene.make.text({
        x: this._getGameWidth() - this.opts.padding - 14,
        y: this._getWindowY() + 3,
        text: 'X',
        style: {
          font: 'bold 10px Arial',
          fill: this.opts.closeBtnColor
        }
      });
      this.closeBtn.setInteractive();
      this.closeBtn.on('pointerover', function () {
        this.setTint(0xff0000);
      });
      this.closeBtn.on('pointerout', function () {
        this.clearTint();
      });
      this.closeBtn.on('pointerdown', function () {
        this.toggleWindow();
        this.shutdown();
      }.bind(this));
      this.closeBtn.scrollFactorX = 0;
      this.closeBtn.scrollFactorY = 0;
    }
  }, {
    key: "_createCloseModalButtonBorder",
    value: function _createCloseModalButtonBorder() {
      var x = this._getGameWidth() - this.opts.padding - 20;

      var y = this._getWindowY();

      this.graphics.strokeRect(x, y, 20, 20);
    }
  }, {
    key: "_setText",
    value: function _setText(text) {
      if (this.text) this.text.destroy();
      var x = this.opts.padding + 80;
      var y = this._getWindowY() + 10;
      this.text = this.scene.make.text({
        x: x,
        y: y,
        text: text,
        style: {
          wordWrap: {
            width: this._getGameWidth() - this.opts.padding * 2 - 80
          }
        }
      });
    }
  }, {
    key: "_animateText",
    value: function _animateText() {
      this.eventCounter++;
      this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);

      if (this.eventCounter === this.dialog.length) {
        this.timedEvent.remove();
        this.scene.events.emit('endOfText', true);
      }
    }
  }]);

  return DialogPlugin;
}(_phaser.default.Plugins.ScenePlugin);

exports.DialogPlugin = DialogPlugin;

/***/ }),

/***/ 1399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifebarPlugin = void 0;

var _phaser = _interopRequireDefault(__webpack_require__(94));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LifebarPlugin =
/*#__PURE__*/
function (_Phaser$Plugins$Scene) {
  _inherits(LifebarPlugin, _Phaser$Plugins$Scene);

  function LifebarPlugin(scene, pluginManager) {
    var _this;

    _classCallCheck(this, LifebarPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LifebarPlugin).call(this, scene, pluginManager));
    _this.pluginManager = pluginManager;
    _this.visible = true;
    _this.text;
    _this.graphics;
    _this.sceneOffset = 0; //scene.game.config.height

    return _this;
  }

  _createClass(LifebarPlugin, [{
    key: "create",
    value: function create() {
      var arg_opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaults = {
        borderThickness: 3,
        borderColor: 0x907748,
        borderAlpha: 1,
        windowAlpha: 0.8,
        windowColor: 0x303030,
        windowHeight: 50,
        windowWidth: 50,
        padding: 24
      };
      this.opts = {};

      for (var property in defaults) {
        this.opts[property] = arg_opts[property] || defaults[property];
      }

      this._createWindow(); // this.toggleWindow()


      this.setText("HELLO");
      this.graphics.scrollFactorX = 0;
      this.graphics.scrollFactorY = 0;
    }
  }, {
    key: "toggleWindow",
    value: function toggleWindow() {
      this.visible = !this.visible;
      if (this.text) this.text.visible = this.visible;
      if (this.graphics) this.graphics.visible = this.visible;
      this.scene.events.emit('toggleActive', !this.visible);
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this._setText(text);

      this.text.scrollFactorX = 0;
      this.text.scrollFactorY = 0;
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      this.graphics.clear();
      if (this.text) this.text.destroy();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.shutdown();
      this.scene = undefined;
    }
  }, {
    key: "_createWindow",
    value: function _createWindow() {
      var dimensions = this._calculateWindowDimensions();

      this.graphics = this.scene.add.graphics();

      this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);

      this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    }
  }, {
    key: "_createInnerWindow",
    value: function _createInnerWindow(x, y, rectWidth, rectHeight) {
      this.graphics.fillStyle(this.opts.windowColor, this.opts.windowAlpha);
      this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }
  }, {
    key: "_createOuterWindow",
    value: function _createOuterWindow(x, y, rectWidth, rectHeight) {
      this.graphics.lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha);
      this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }
  }, {
    key: "_getGameWidth",
    value: function _getGameWidth() {
      return this.scene.sys.game.config.width;
    }
  }, {
    key: "_getGameHeight",
    value: function _getGameHeight() {
      return this.scene.sys.game.config.height;
    }
  }, {
    key: "_getWindowY",
    value: function _getWindowY() {
      return this.opts.padding;
    }
  }, {
    key: "_getWindowX",
    value: function _getWindowX() {
      return this._getGameWidth() - this.opts.padding - this.opts.windowWidth;
    }
  }, {
    key: "_calculateWindowDimensions",
    value: function _calculateWindowDimensions() {
      var x = this._getWindowX();

      var y = this._getWindowY();

      var rectWidth = this.opts.windowWidth;
      var rectHeight = this.opts.windowHeight;
      return {
        x: x,
        y: y,
        rectWidth: rectWidth,
        rectHeight: rectHeight
      };
    }
  }, {
    key: "_setText",
    value: function _setText(text) {
      if (this.text) this.text.destroy();
      var x = this._getWindowX() + 10;
      var y = this._getWindowY() + 10;
      this.text = this.scene.make.text({
        x: x,
        y: y,
        text: text,
        style: {
          wordWrap: {
            width: this._getGameWidth() - this.opts.padding * 2 - 80
          }
        }
      });
    }
  }]);

  return LifebarPlugin;
}(_phaser.default.Plugins.ScenePlugin);

exports.LifebarPlugin = LifebarPlugin;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEnemy = exports.setupEnemy = void 0;

var _helper_functions = __webpack_require__(114);

var _statemachine = __webpack_require__(505);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var setupEnemy = function setupEnemy(name, enemy) {
  enemy.setCollideWorldBounds(true);
  enemy.currentState = 'idle';
  enemy.name = name;
  enemy.hitcooldown = 0;
  enemy.maxhitcooldown = 20;
  enemy.bitecooldown = 0;
  enemy.maxbitecooldown = 50;
  enemy.hp = 3;
  enemy.canBeEaten = false;
  enemy.destroyed = false;
  enemy.playerlocation = 1000;
  enemy.playerfacing = 'left';
  enemy.WALKING_SPEED = 20;
  enemy.stateMachine = new _statemachine.StateMachine('idling', {
    idling: new IdleState(),
    walking: new WalkingState(),
    biting: new BitingState(),
    takingDamage: new TakingDamageState(),
    dead: new DeadState(),
    gettingEaten: new GettingEatenState()
  }, [enemy]);

  enemy.isBlocked = function () {
    return enemy.body.blocked.right || enemy.body.blocked.left;
  };

  enemy.getFacing = function () {
    return enemy.body.facing < 14 ? 'left' : 'right';
  };

  enemy.getWalkingModifier = function () {
    return enemy.flipX ? -1 : 1;
  };

  enemy.destroySelf = function () {
    enemy.destroy();
    enemy.destroyed = true;
  };

  return enemy;
};

exports.setupEnemy = setupEnemy;

var updateEnemy = function updateEnemy(name, enemy, playerlocation, playerfacing) {
  enemy.edges = (0, _helper_functions.getEdges)(enemy);
  enemy.playerlocation = playerlocation;
  enemy.playerfacing = playerfacing;

  if (enemy.currentState != 'dead') {
    playerlocation.x > enemy.body.center.x ? enemy.flipX = true : enemy.flipX = false;
  }

  if (enemy.bitecooldown > 0) {
    enemy.bitecooldown--;
  }

  enemy.stateMachine.step();
  enemy.anims.play(enemy.currentState + name, true);
};

exports.updateEnemy = updateEnemy;

var IdleState =
/*#__PURE__*/
function (_State) {
  _inherits(IdleState, _State);

  function IdleState() {
    _classCallCheck(this, IdleState);

    return _possibleConstructorReturn(this, _getPrototypeOf(IdleState).apply(this, arguments));
  }

  _createClass(IdleState, [{
    key: "enter",
    value: function enter(enemy) {
      enemy.setVelocityX(0);
      enemy.currentState = 'idle';
    }
  }, {
    key: "execute",
    value: function execute(enemy) {
      var distancex = Math.abs(enemy.body.center.x - enemy.playerlocation.x);
      var distancey = Math.abs(enemy.body.center.y - enemy.playerlocation.y);
      var distance = (distancex + distancey) / 2;

      if (85 < distance && distance < 160) {
        this.stateMachine.transition('walking');
        return;
      }
    }
  }]);

  return IdleState;
}(_statemachine.State);

var WalkingState =
/*#__PURE__*/
function (_State2) {
  _inherits(WalkingState, _State2);

  function WalkingState() {
    _classCallCheck(this, WalkingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(WalkingState).apply(this, arguments));
  }

  _createClass(WalkingState, [{
    key: "enter",
    value: function enter(enemy) {
      enemy.currentState = 'walk';
      enemy.playerlocation.x > enemy.body.center.x ? enemy.flipX = true : enemy.flipX = false;
      var walkingModifier = enemy.flipX ? 1 : -1;
      enemy.setVelocityX(enemy.WALKING_SPEED * walkingModifier);
    }
  }, {
    key: "execute",
    value: function execute(enemy) {
      var distancex = Math.abs(enemy.body.center.x - enemy.playerlocation.x);
      var distancey = Math.abs(enemy.body.center.y - enemy.playerlocation.y);
      var distance = (distancex + distancey) / 2;

      if (distance > 160) {
        this.stateMachine.transition('idling');
        return;
      }

      if (distancex < 75 && enemy.bitecooldown === 0) {
        this.stateMachine.transition('biting');
        return;
      }
    }
  }]);

  return WalkingState;
}(_statemachine.State);

var BitingState =
/*#__PURE__*/
function (_State3) {
  _inherits(BitingState, _State3);

  function BitingState() {
    _classCallCheck(this, BitingState);

    return _possibleConstructorReturn(this, _getPrototypeOf(BitingState).apply(this, arguments));
  }

  _createClass(BitingState, [{
    key: "enter",
    value: function enter(enemy) {
      enemy.currentState = 'attack';
      enemy.bitecooldown = enemy.maxbitecooldown;
      enemy.setVelocityX(-10 * enemy.getWalkingModifier());
    }
  }, {
    key: "execute",
    value: function execute(enemy) {
      if ((0, _helper_functions.isLastFrame)(enemy)) {
        this.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return BitingState;
}(_statemachine.State);

var TakingDamageState =
/*#__PURE__*/
function (_State4) {
  _inherits(TakingDamageState, _State4);

  function TakingDamageState() {
    _classCallCheck(this, TakingDamageState);

    return _possibleConstructorReturn(this, _getPrototypeOf(TakingDamageState).apply(this, arguments));
  }

  _createClass(TakingDamageState, [{
    key: "enter",
    value: function enter(enemy) {
      enemy.setVelocityX(-5 * enemy.getWalkingModifier());
      enemy.currentState = 'damage';
      enemy.tint = 0xff00ff;
      enemy.hitcooldown = enemy.maxhitcooldown;
      enemy.hp--;
    }
  }, {
    key: "execute",
    value: function execute(enemy) {
      if (enemy.hp == 0) {
        enemy.tint = undefined;
        this.stateMachine.transition('dead');
        return;
      }

      enemy.hitcooldown--;

      if (enemy.hitcooldown == 0) {
        enemy.tint = undefined;
        this.stateMachine.transition('idling');
        return;
      }
    }
  }]);

  return TakingDamageState;
}(_statemachine.State);

var DeadState =
/*#__PURE__*/
function (_State5) {
  _inherits(DeadState, _State5);

  function DeadState() {
    _classCallCheck(this, DeadState);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeadState).apply(this, arguments));
  }

  _createClass(DeadState, [{
    key: "enter",
    value: function enter(enemy) {
      enemy.setVelocityX(0);
      enemy.currentState = 'dead';
    }
  }, {
    key: "execute",
    value: function execute(enemy) {}
  }]);

  return DeadState;
}(_statemachine.State);

var GettingEatenState =
/*#__PURE__*/
function (_State6) {
  _inherits(GettingEatenState, _State6);

  function GettingEatenState() {
    _classCallCheck(this, GettingEatenState);

    return _possibleConstructorReturn(this, _getPrototypeOf(GettingEatenState).apply(this, arguments));
  }

  _createClass(GettingEatenState, [{
    key: "enter",
    value: function enter(enemy) {
      var rotationModifier = enemy.playerfacing == 'left' ? -1 : 1;
      enemy.body.allowGravity = false;
      enemy.rotation = -.2 * rotationModifier;
      enemy.setVelocityX(0);
      enemy.currentState = 'dead';
      enemy.setVelocityY(-35);
      setTimeout(function () {
        enemy.setVelocityY(10);
        enemy.setVelocityX(10) * rotationModifier;
        enemy.rotation = -.45 * rotationModifier;
      }, 1500);
      setTimeout(function () {
        enemy.destroySelf();
      }, 3000);
    }
  }, {
    key: "execute",
    value: function execute(enemy) {}
  }]);

  return GettingEatenState;
}(_statemachine.State);

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assetsDict = void 0;
var assetsDict = {
  'maps': {
    'spring': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Fspringlarge.json?1545687869894',
    'spring2': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Fspring2.json?1554248970517'
  },
  'tiles': {
    'spring': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Fspringlarge.png?1543428930730'
  },
  'backgrounds': {
    'spring': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Fspring-background.jpg?1548620539854'
  },
  'sprites': {
    'hapax': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Fhapax.png?1552853540479',
    'tam': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Ftammuz.png?1543170704855'
  },
  'characters': {
    'p_tam': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Ftam.png?1543368077470',
    'p_hapax': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Fhapax-1.png?1545779587701'
  },
  'enemies': {
    'rarebit': 'https://cdn.glitch.com/e103aa44-e764-4aaf-a736-a7640d1ec83a%2Frabbit.png?1546364100726'
  }
};
exports.assetsDict = assetsDict;

/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _phaser = _interopRequireDefault(__webpack_require__(94));

var _player = __webpack_require__(1391);

var _misc = __webpack_require__(1392);

var _enemies = __webpack_require__(1393);

var _enemies2 = __webpack_require__(239);

var _player2 = __webpack_require__(1394);

var _images = __webpack_require__(240);

var _dialogue = __webpack_require__(1395);

var _enemylocations = __webpack_require__(1396);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var BaseScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(BaseScene, _Phaser$Scene);

  function BaseScene() {
    var _this;

    _classCallCheck(this, BaseScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseScene).call(this));
    _this.TILE_SIZE = 40;
    _this.WORLD_SIZE = {
      width: 2000,
      height: 1280
    };
    _this.player;
    _this.playerActive = false;
    _this.cursors;
    _this.spacekey;
    _this.gameOver = false;
    _this.sky;
    _this.phaser = _phaser.default;
    _this.textIndex = -1;
    _this.sceneName = _this.constructor.name;
    _this.dialogueList = _dialogue.dialogueDict[_this.sceneName];
    _this.enemies = [];
    _this.endingIntersection;

    _phaser.default.Scene.call(_assertThisInitialized(_assertThisInitialized(_this)), {
      key: _this.sceneName
    });

    return _this;
  }

  _createClass(BaseScene, [{
    key: "preload",
    value: function preload() {
      this.preloadDialogueImages(this.dialogueList);
    }
  }, {
    key: "buildMap",
    value: function buildMap() {
      var map;
      var tiles;
      map = this.make.tilemap({
        key: this.sceneName + '-map',
        tileWidth: this.TILE_SIZE,
        tileHeight: this.TILE_SIZE
      });
      this.sky = this.add.image(1000, 780, 'background');
      this.sky.fixedToCamera = true;
      this.cameras.main.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height);
      this.physics.world.setBounds(0, 0, this.WORLD_SIZE.width, this.WORLD_SIZE.height);
      tiles = map.addTilesetImage('springlarge', 'tiles');
      this.blocksLayer = map.createStaticLayer('blocks', tiles, 0, 0);
      this.blocksLayer.setCollisionBetween(0, 200);
      this.groundLayer = map.createStaticLayer('ground', tiles, 0, 0);
      this.groundLayer.setCollisionBetween(0, 200);
      return {
        map: map,
        tiles: tiles
      };
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      var mapthings;
      mapthings = this.buildMap();

      _enemylocations.enemiesDict[this.sceneName].forEach(function (item) {
        _this2.enemies.push({
          name: item.type,
          enemy: _this2.physics.add.sprite(_this2.tilesFromZero(item.location[0]), _this2.tilesFromBottom(item.location[1]), item.type)
        });
      });

      this.enemies.forEach(function (e) {
        (0, _enemies2.setupEnemy)(e.name, e.enemy);

        _this2.physics.add.collider(e.enemy, _this2.groundLayer);

        _this2.physics.add.collider(e.enemy, _this2.blocksLayer); // this.physics.add.collider(this.enemies[key], this.player)

      });
      this.player = this.physics.add.sprite(this.tilesFromZero(4.5), this.tilesFromBottom(5), 'hapax').setScale(2);
      this.player = (0, _player2.setupPlayer)(this.player);
      mapthings.map.createStaticLayer('water', mapthings.tiles, 0, 0); // eslint-disable-line

      var animations = _player.playerAnimations.concat(_misc.miscAnimations).concat(_enemies.enemyAnimations);

      animations.forEach(function (animation) {
        _this2.anims.create(animation());
      });
      this.events.on('toggleActive', function (isActive) {
        _this2.playerActive = isActive;
      }, this);
      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
      this.spacekey = this.input.keyboard.addKey(this.phaser.Input.Keyboard.KeyCodes.SPACE);
      this.cursors = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.groundLayer);
      this.physics.add.collider(this.player, this.blocksLayer, this.enableClimbPlatform);
      this.dialog.create();
      this.lifebar.create();
      this.lifebar.setText(this.player.hp);
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      if (this.gameOver) {
        return;
      }

      this.sky.tilePositionX = -(this.cameras.x * 0.7);
      (0, _player2.updatePlayer)(this.player);
      this.enemies = this.enemies.filter(function (e) {
        return e.enemy.destroyed === false;
      });
      this.enemies.forEach(function (e) {
        (0, _enemies2.updateEnemy)(e.name, e.enemy, {
          x: _this3.player.body.center.x,
          y: _this3.player.body.center.y
        }, _this3.player.getFacing());

        _this3.handleHits(e.enemy);
      });
    }
  }, {
    key: "destroyAll",
    value: function destroyAll() {
      this.player.destroySelf();
      this.enemies.forEach(function (e) {
        e.enemy.destroySelf();
      });
    }
  }, {
    key: "handleHits",
    value: function handleHits(enemy) {
      var enemyHitsPlayer = false;
      var intersecting = this.phaser.Geom.Intersects.RectangleToRectangle(enemy.getBounds(), this.player.getBounds());

      if (intersecting) {
        if ((this.player.currentState == 'bite' || this.player.currentState == 'smash') && enemy.hitcooldown == 0) {
          enemy.stateMachine.transition('takingDamage');
        } else {
          enemyHitsPlayer = enemyHitsPlayer || enemy.currentState == 'attack';
        }
      }

      if (enemyHitsPlayer && this.player.hitcooldown <= 0) {
        this.player.stateMachine.transition('takingDamage');
        this.lifebar.setText(this.player.hp);
      }

      if (enemy.hp === 0 && this.player.currentState == 'bite' && this.checkIfEnemyCanBeEaten(enemy, this.player)) {
        this.player.stateMachine.transition('consuming');
        enemy.stateMachine.transition('gettingEaten');
        this.lifebar.setText(this.player.hp);
      }
    }
  }, {
    key: "checkIfEnemyCanBeEaten",
    value: function checkIfEnemyCanBeEaten(enemy, player) {
      var relevantSide = player.flipX == true ? player.edges.left : player.edges.right;

      if (Math.abs(enemy.body.center.x - relevantSide) < enemy.body.halfWidth) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "preloadDialogueImages",
    value: function preloadDialogueImages(dialogueList) {
      var _this4 = this;

      dialogueList.forEach(function (dialogueItem) {
        _this4.load.image(dialogueItem[0], _images.assetsDict.characters[dialogueItem[0]]);
      });
    }
  }, {
    key: "enableClimbPlatform",
    value: function enableClimbPlatform(player, platform) {
      var platformEdges = {
        "left": platform.pixelX - platform.width / 2,
        "right": platform.pixelX + platform.width / 2,
        "top": platform.pixelY - platform.height / 2,
        "bottom": platform.pixelY + platform.height / 2
      };
      player.platform = platformEdges;
    }
  }, {
    key: "incrementText",
    value: function incrementText() {
      var _this5 = this;

      this.textIndex += 1;
      setTimeout(function () {
        _this5.setNextText(_this5.textIndex);
      }, 1000);
    }
  }, {
    key: "setNextText",
    value: function setNextText(index) {
      if (index < this.dialogueList.length) {
        this.dialog.setText(this.dialogueList[index], true);
      } else {
        this.dialog.toggleWindow();
        this.events.emit('toggleActive', true);
      }
    }
  }, {
    key: "tilesFromBottom",
    value: function tilesFromBottom(number) {
      return this.WORLD_SIZE.height - this.TILE_SIZE * number;
    }
  }, {
    key: "tilesFromZero",
    value: function tilesFromZero(number) {
      return this.TILE_SIZE * number;
    }
  }, {
    key: "tilesFromRight",
    value: function tilesFromRight(number) {
      return this.WORLD_SIZE.width - this.TILE_SIZE * number;
    }
  }]);

  return BaseScene;
}(_phaser.default.Scene);

exports.default = BaseScene;

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = exports.StateMachine = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StateMachine =
/*#__PURE__*/
function () {
  function StateMachine(initialState, possibleStates) {
    var stateArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, StateMachine);

    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null; // State instances get access to the state machine via this.stateMachine.

    var _arr = Object.values(this.possibleStates);

    for (var _i = 0; _i < _arr.length; _i++) {
      var state = _arr[_i];
      state.stateMachine = this;
    }
  }

  _createClass(StateMachine, [{
    key: "step",
    value: function step() {
      var _this$possibleStates$2;

      // On the first step, the state is null and we need to initialize the first state.
      if (this.state === null) {
        var _this$possibleStates$;

        this.state = this.initialState;

        (_this$possibleStates$ = this.possibleStates[this.state]).enter.apply(_this$possibleStates$, _toConsumableArray(this.stateArgs));
      } // Run the current state's execute


      (_this$possibleStates$2 = this.possibleStates[this.state]).execute.apply(_this$possibleStates$2, _toConsumableArray(this.stateArgs));
    }
  }, {
    key: "transition",
    value: function transition(newState) {
      var _this$possibleStates$3;

      this.state = newState;

      for (var _len = arguments.length, enterArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        enterArgs[_key - 1] = arguments[_key];
      }

      (_this$possibleStates$3 = this.possibleStates[this.state]).enter.apply(_this$possibleStates$3, _toConsumableArray(this.stateArgs).concat(enterArgs));
    }
  }]);

  return StateMachine;
}();

exports.StateMachine = StateMachine;

var State =
/*#__PURE__*/
function () {
  function State() {
    _classCallCheck(this, State);
  }

  _createClass(State, [{
    key: "enter",
    value: function enter() {}
  }, {
    key: "execute",
    value: function execute() {}
  }]);

  return State;
}();

exports.State = State;

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMiscSprite = void 0;

var updateMiscSprite = function updateMiscSprite(sprite, anim) {
  sprite.anims.play(anim, true);
};

exports.updateMiscSprite = updateMiscSprite;

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _phaser = _interopRequireDefault(__webpack_require__(94));

var _scene = _interopRequireDefault(__webpack_require__(1390));

var _scene2 = _interopRequireDefault(__webpack_require__(1397));

var _dialog = __webpack_require__(1398);

var _lifebar = __webpack_require__(1399);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameConfig = {
  type: _phaser.default.AUTO,
  width: 1000,
  height: 640,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      },
      debug: false
    }
  },
  plugins: {
    scene: [{
      key: 'DialogPlugin',
      plugin: _dialog.DialogPlugin,
      mapping: 'dialog'
    }, {
      key: 'LifebarPlugin',
      plugin: _lifebar.LifebarPlugin,
      mapping: 'lifebar'
    }]
  },
  scene: [_scene.default, _scene2.default]
};
new _phaser.default.Game(gameConfig);

/***/ })

},[507]);