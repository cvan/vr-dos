;(function () {

function GamepadInput() {
  this._debug = true;
  this._pollingInterval = {};
  this.config = {};
  this.gamepads = {};
}

/**
 * Polls the gamepad state, updating the `Gamepads` instance's `state`
 * property with the latest gamepad data.
 */
GamepadInput.prototype._update = function () {
  this.gamepads.update();
  window.requestAnimationFrame(this._update.bind(this));
};

GamepadInput.prototype.init = function (runtime) {
  var self = this;

  self.gamepads = new Gamepads(self.config);

  if (!self.gamepads.gamepadsSupported) {
    return;
  }

  // At the time of self writing, Firefox is the only browser that
  // fires the `gamepadconnected` event. For the other browsers
  // <https://crbug.com/344556>, we start polling every 200ms
  // until the first gamepad is connected.
  if (Gamepads.utils.browser !== 'firefox') {
    self._pollingInterval = window.setInterval(function () {
      if (self.gamepads.poll().length) {
        self._update();
        window.clearInterval(self._pollingInterval);
      }
    }, 200);
  }

  window.addEventListener('gamepadconnected', function (e) {
    if (self._debug) {
      console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
        e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length,
        e.gamepad.axes.length);
    }

    self._update();
  });

  window.addEventListener('gamepaddisconnected', function (e) {
    if (self._debug) {
      console.log('Gamepad removed at index %d: %s.', e.gamepad.index,
        e.gamepad.id);
    }
  });
}

/**
 * Assigns gamepad configurations.
 * @param {Object} config Options object to use for creating `Gamepads` instance.
 */
GamepadInput.prototype.assign = function (config) {
  this.config = config || {};
  this.init();
};


var gamepadInput = new GamepadInput();

gamepadInput.utils = {};

var triggerKeyEvent = gamepadInput.utils.triggerKeyEvent = function (type, opts) {
  if (typeof type === 'undefined') {
    triggerKeydownEvent(opts);
    triggerKeypressEvent(opts);
    triggerKeyupEvent(opts);
    return;
  }

  if (typeof opts === 'string' && opts.length === 1) {
    var key = opts.toLowerCase();
    var keyCode = opts.toUpperCase().charCodeAt(0);
    opts = {key: key, keyCode: keyCode};
  }

  var evt = new KeyboardEvent(type, {
    view: window,
    bubbles: true,
    cancelable: true,
    key: opts.key,
    keyCode: opts.keyCode,
    charCode: opts.charCode,
    which: opts.keyCode,
  });
  (opts.el || document).dispatchEvent(evt);

  console.log('º', type, evt);

  return evt;
};

var triggerKeydownEvent = gamepadInput.utils.triggerKeydownEvent = function (opts) {
  return triggerKeyEvent('keydown', opts);
};

var triggerKeypressEvent = gamepadInput.utils.triggerKeypressEvent = function (opts) {
  return triggerKeyEvent('keypress', opts);
};

var triggerKeyupEvent = gamepadInput.utils.triggerKeyupEvent = function (opts) {
  return triggerKeyEvent('keyup', opts);
};


window.gamepadInput = gamepadInput;

})();
