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
var _timeouts = {};
var _intervals = {};

/**
 * @param {function} callback
 * @param {number} timeout
 * @return {number} timerId
 * @api public
 */
function setTimeout(callback, timeout) {
  var timer = new TickableTimeout();

  timer.set(callback, +timeout || 0);

  _timerId += 1;
  _timeouts[_timerId] = timer;

  return _timerId;
}

/**
 * @param {number} timerId
 * @api public
 */
function clearTimeout(timerId) {
  if (_timeouts[timerId]) {
    _timeouts[timerId].clear();
    delete _timeouts[timerId];
  }
}

/**
 * @param {function} callback
 * @param {number} interval
 * @return {number} timerId
 * @api public
 */
function setInterval(callback, interval) {
  var timer = new TickableInterval();

  timer.set(callback, +interval || 0);

  _timerId += 1;
  _intervals[_timerId] = timer;

  return _timerId;
}

/**
 * @param {number} timerId
 * @api public
 */
function clearInterval(timerId) {
  if (_intervals[timerId]) {
    _intervals[timerId].clear();
    delete _intervals[timerId];
  }
}

/**
 * @param {number} tick
 * @api public
 */
function tick(tick) {
  Object.keys(_timeouts).forEach(function (timerId) {
    _timeouts[timerId].tick(tick);
  });
  Object.keys(_intervals).forEach(function (timerId) {
    _intervals[timerId].tick(tick);
  });
}

},{"tickable-interval":2,"tickable-timeout":3}],2:[function(require,module,exports){
"use strict";

/**
 * The manual ticking `setInterval`
 * @class TickableInterval
 */
var TickableInterval = function TickableInterval() {
  if (!(this instanceof TickableInterval)) {
    return new TickableInterval();
  }

  var _callback = null;
  var _interval = Infinity;
  var _remain = Infinity;

  /**
   * @api public
   * @param {function} callback
   * @param {number} interval
   */
  this.set = function (callback, interval) {
    _callback = callback;
    _interval = Math.max(1, +interval);
    _remain = _interval;
  };

  /**
   * @api public
   */
  this.clear = function () {
    _callback = null;
    _interval = Infinity;
    _remain = Infinity;
  };

  /**
   * @api public
   * @param {number} tick
   */
  this.tick = function (tick) {
    if (typeof _callback === "function") {
      _remain -= tick;
      while (_remain <= 0) {
        _callback();
        _remain += _interval;
      }
    }
  };
};

exports.TickableInterval = TickableInterval;

},{}],3:[function(require,module,exports){
"use strict";

/**
* The manual ticking `setTimeout`
* @class TickableTimeout
*/
var TickableTimeout = function TickableTimeout() {
  if (!(this instanceof TickableTimeout)) {
    return new TickableTimeout();
  }

  var _callback = null;
  var _timeout = Infinity;

  /**
  * @api public
  * @param {function} callback
  * @param {number} timeout
  */
  this.set = function (callback, timeout) {
    _callback = callback;
    _timeout = Math.max(1, +timeout);
  };

  /**
  * @api public
  */
  this.clear = function () {
    _callback = null;
    _timeout = Infinity;
  };

  /**
  * @api public
  * @param {number} tick
  */
  this.tick = function (tick) {
    if (typeof _callback === "function") {
      _timeout -= tick;
      if (_timeout <= 0) {
        _callback();
        _callback = null;
      }
    }
  };
};

exports.TickableTimeout = TickableTimeout;

},{}]},{},[1])(1)
});