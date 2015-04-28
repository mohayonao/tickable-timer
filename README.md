# tickable-timer
[![Build Status](http://img.shields.io/travis/mohayonao/tickable-timer.svg?style=flat-square)](https://travis-ci.org/mohayonao/tickable-timer)
[![NPM Version](http://img.shields.io/npm/v/tickable-timer.svg?style=flat-square)](https://www.npmjs.org/package/tickable-timer)
[![Bower](https://img.shields.io/bower/v/tickable-timer.svg?style=flat-square)](https://github.com/mohayonao/tickable-timer)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> Manual ticking timer API for test CI

## Features
- Compatible with the native timer API
- Provides hook events before/after ticking

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

### Properties
- `timers: number[]`
- `intervals: number[]`
- `timeouts: number[]`

### Methods
_Inherits methods from [EventEmitter](https://nodejs.org/api/events.html)._
- `setTimeout(callback: function, delay: number): number`
- `clearTimeout(timerId: number): void`
- `setInterval(callback: function, delay: number): number`
- `clearInterval(timerId: number): void`
- `tick(tick: number = 1): void`

### Events
- `tick`
  - `tick: number` The ticking interval
- `ticked`
  - `tick: number` The ticking interval

## Example

```javascript
import tickable from "tickable-timer";

tickable.setTimeout(() => {
  console.log("fired: timer1");
}, 1000);

tickable.setInterval(() => {
  console.log("fired: timer2");
}, 500);

tickable.setTimeout(() => {
  // never called
  console.log("fired: timer3");
}, 3000);

tickable.setInterval(() => {
  // never called
  console.log("fired: timer4");
}, 3000);

tickable.setTimeout(() => {
  console.log("clear: all timers");
  tickable.timeouts.forEach(tickable.clearTimeout);
  tickable.intervals.forEach(tickable.clearInterval);
  console.log("timers:", tickable.timers);
}, 2500);

tickable.on("tick", (tick) => {
  console.log(`tick: ${tick}`);
});
tickable.on("ticked", (tick) => {
  console.log(`ticked: ${tick}\n`);
});

tickable.tick(5000);
```

output:

```
tick: 500
fired: timer2
ticked: 500

tick: 500
fired: timer1
fired: timer2
ticked: 500

tick: 500
fired: timer2
ticked: 500

tick: 500
fired: timer2
ticked: 500

tick: 500
fired: timer2
clear: all timers
timers: []
ticked: 500

tick: 2500
ticked: 2500
```

## License

MIT
