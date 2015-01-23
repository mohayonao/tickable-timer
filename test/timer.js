"use strict";

import support from "source-map-support";
support.install();

import assert from "power-assert";
import tickable from "../lib/tickable-timer";

describe("tickable-timer", ()=> {
  it("works", ()=> {
    var passed;
    var timerId1 = tickable.setInterval(()=> { passed.push("A") }, 100);
    var timerId2 = tickable.setInterval(()=> { passed.push("B") }, 125);
    var timerId3 = tickable.setInterval(()=> { passed.push("C") }, 250);
    var timerId4 = tickable.setTimeout(()=> { passed.push("D") }, 250);
    var timerId5 = tickable.setTimeout(()=> { passed.push("E") }, 750);
    var timerId6 = tickable.setTimeout(()=> { passed.push("F") }, 1000);

    assert(typeof timerId1 === "number");
    assert(typeof timerId4 === "number");
    assert(timerId1 !== timerId2);
    assert(timerId1 !== timerId3);
    assert(timerId1 !== timerId4);
    assert(timerId1 !== timerId5);
    assert(timerId1 !== timerId6);
    assert(timerId2 !== timerId3);
    assert(timerId2 !== timerId4);
    assert(timerId2 !== timerId5);
    assert(timerId2 !== timerId6);
    assert(timerId3 !== timerId4);
    assert(timerId3 !== timerId5);
    assert(timerId3 !== timerId6);
    assert(timerId4 !== timerId5);
    assert(timerId4 !== timerId6);
    assert(timerId5 !== timerId6);

    // 00:00.000 -> 00:00.500
    passed = [];
    tickable.tick(500);

    assert.deepEqual(passed, [
      "A",           // 00:00.100
      "B",           // 00:00.125
      "A",           // 00:00.200
      "B", "C", "D", // 00:00.250
      "A",           // 00:00.300
      "B",           // 00:00.375
      "A",           // 00:00.400
      "A", "B", "C", // 00:00.500
    ], "00:00.500");

    // 00:00.500 -> 00:01.000
    tickable.clearInterval(timerId2);
    tickable.clearTimeout(timerId3);
    tickable.clearTimeout(timerId5);
    tickable.clearInterval(timerId6);

    passed = [];
    tickable.tick(500);

    assert.deepEqual(passed, [
      "A",           // 00:00.600
      "A",           // 00:00.700
      "C",           // 00:00.750
      "A",           // 00:00.800
      "A",           // 00:00.900
      "A", "C", "F", // 00:01.000
    ], "00:01.000");

    tickable.clearInterval(timerId1);
    tickable.clearInterval(timerId3);
    tickable.clearTimeout(timerId4);
    tickable.clearTimeout(timerId6);
  });
});
