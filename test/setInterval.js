"use strict";

import support from "source-map-support";
support.install();

import assert from "power-assert";
import {setInterval, clearInterval, tick} from "../lib/tickable-timer";

describe("setInterval", ()=> {
  it("works", ()=> {
    var fired = 0;
    var timerId1 = setInterval(() => { fired += 1 }, 1000);
    var timerId2 = setInterval(() => { fired += 1 }, 2000);

    assert(timerId1 !== timerId2);

    // 00:00.000 -> 00:01.000
    tick(250);
    assert(fired === 0);

    tick(250);
    assert(fired === 0);

    tick(250);
    assert(fired === 0);

    tick(250);
    assert(fired === 1);

    // 00:01.000 -> 00:02.000
    tick(250);
    assert(fired === 1);

    tick(250);
    assert(fired === 1);

    tick(250);
    assert(fired === 1);

    tick(250);
    assert(fired === 3);

    // clearInterval
    clearInterval(timerId1);

    // 00:02.000 -> 00:03.000
    tick(250);
    assert(fired === 3);

    tick(250);
    assert(fired === 3);

    tick(250);
    assert(fired === 3);

    tick(250);
    assert(fired === 3);

    // 00:03.000 -> 00:04.000
    tick(250);
    assert(fired === 3);

    tick(250);
    assert(fired === 3);

    tick(250);
    assert(fired === 3);

    tick(250);
    assert(fired === 4);

    // clearInterval
    clearInterval(timerId2);
  });
});
