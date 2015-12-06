import { EventEmitter } from "events";
import Timeout from "./Timeout";
import Interval from "./Interval";

function collectIndex(list, Klass) {
  let result = [];

  list.forEach((object, index) => {
    if (object instanceof Klass) {
      result.push(index);
    }
  });

  return result;
}

let timerAPI = new EventEmitter();

let _timerId = 0;
let _timers = [];

Object.defineProperties(timerAPI, {
  timers: {
    get: () => collectIndex(_timers, Object),
  },
  intervals: {
    get: () => collectIndex(_timers, Interval),
  },
  timeouts: {
    get: () => collectIndex(_timers, Timeout),
  },
});

timerAPI.setTimeout = (callback, delay, ...params) => {
  let timer = new Timeout();

  _timerId += 1;
  _timers[_timerId] = timer;

  let timerId = _timerId;

  timer.set(() => {
    callback(...params);
    timerAPI.clearTimeout(timerId);
  }, delay);

  return _timerId;
};

timerAPI.clearTimeout = (timerId) => {
  if (_timers[timerId] instanceof Timeout) {
    _timers[timerId].clear();
    delete _timers[timerId];
  }
};

timerAPI.setInterval = (callback, delay, ...params) => {
  let timer = new Interval();

  _timerId += 1;
  _timers[_timerId] = timer;

  timer.set(() => {
    callback(...params);
  }, delay);

  return _timerId;
};

timerAPI.clearInterval = (timerId) => {
  if (_timers[timerId] instanceof Interval) {
    _timers[timerId].clear();
    delete _timers[timerId];
  }
};

timerAPI.tick = (tick = 1) => {
  tick = Math.max(1, +tick|0);

  while (tick > 0) {
    let remain = _timers.map(timer => timer.remain).reduce((a, b) => {
      return a < b ? a : b;
    }, tick);

    timerAPI.emit("tick", remain);
    _timers.forEach((timer) => {
      timer.tick(remain);
    });
    timerAPI.emit("ticked", remain);
    tick -= remain;
  }
};

timerAPI.clearAllTimers = () => {
  _timers.splice(0).forEach((timer) => {
    timer.clear();
  });
};

export default timerAPI;
