!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.TickableTimer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.setTimeout = setTimeout;
exports.clearTimeout = clearTimeout;
exports.setInterval = setInterval;
exports.clearInterval = clearInterval;
exports.tick = tick;
var TickableTimeout = require("tickable-timeout").TickableTimeout;
var TickableInterval = require("tickable-interval").TickableInterval;


var _timerId = 0;
var _timers = [];
var _ = {
  remain: function (timer) {
    return timer.remain;
  },
  minValue: function (a, b) {
    return a < b ? a : b;
  } };

/**
 * setTimeout
 * @param {function} callback
 * @param {number} delay
 * @return {number} timerId
 * @public
 */
function setTimeout(callback, delay) {
  var timer = new TickableTimeout();

  _timerId += 1;
  _timers[_timerId] = timer;

  var timerId = _timerId;
  timer.set(function () {
    callback();
    _timers[timerId].clear();
    delete _timers[timerId];
  }, delay);

  return _timerId;
}

/**
 * clearTimeout
 * @param {number} timerId
 * @public
 */
function clearTimeout(timerId) {
  if (_timers[timerId] instanceof TickableTimeout) {
    _timers[timerId].clear();
    delete _timers[timerId];
  }
}

/**
 * setInterval
 * @param {function} callback
 * @param {number} delay
 * @return {number} timerId
 * @public
 */
function setInterval(callback, delay) {
  var timer = new TickableInterval();

  _timerId += 1;
  _timers[_timerId] = timer;

  timer.set(callback, delay);

  return _timerId;
}

/**
 * clearInterval
 * @param {number} timerId
 * @public
 */
function clearInterval(timerId) {
  if (_timers[timerId] instanceof TickableInterval) {
    _timers[timerId].clear();
    delete _timers[timerId];
  }
}

/**
 * ticking
 * @param {number} tick
 * @public
 */
function tick() {
  var tick = arguments[0] === undefined ? 1 : arguments[0];
  tick = Math.max(1, +tick | 0);

  while (tick > 0) {
    var remain = _timers.map(_.remain).reduce(_.minValue, tick);
    _timers.forEach(function (timer) {
      return timer.tick(remain);
    });
    tick -= remain;
  }
}

},{"tickable-interval":2,"tickable-timeout":3}],2:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * The manual ticking `setInterval` / `clearInterval`
 * @class
 * @property {function} callback
 * @property {number} delay
 * @property {number} remain
 */
var TickableInterval = (function () {
  function TickableInterval() {
    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  _prototypeProperties(TickableInterval, null, {
    set: {

      /**
       * setInterval
       * @param {function} callback
       * @param {number} delay
       * @public
       */
      value: function set(callback, delay) {
        this.callback = callback;
        this.delay = Math.max(1, +delay | 0);
        this.remain = this.delay;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    clear: {

      /**
       * clearInterval
       * @public
       */
      value: function clear() {
        this.callback = null;
        this.delay = Infinity;
        this.remain = Infinity;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    tick: {

      /**
       * ticking
       * @param {number} tick
       * @public
       */
      value: function tick() {
        var tick = arguments[0] === undefined ? 1 : arguments[0];
        if (typeof this.callback === "function") {
          tick = Math.max(1, +tick | 0);
          this.remain -= tick;
          while (this.remain <= 0) {
            this.callback();
            this.remain += this.delay;
          }
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TickableInterval;
})();

exports.TickableInterval = TickableInterval;
},{}],3:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/**
 * The manual ticking `setTimeout` / `clearTimeout`
 * @class
 * @property {function} callback
 * @property {number} delay
 * @property {number} remain
 */
var TickableTimeout = (function () {
  function TickableTimeout() {
    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  _prototypeProperties(TickableTimeout, null, {
    set: {

      /**
       * setTimeout
       * @param {function} callback
       * @param {number} delay
       * @public
       */
      value: function set(callback, delay) {
        this.callback = callback;
        this.delay = Math.max(1, +delay | 0);
        this.remain = this.delay;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    clear: {

      /**
       * clearTimeout
       * @public
       */
      value: function clear() {
        this.callback = null;
        this.delay = Infinity;
        this.remain = Infinity;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    tick: {

      /**
       * ticking
       * @param {number} tick
       * @public
       */
      value: function tick() {
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
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TickableTimeout;
})();

exports.TickableTimeout = TickableTimeout;
},{}]},{},[1])(1)
});