"use strict";

import {TickableTimeout} from "tickable-timeout";
import {TickableInterval} from "tickable-interval";

var _timerId = 0;
var _timers = [];
var _ = {
  remain: timer => timer.remain,
  minValue: (a, b) => a < b ? a : b,
};

/**
 * setTimeout
 * @param {function} callback
 * @param {number} delay
 * @return {number} timerId
 * @public
 */
export function setTimeout(callback, delay) {
  var timer = new TickableTimeout();

  _timerId += 1;
  _timers[_timerId] = timer;

  var timerId = _timerId;
  timer.set(()=> {
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
export function clearTimeout(timerId) {
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
export function setInterval(callback, delay) {
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
export function clearInterval(timerId) {
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
export function tick(tick = 1) {
  tick = Math.max(1, +tick|0);

  while (tick > 0) {
    var remain = _timers.map(_.remain).reduce(_.minValue, tick);
    _timers.forEach(timer => timer.tick(remain));
    tick -= remain;
  }
}
