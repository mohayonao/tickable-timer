(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TickableTimer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * The manual ticking `setInterval` / `clearInterval`
 * @class
 * @property {Function} callback
 * @property {Number}   delay
 * @property {Number}   remain
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interval = (function () {
  function Interval() {
    _classCallCheck(this, Interval);

    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  /**
   * setInterval
   * @param  {Function} callback
   * @param  {Number}   delay
   * @return {void}
   */

  _createClass(Interval, [{
    key: "set",
    value: function set(callback, delay) {
      this.callback = callback;
      this.delay = Math.max(1, +delay | 0);
      this.remain = this.delay;
    }

    /**
     * clearInterval
     * @return {void}
     */
  }, {
    key: "clear",
    value: function clear() {
      this.callback = null;
      this.delay = Infinity;
      this.remain = Infinity;
    }

    /**
     * ticking
     * @param  {Number} tick
     * @return {void}
     */
  }, {
    key: "tick",
    value: function tick() {
      var _tick = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      if (typeof this.callback === "function") {
        _tick = Math.max(1, +_tick | 0);
        this.remain -= _tick;
        while (this.remain <= 0) {
          this.callback();
          this.remain += this.delay;
        }
      }
    }
  }]);

  return Interval;
})();

exports["default"] = Interval;
module.exports = exports["default"];
},{}],2:[function(require,module,exports){
/**
 * The manual ticking `setTimeout` / `clearTimeout`
 * @class
 * @property {Function} callback
 * @property {Number}   delay
 * @property {Number}   remain
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeout = (function () {
  function Timeout() {
    _classCallCheck(this, Timeout);

    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  /**
   * setTimeout
   * @param  {Function} callback
   * @param  {Number}   delay
   * @return {void}
   */

  _createClass(Timeout, [{
    key: "set",
    value: function set(callback, delay) {
      this.callback = callback;
      this.delay = Math.max(1, +delay | 0);
      this.remain = this.delay;
    }

    /**
     * clearTimeout
     * @return {void}
     */
  }, {
    key: "clear",
    value: function clear() {
      this.callback = null;
      this.delay = Infinity;
      this.remain = Infinity;
    }

    /**
     * ticking
     * @param  {Number} tick
     * @return {void}
     */
  }, {
    key: "tick",
    value: function tick() {
      var _tick = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      if (typeof this.callback === "function") {
        _tick = Math.max(1, +_tick | 0);
        this.remain -= _tick;
        if (this.remain <= 0) {
          this.callback();
          this.callback = null;
          this.delay = Infinity;
          this.remain = Infinity;
        }
      }
    }
  }]);

  return Timeout;
})();

exports["default"] = Timeout;
module.exports = exports["default"];
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require("events");

var _Timeout = require("./Timeout");

var _Timeout2 = _interopRequireDefault(_Timeout);

var _Interval = require("./Interval");

var _Interval2 = _interopRequireDefault(_Interval);

var util = {
  remain: function remain(timer) {
    return timer.remain;
  },
  minValue: function minValue(a, b) {
    return a < b ? a : b;
  },
  collectIndex: function collectIndex(list, Klass) {
    var result = [];

    list.forEach(function (object, index) {
      if (object instanceof Klass) {
        result.push(index);
      }
    });

    return result;
  }
};

var TimerAPI = (function (_EventEmitter) {
  _inherits(TimerAPI, _EventEmitter);

  function TimerAPI() {
    _classCallCheck(this, TimerAPI);

    _get(Object.getPrototypeOf(TimerAPI.prototype), "constructor", this).call(this);

    this.setTimeout = this.setTimeout.bind(this);
    this.clearTimeout = this.clearTimeout.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
    this.tick = this.tick.bind(this);

    this._timerId = 0;
    this._timers = [];
  }

  _createClass(TimerAPI, [{
    key: "setTimeout",

    /**
     * setTimeout
     * @param  {Function} callback
     * @param  {Number}   delay
     * @param  {...*}     params
     * @return {Number}   timerId
     */
    value: function setTimeout(callback, delay) {
      for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        params[_key - 2] = arguments[_key];
      }

      var _this = this;

      var timer = new _Timeout2["default"]();

      this._timerId += 1;
      this._timers[this._timerId] = timer;

      var timerId = this._timerId;

      timer.set(function () {
        callback.apply(undefined, params);
        _this.clearTimeout(timerId);
      }, delay);

      return this._timerId;
    }

    /**
     * clearTimeout
     * @param  {Number} timerId
     * @return {void}
     */
  }, {
    key: "clearTimeout",
    value: function clearTimeout(timerId) {
      if (this._timers[timerId] instanceof _Timeout2["default"]) {
        this._timers[timerId].clear();
        delete this._timers[timerId];
      }
    }

    /**
     * setInterval
     * @param  {Function} callback
     * @param  {Number}   delay
     * @param  {...*}     params
     * @return {Number}   timerId
     */
  }, {
    key: "setInterval",
    value: function setInterval(callback, delay) {
      for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        params[_key2 - 2] = arguments[_key2];
      }

      var timer = new _Interval2["default"]();

      this._timerId += 1;
      this._timers[this._timerId] = timer;

      timer.set(function () {
        callback.apply(undefined, params);
      }, delay);

      return this._timerId;
    }

    /**
     * clearInterval
     * @param  {Number} timerId
     * @return {void}
     */
  }, {
    key: "clearInterval",
    value: function clearInterval(timerId) {
      if (this._timers[timerId] instanceof _Interval2["default"]) {
        this._timers[timerId].clear();
        delete this._timers[timerId];
      }
    }

    /**
     * ticking
     * @param  {Number} tick
     * @return {void}
     */
  }, {
    key: "tick",
    value: function tick() {
      var _this2 = this;

      var _tick = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      _tick = Math.max(1, +_tick | 0);

      var _loop = function () {
        var remain = _this2._timers.map(util.remain).reduce(util.minValue, _tick);

        _this2.emit("tick", remain);
        _this2._timers.forEach(function (timer) {
          timer.tick(remain);
        });
        _this2.emit("ticked", remain);
        _tick -= remain;
      };

      while (_tick > 0) {
        _loop();
      }
    }

    /**
     * clearAllTimers
     * @return {void}
     */
  }, {
    key: "clearAllTimers",
    value: function clearAllTimers() {
      this._timers.splice(0).forEach(function (timer) {
        timer.clear();
      });
    }
  }, {
    key: "timers",
    get: function get() {
      return util.collectIndex(this._timers, Object);
    }
  }, {
    key: "intervals",
    get: function get() {
      return util.collectIndex(this._timers, _Interval2["default"]);
    }
  }, {
    key: "timeouts",
    get: function get() {
      return util.collectIndex(this._timers, _Timeout2["default"]);
    }
  }]);

  return TimerAPI;
})(_events.EventEmitter);

exports["default"] = TimerAPI;
module.exports = exports["default"];
},{"./Interval":1,"./Timeout":2,"events":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _TimerAPI = require("./TimerAPI");

var _TimerAPI2 = _interopRequireDefault(_TimerAPI);

exports["default"] = new _TimerAPI2["default"]();
module.exports = exports["default"];
},{"./TimerAPI":3}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[4])(4)
});