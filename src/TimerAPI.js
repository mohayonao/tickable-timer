import { EventEmitter } from "events";
import Timeout from "./Timeout";
import Interval from "./Interval";

let util = {
  remain(timer) {
    return timer.remain;
  },
  minValue(a, b) {
    return a < b ? a : b;
  },
  collectIndex(list, Klass) {
    let result = [];

    list.forEach((object, index) => {
      if (object instanceof Klass) {
        result.push(index);
      }
    });

    return result;
  },
};

export default class TimerAPI extends EventEmitter {
  constructor() {
    super();

    this.setTimeout = this.setTimeout.bind(this);
    this.clearTimeout = this.clearTimeout.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
    this.tick = this.tick.bind(this);

    this._timerId = 0;
    this._timers = [];
  }

  get timers() {
    return util.collectIndex(this._timers, Object);
  }

  get intervals() {
    return util.collectIndex(this._timers, Interval);
  }

  get timeouts() {
    return util.collectIndex(this._timers, Timeout);
  }

  /**
   * setTimeout
   * @param  {Function} callback
   * @param  {Number}   delay
   * @param  {...*}     params
   * @return {Number}   timerId
   */
  setTimeout(callback, delay, ...params) {
    let timer = new Timeout();

    this._timerId += 1;
    this._timers[this._timerId] = timer;

    let timerId = this._timerId;

    timer.set(() => {
      callback(...params);
      this.clearTimeout(timerId);
    }, delay);

    return this._timerId;
  }

  /**
   * clearTimeout
   * @param  {Number} timerId
   * @return {void}
   */
  clearTimeout(timerId) {
    if (this._timers[timerId] instanceof Timeout) {
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
  setInterval(callback, delay, ...params) {
    let timer = new Interval();

    this._timerId += 1;
    this._timers[this._timerId] = timer;

    timer.set(() => {
      callback(...params);
    }, delay);

    return this._timerId;
  }

  /**
   * clearInterval
   * @param  {Number} timerId
   * @return {void}
   */
  clearInterval(timerId) {
    if (this._timers[timerId] instanceof Interval) {
      this._timers[timerId].clear();
      delete this._timers[timerId];
    }
  }

  /**
   * ticking
   * @param  {Number} tick
   * @return {void}
   */
  tick(tick = 1) {
    tick = Math.max(1, +tick|0);

    while (tick > 0) {
      let remain = this._timers.map(util.remain).reduce(util.minValue, tick);

      this.emit("tick", remain);
      this._timers.forEach((timer) => {
        timer.tick(remain);
      });
      this.emit("ticked", remain);
      tick -= remain;
    }
  }
}
