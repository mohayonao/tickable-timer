"use strict";

import support from "source-map-support";
support.install();

import assert from "power-assert";
import {setTimeout, clearTimeout, tick} from "../lib/tickable-timer";

describe("setTimeout", ()=> {
  it("works", ()=> {
    var fired = 0;
    var timerId1 = setTimeout(() => { fired += 1 }, 1000);
    var timerId2 = setTimeout(() => { fired += 1 }, 2000);

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
    assert(fired === 2);

    // clearTimeout
    clearTimeout(timerId1);
    clearTimeout(timerId2);
  });
});
