"use strict";

import assert from "power-assert";
import tickable from "../src/";

describe("tickable", function() {

  before(function() {
    let push = (value) => {
      return () => {
        this.passed.push(value);
      };
    };

    this.timerId1 = tickable.setInterval(push("A"), 100);
    this.timerId2 = tickable.setInterval(push("B"), 125);
    this.timerId3 = tickable.setInterval(push("C"), 250);
    this.timerId4 = tickable.setTimeout(push("D"), 250);
    this.timerId5 = tickable.setTimeout(push("E"), 750);
    this.timerId6 = tickable.setTimeout(push("F"), 1000);

    tickable.on("tick", (value) => {
      this.emitted.push(value);
    });
  });

  beforeEach(function() {
    this.passed = [];
    this.emitted = [];
  });

  it("validate", function() {
    assert(typeof this.timerId1 === "number");
    assert(typeof this.timerId2 === "number");
    assert(typeof this.timerId3 === "number");
    assert(typeof this.timerId4 === "number");
    assert(typeof this.timerId5 === "number");
    assert(typeof this.timerId6 === "number");
    assert(this.timerId1 !== this.timerId2);
    assert(this.timerId1 !== this.timerId3);
    assert(this.timerId1 !== this.timerId4);
    assert(this.timerId1 !== this.timerId5);
    assert(this.timerId1 !== this.timerId6);
    assert(this.timerId2 !== this.timerId3);
    assert(this.timerId2 !== this.timerId4);
    assert(this.timerId2 !== this.timerId5);
    assert(this.timerId2 !== this.timerId6);
    assert(this.timerId3 !== this.timerId4);
    assert(this.timerId3 !== this.timerId5);
    assert(this.timerId3 !== this.timerId6);
    assert(this.timerId4 !== this.timerId5);
    assert(this.timerId4 !== this.timerId6);
    assert(this.timerId5 !== this.timerId6);

    assert.deepEqual(tickable.timers, [
      1, 2, 3, 4, 5, 6,
    ]);

    assert.deepEqual(tickable.intervals, [
      1, 2, 3,
    ]);

    assert.deepEqual(tickable.timeouts, [
      4, 5, 6,
    ]);
  });
  it("00:00.000 -> 00:00.500", function() {
    tickable.tick(500);

    assert.deepEqual(this.passed, [
      "A",           // 00:00.100
      "B",           // 00:00.125
      "A",           // 00:00.200
      "B", "C", "D", // 00:00.250
      "A",           // 00:00.300
      "B",           // 00:00.375
      "A",           // 00:00.400
      "A", "B", "C", // 00:00.500
    ], "00:00.500");

    assert.deepEqual(this.emitted, [
      100, 25, 75, 50, 50, 75, 25, 100,
    ], "00:00.500");
  });
  it("clear(2,5)", function() {
    tickable.clearInterval(this.timerId2);
    tickable.clearTimeout(this.timerId3);
    tickable.clearTimeout(this.timerId5);
    tickable.clearInterval(this.timerId6);

    assert.deepEqual(tickable.intervals, [
      1, 3,
    ]);

    assert.deepEqual(tickable.timeouts, [
      6,
    ]);

    assert.deepEqual(tickable.timers, [
      1, 3, 6,
    ]);
  });
  it("00:00.500 -> 00:01.000", function() {
    tickable.tick(500);

    assert.deepEqual(this.passed, [
      "A",           // 00:00.600
      "A",           // 00:00.700
      "C",           // 00:00.750
      "A",           // 00:00.800
      "A",           // 00:00.900
      "A", "C", "F", // 00:01.000
    ], "00:01.000");

    assert.deepEqual(this.emitted, [
      100, 100, 50, 50, 100, 100,
    ], "00:01.000");
  });
  it("clear(1,3,6)", function() {
    tickable.clearInterval(this.timerId1);
    tickable.clearInterval(this.timerId3);
    tickable.clearTimeout(this.timerId4);
    tickable.clearTimeout(this.timerId6);

    assert.deepEqual(tickable.intervals, [
    ]);

    assert.deepEqual(tickable.timeouts, [
    ]);

    assert.deepEqual(tickable.timers, [
    ]);
  });
  it("00:01.000 -> 00:01.500", function() {
    tickable.tick(500);

    assert.deepEqual(this.passed, [
    ], "00:01.500");

    assert.deepEqual(this.emitted, [
      500,
    ], "00:01.500");
  });
});
