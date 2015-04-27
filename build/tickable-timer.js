(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TickableTimer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The manual ticking `setInterval` / `clearInterval`
 * @class
 * @property {Function} callback
 * @property {Number}   delay
 * @property {Number}   remain
 */

var Interval = (function () {
  function Interval() {
    _classCallCheck(this, Interval);

    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  _createClass(Interval, [{
    key: "set",

    /**
     * setInterval
     * @param  {Function} callback
     * @param  {Number}   delay
     * @return {void}
     */
    value: function set(callback, delay) {
      this.callback = callback;
      this.delay = Math.max(1, +delay | 0);
      this.remain = this.delay;
    }
  }, {
    key: "clear",

    /**
     * clearInterval
     * @return {void}
     */
    value: function clear() {
      this.callback = null;
      this.delay = Infinity;
      this.remain = Infinity;
    }
  }, {
    key: "tick",

    /**
     * ticking
     * @param  {Number} tick
     * @return {void}
     */
    value: (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      var tick = arguments[0] === undefined ? 1 : arguments[0];

      if (typeof this.callback === "function") {
        tick = Math.max(1, +tick | 0);
        this.remain -= tick;
        while (this.remain <= 0) {
          this.callback();
          this.remain += this.delay;
        }
      }
    })
  }]);

  return Interval;
})();

exports["default"] = Interval;
module.exports = exports["default"];
},{}],2:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The manual ticking `setTimeout` / `clearTimeout`
 * @class
 * @property {Function} callback
 * @property {Number}   delay
 * @property {Number}   remain
 */

var Timeout = (function () {
  function Timeout() {
    _classCallCheck(this, Timeout);

    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  _createClass(Timeout, [{
    key: "set",

    /**
     * setTimeout
     * @param  {Function} callback
     * @param  {Number}   delay
     * @return {void}
     */
    value: function set(callback, delay) {
      this.callback = callback;
      this.delay = Math.max(1, +delay | 0);
      this.remain = this.delay;
    }
  }, {
    key: "clear",

    /**
     * clearTimeout
     * @return {void}
     */
    value: function clear() {
      this.callback = null;
      this.delay = Infinity;
      this.remain = Infinity;
    }
  }, {
    key: "tick",

    /**
     * ticking
     * @param  {Number} tick
     * @return {void}
     */
    value: (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      var tick = arguments[0] === undefined ? 1 : arguments[0];

      if (typeof this.callback === "function") {
        tick = Math.max(1, +tick | 0);
        this.remain -= tick;
        if (this.remain <= 0) {
          this.callback();
          this.callback = null;
          this.delay = Infinity;
          this.remain = Infinity;
        }
      }
    })
  }]);

  return Timeout;
})();

exports["default"] = Timeout;
module.exports = exports["default"];
},{}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventEmitter2 = require("events");

var _Timeout = require("./timeout");

var _Timeout2 = _interopRequireDefault(_Timeout);

var _Interval = require("./interval");

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
  } };

var TimerAPI = (function (_EventEmitter) {
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

  _inherits(TimerAPI, _EventEmitter);

  _createClass(TimerAPI, [{
    key: "timers",
    get: function () {
      return util.collectIndex(this._timers, Object);
    }
  }, {
    key: "intervals",
    get: function () {
      return util.collectIndex(this._timers, _Interval2["default"]);
    }
  }, {
    key: "timeouts",
    get: function () {
      return util.collectIndex(this._timers, _Timeout2["default"]);
    }
  }, {
    key: "setTimeout",

    /**
     * setTimeout
     * @param  {Function} callback
     * @param  {Number}   delay
     * @return {Number}   timerId
     */
    value: function setTimeout(callback, delay) {
      var _this4 = this;

      var timer = new _Timeout2["default"]();

      this._timerId += 1;
      this._timers[this._timerId] = timer;

      var timerId = this._timerId;

      timer.set(function () {
        callback();
        if (_this4._timers[timerId]) {
          _this4._timers[timerId].clear();
          delete _this4._timers[timerId];
        }
      }, delay);

      return this._timerId;
    }
  }, {
    key: "clearTimeout",

    /**
     * clearTimeout
     * @param  {Number} timerId
     * @return {void}
     */
    value: function clearTimeout(timerId) {
      if (this._timers[timerId] instanceof _Timeout2["default"]) {
        this._timers[timerId].clear();
        delete this._timers[timerId];
      }
    }
  }, {
    key: "setInterval",

    /**
     * setInterval
     * @param  {Function} callback
     * @param  {Number}   delay
     * @return {Number}   timerId
     */
    value: function setInterval(callback, delay) {
      var timer = new _Interval2["default"]();

      this._timerId += 1;
      this._timers[this._timerId] = timer;

      timer.set(callback, delay);

      return this._timerId;
    }
  }, {
    key: "clearInterval",

    /**
     * clearInterval
     * @param  {Number} timerId
     * @return {void}
     */
    value: function clearInterval(timerId) {
      if (this._timers[timerId] instanceof _Interval2["default"]) {
        this._timers[timerId].clear();
        delete this._timers[timerId];
      }
    }
  }, {
    key: "tick",

    /**
     * ticking
     * @param  {Number} tick
     * @return {void}
     */
    value: (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      var _this5 = this;

      var tick = arguments[0] === undefined ? 1 : arguments[0];

      tick = Math.max(1, +tick | 0);

      var _loop = function () {
        var remain = _this5._timers.map(util.remain).reduce(util.minValue, tick);
        _this5.emit("tick", remain);
        _this5._timers.forEach(function (timer) {
          timer.tick(remain);
        });
        _this5.emit("ticked", remain);
        tick -= remain;
      };

      while (tick > 0) {
        _loop();
      }
    })
  }]);

  return TimerAPI;
})(_EventEmitter2.EventEmitter);

exports["default"] = TimerAPI;
module.exports = exports["default"];
},{"./interval":1,"./timeout":2,"events":5}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TimerAPI = require("./timer-api");

var _TimerAPI2 = _interopRequireDefault(_TimerAPI);

exports["default"] = new _TimerAPI2["default"]();
module.exports = exports["default"];
},{"./timer-api":3}],5:[function(require,module,exports){
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