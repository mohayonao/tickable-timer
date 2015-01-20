"use strict";

import {TickableTimeout} from "tickable-timeout";
import {TickableInterval} from "tickable-interval";

var _timerId = 0;
var _timeouts = {};
var _intervals = {};

/**
 * @param {function} callback
 * @param {number} timeout
 * @return {number} timerId
 * @api public
 */
export function setTimeout(callback, timeout) {
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
export function clearTimeout(timerId) {
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
export function setInterval(callback, interval) {
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
export function clearInterval(timerId) {
  if (_intervals[timerId]) {
    _intervals[timerId].clear();
    delete _intervals[timerId];
  }
}

/**
 * @param {number} tick
 * @api public
 */
export function tick(tick) {
  Object.keys(_timeouts).forEach((timerId)=> {
    _timeouts[timerId].tick(tick);
  });
  Object.keys(_intervals).forEach((timerId)=> {
    _intervals[timerId].tick(tick);
  });
}
