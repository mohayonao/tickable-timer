# tickable-timer
[![NPM Version](http://img.shields.io/npm/v/tickable-timer.svg?style=flat)](https://www.npmjs.org/package/tickable-timer)

Manual ticking `setTimeout` / `setInterval`.

## Installation

npm:

```
npm install tickable-timer
```

bower:

```
bower install tickable-timer
```

## API

- `setTimeout(callback: function, timeout: number): number`
- `clearTimeout(timerId: number): void`
- `setInterval(callback: function, interval: number): number`
- `clearInterval(timerId: number): void`
- `tick(tick: number): void`

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
  // never called.
  console.log("timer3 fired");
}, 3000);

var timer4 = tickable.setInterval(()=> {
  // never called.
  console.log("timer4 fired");
}, 3000);

tickable.setTimeout(()=> {
  console.log("clear all timers");
  tickable.clearTimeout(timer1);
  tickable.clearInterval(timer2);
  tickable.clearTimeout(timer3);
  tickable.clearInterval(timer4);
}, 2500);

for (var t = 0; t <= 5000; t += 250) {
  console.log("-> " + t);
  tickable.tick(250);
}
```

## License

MIT
