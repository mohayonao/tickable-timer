# tickable-timer
[![Build Status](http://img.shields.io/travis/mohayonao/tickable-timer.svg?style=flat-square)](https://travis-ci.org/mohayonao/tickable-timer)
[![NPM Version](http://img.shields.io/npm/v/tickable-timer.svg?style=flat-square)](https://www.npmjs.org/package/tickable-timer)
[![Bower](https://img.shields.io/bower/v/tickable-timer.svg?style=flat-square)](https://github.com/mohayonao/tickable-timer)
[![6to5](http://img.shields.io/badge/module-6to5-brightgreen.svg?style=flat-square)](https://6to5.org/)

> Manual ticking timer API

## Installation

npm:

```
npm install tickable-timer
```

bower:

```
bower install tickable-timer
```

downloads:

  - [tickable-timer.js](https://raw.githubusercontent.com/mohayonao/tickable-timer/master/build/tickable-timer.js)
  - [tickable-timer.min.js](https://raw.githubusercontent.com/mohayonao/tickable-timer/master/build/tickable-timer.min.js)

## API

- `setTimeout(callback: function, delay: number): number`
- `clearTimeout(timerId: number): void`
- `setInterval(callback: function, delay: number): number`
- `clearInterval(timerId: number): void`
- `tick(tick: number = 1): void`

## Example

```javascript
import tickable from "tickable-timer";

var timer1 = tickable.setTimeout(()=> {
  console.log("timer1 fired");
}, 1000);

var timer2 = tickable.setInterval(()=> {
  console.log("timer2 fired");
}, 500);

var timer3 = tickable.setTimeout(()=> {
  // never called
  console.log("timer3 fired");
}, 3000);

var timer4 = tickable.setInterval(()=> {
  // never called
  console.log("timer4 fired");
}, 3000);

tickable.setTimeout(()=> {
  console.log("clear all timers");
  tickable.clearTimeout(timer1);
  tickable.clearInterval(timer2);
  tickable.clearTimeout(timer3);
  tickable.clearInterval(timer4);
}, 2500);

tickable.tick(5000);
```

## License

MIT
