;(function () {

document.addEventListener('keydown', function (e) {
  console.log(e.type, e);
});

document.addEventListener('keyup', function (e) {
  console.log(e.type, e);
});

document.addEventListener('keypress', function (e) {
  console.log(e.type, e);
});

// window.addEventListener('gamepadbuttondown', function (e) {
//   console.log('gamepad', e.gamepad, e.button);
// });

var triggerKeydownEvent = gamepadInput.utils.triggerKeydownEvent;
var triggerKeypressEvent = gamepadInput.utils.triggerKeypressEvent;
var triggerKeyupEvent = gamepadInput.utils.triggerKeyupEvent;

var axisXDownDir;
var axisYDownDir;

function triggerPreviousMoveOnReset(value) {
  console.log('¬', Math.abs(value), gamepadInput.config.axisThresholdReset);

  if (Math.abs(value) >= gamepadInput.config.axisThresholdReset) {
    return false;
  }

  if (axisXDownDir === 'left') {
    triggerKeypressEvent({key: 'ArrowLeft', keyCode: 37});
    triggerKeyupEvent({key: 'ArrowLeft', keyCode: 37});
  }
  if (axisXDownDir === 'right') {
    triggerKeypressEvent({key: 'ArrowRight', keyCode: 39});
    triggerKeyupEvent({key: 'ArrowRight', keyCode: 39});
  }

  if (axisYDownDir === 'up') {
    triggerKeypressEvent({key: 'ArrowUp', keyCode: 38});
    triggerKeyupEvent({key: 'ArrowUp', keyCode: 38});
  }
  if (axisYDownDir === 'down') {
    triggerKeypressEvent({key: 'ArrowDown', keyCode: 40});
    triggerKeyupEvent({key: 'ArrowDown', keyCode: 40});
  }

  return true;
}

function moveX(gamepad, axis, value) {
  var proceed = triggerPreviousMoveOnReset(value);

  if (!proceed) {
    return;
  }

  console.log('[stick x]', axis, value);

  if (value > 0) {
    if (axisXDownDir === 'left') {
      triggerKeypressEvent({key: 'ArrowLeft', keyCode: 37});
      triggerKeyupEvent({key: 'ArrowLeft', keyCode: 37});
    }

    triggerKeydownEvent({key: 'ArrowRight', keyCode: 39});
    axisXDownDir = 'right';
  } else {
    if (axisXDownDir === 'right') {
      triggerKeypressEvent({key: 'ArrowRight', keyCode: 39});
      triggerKeyupEvent({key: 'ArrowRight', keyCode: 39});
    }

    triggerKeydownEvent({key: 'ArrowLeft', keyCode: 37});
    axisXDownDir = 'left';
  }
}

function moveY(gamepad, axis, value) {
  var proceed = triggerPreviousMoveOnReset(value);

  if (!proceed) {
    return;
  }

  console.log('[stick y]', axis, value);

  if (value > 0) {
    if (axisYDownDir === 'down') {
      triggerKeypressEvent({key: 'ArrowDown', keyCode: 40});
      triggerKeyupEvent({key: 'ArrowDown', keyCode: 40});
    }

    triggerKeydownEvent({key: 'ArrowUp', keyCode: 38});
    axisYDownDir = 'up';
  } else {
    if (axisYDownDir === 'up') {
      triggerKeypressEvent({key: 'ArrowUp', keyCode: 38});
      triggerKeyupEvent({key: 'ArrowUp', keyCode: 38});
    }

    triggerKeydownEvent({key: 'ArrowDown', keyCode: 40});
    axisYDownDir = 'down';
  }
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

gamepadInput.config.axisThresholdReset = 0.15;

})();
