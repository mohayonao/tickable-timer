/**
 * The manual ticking `setTimeout` / `clearTimeout`
 * @class
 * @property {Function} callback
 * @property {Number}   delay
 * @property {Number}   remain
 */
export default class Timeout {
  constructor() {
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
  set(callback, delay) {
    this.callback = callback;
    this.delay = Math.max(1, +delay|0);
    this.remain = this.delay;
  }

  /**
   * clearTimeout
   * @return {void}
   */
  clear() {
    this.callback = null;
    this.delay = Infinity;
    this.remain = Infinity;
  }

  /**
   * ticking
   * @param  {Number} tick
   * @return {void}
   */
  tick(tick) {
    if (typeof this.callback === "function") {
      tick = Math.max(1, +tick|0);
      this.remain -= tick;
      if (this.remain <= 0) {
        this.callback();
        this.callback = null;
        this.delay = Infinity;
        this.remain = Infinity;
      }
    }
  }
}
