;(function () {

var timeSinceLast = {};

function keyListener(e) {
  var now = performance.now();
  console.log(e.type, e, now - (timeSinceLast[e.type + '.' + e.which] || now));
  timeSinceLast[e.type + '.' + e.which] = performance.now();
}

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
document.addEventListener('keypress', keyListener);


var triggerKeydownEvent = gamepadInput.utils.triggerKeydownEvent;
var triggerKeypressEvent = gamepadInput.utils.triggerKeypressEvent;
var triggerKeyupEvent = gamepadInput.utils.triggerKeyupEvent;

var axisXDownDir;
var axisYDownDir;

var intervals = {
  up: {time: 0},
  down: {time: 0},
  left: {time: 0},
  right: {time: 0},
};


function _arrowLeftDown() {
  triggerKeydownEvent({key: 'ArrowLeft', keyCode: 37});
  return triggerKeypressEvent({key: 'ArrowLeft', keyCode: 37});
}

function _arrowRightDown() {
  triggerKeydownEvent({key: 'ArrowRight', keyCode: 39});
  return triggerKeypressEvent({key: 'ArrowRight', keyCode: 39});
}

function _arrowLeftUp() {
  return triggerKeyupEvent({key: 'ArrowLeft', keyCode: 37});
}

function _arrowRightUp() {
  return triggerKeyupEvent({key: 'ArrowRight', keyCode: 39});
}


function arrowLeftDown() {
  return throttle(_arrowLeftDown, gamepadInput.config.throttleTime)();
}

function arrowRightDown() {
  return throttle(_arrowRightDown, gamepadInput.config.throttleTime)();
}

function arrowLeftUp() {
  delete axisXDownDir;
  return throttle(_arrowLeftUp, gamepadInput.config.throttleTime)();
}

function arrowRightUp() {
  delete axisXDownDir;
  return throttle(_arrowRightUp, gamepadInput.config.throttleTime)();
}


function throttle(callback, limit) {
  limit = limit || 0;
  var wait = false;
  var self = this;
  var args = arguments;
  return function () {
    if (!wait) {
      callback.apply(self, args);
      wait = true;
      setInterval(function () {
        wait = false;
      }, limit);
    }
  };
}


function moveX(gamepad, axis, value) {
  console.log('[stick x]', axis, value);

  if (value > 0) {
    if (Math.abs(value) > gamepadInput.config.axisThresholdReset) {
      arrowRightDown();

      intervals.right = setInterval(function () {

        if (gamepad.axes[axis] <= gamepadInput.config.axisThresholdReset || axisXDownDir !== 'right') {
          arrowRightUp();
          return;
        }

        intervals.right.time = Math.abs(gamepad.axes[axis]) * gamepadInput.config.axisThresholdReset;
        axisXDownDir = 'right';

      }, intervals.right.time);
    } else if (axisXDownDir === 'right') {
      arrowRightUp();
    }
  } else {
    if (Math.abs(value) > gamepadInput.config.axisThresholdReset) {
      arrowLeftDown();

      intervals.left = setInterval(function () {

        if (gamepad.axes[axis] <= gamepadInput.config.axisThresholdReset * -1 || axisXDownDir !== 'left') {
          arrowLeftUp();
          return;
        }

        intervals.left.time = Math.abs(gamepad.axes[axis]) * gamepadInput.config.axisThresholdReset;
        axisXDownDir = 'left';

      }, intervals.left.time);
    } else if (axisXDownDir === 'left') {
      arrowRightUp();
    }
  }
}

function moveY(gamepad, axis, value) {
}

gamepadInput.assign({
  axisThreshold: 0.00,  // TODO: Uplift to `_onGamepad*` methods, maybe?
  indices: {
    standard: {

      // 'b0.down': function () {
      //   console.log('[c-up]');
      //   triggerKeydownEvent('i'.charCodeAt(0));
      // },

      // 'b1.down': function () {
      //   console.log('[c-right]');
      //   triggerKeydownEvent('k'.charCodeAt(0));
      // },

      // 'b2.down': function () {
      //   console.log('[c-down]');
      //   triggerKeydownEvent('j'.charCodeAt(0));
      // },

      // 'b3.down': function () {
      //   console.log('[c-left]');
      //   triggerKeydownEvent('l'.charCodeAt(0));
      // },

      // 'b6.down': function () {
      //   console.log('[a]');
      //   triggerKeydownEvent('g'.charCodeAt(0));
      // },

      // 'b8.down': function () {
      //   console.log('[b]');
      //   triggerKeydownEvent('f'.charCodeAt(0));
      // },

      // 'b10.down': function () {
      //   console.log('[start]');
      //   triggerKeydownEvent('s');
      // },

/*

space+space to start game
Alt (18) to fire
Control (17) to jump
F1 (112) for help
Escape to exit
P to pause

*/

      'b10.down': function () {
        // Start button.
        triggerKeydownEvent(' ');
      },

      'b10.up': function () {
        // Start button.
        triggerKeypressEvent(' ');
        triggerKeydownEvent(' ');
      },

      'b11.down': function () {
        // Fire.
        // A button.
        triggerKeydownEvent({key: 'Alt', keyCode: 18});
      },

      'b11.up': function () {
        // Fire.
        // A button.
        triggerKeypressEvent({key: 'Alt', keyCode: 18});
        triggerKeydownEvent({key: 'Alt', keyCode: 18});
      },

      'b13.down': function () {
        // Jump.
        // X button.
        triggerKeydownEvent({key: 'Control', keyCode: 17});
      },

      'b13.up': function () {
        triggerKeypressEvent({key: 'Control', keyCode: 17});
        triggerKeydownEvent({key: 'Control', keyCode: 17});
      },

      // 'b4.down': function () {
      //   console.log('[left]');
      //   triggerKeydownEvent('x'.charCodeAt(0));
      // },

      // 'b5.down': function () {
      //   console.log('[right]');
      //   triggerKeydownEvent('c'.charCodeAt(0));
      // },

      // 'b7.down': function () {
      //   console.log('[z]');
      //   triggerKeydownEvent('z'.charCodeAt(0));
      // },

      // 'b12.down': function () {
      //   console.log('[up]');
      //   triggerKeydownEvent('w'.charCodeAt(0));
      // },

      // 'b13.down': function () {
      //   console.log('[down]');
      //   triggerKeydownEvent('s'.charCodeAt(0));
      // },

      // 'b14.down': function () {
      //   console.log('[left]');
      //   triggerKeydownEvent('a'.charCodeAt(0));
      // },

      // 'b15.down': function () {
      //   console.log('[right]');
      //   triggerKeydownEvent('d'.charCodeAt(0));
      // },

      'a0': moveX,

      'a1': moveY

    }
  }
});

gamepadInput.config.axisThresholdReset = 0.5; // Axis range is `[|0|..|1|]`.
gamepadInput.config.throttleTime = 80;  // Time is in milliseconds (average `keydown`/`keypress` fires every 60-80 ms).

})();
