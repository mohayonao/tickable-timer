import assert from "power-assert";
import sinon from "sinon";
import tickable from "../src/";

describe("tickable", function() {
  describe("works", () => {
    before(() => {
      let push = (value) => {
        this.passed.push(value);
      };

      this.timerId1 = tickable.setInterval(push, 100, "A");
      this.timerId2 = tickable.setInterval(push, 125, "B");
      this.timerId3 = tickable.setInterval(push, 250, "C");
      this.timerId4 = tickable.setTimeout(push, 250, "D");
      this.timerId5 = tickable.setTimeout(push, 750, "E");
      this.timerId6 = tickable.setTimeout(push, 1000, "F");

      tickable.on("tick", (value) => {
        this.emitted.push(value);
      });
    });

    beforeEach(() => {
      this.passed = [];
      this.emitted = [];
    });

    it("validate", () => {
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
    it("00:00.000 -> 00:00.500", () => {
      tickable.tick(500);

      assert.deepEqual(this.passed, [
        // 00:00.100
        "A",
        // 00:00.125
        "B",
        // 00:00.200
        "A",
        // 00:00.250
        "B", "C", "D",
        // 00:00.300
        "A",
        // 00:00.375
        "B",
        // 00:00.400
        "A",
        // 00:00.500
        "A", "B", "C",
      ], "00:00.500");

      assert.deepEqual(this.emitted, [
        100, 25, 75, 50, 50, 75, 25, 100,
      ], "00:00.500");
    });
    it("clear(2, 5)", () => {
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
    it("00:00.500 -> 00:01.000", () => {
      tickable.tick(500);

      assert.deepEqual(this.passed, [
        // 00:00.600
        "A",
        // 00:00.700
        "A",
        // 00:00.750
        "C",
        // 00:00.800
        "A",
        // 00:00.900
        "A",
        // 00:01.000
        "A", "C", "F",
      ], "00:01.000");

      assert.deepEqual(this.emitted, [
        100, 100, 50, 50, 100, 100,
      ], "00:01.000");
    });
    it("clear(1, 3, 6)", () => {
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
    it("00:01.000 -> 00:01.500", () => {
      tickable.tick(500);

      assert.deepEqual(this.passed, [
      ], "00:01.500");

      assert.deepEqual(this.emitted, [
        500,
      ], "00:01.500");
    });
  });
  describe("clearAllTimers(): void", () => {
    it("works", () => {
      let spy1 = sinon.spy();
      let spy2 = sinon.spy();

      tickable.setInterval(spy1, 100);
      tickable.setTimeout(spy2, 250);

      assert(tickable.timers.length === 2);

      tickable.clearAllTimers();
      assert(tickable.timers.length === 0);

      tickable.tick(1000);

      assert(spy1.callCount === 0);
      assert(spy2.callCount === 0);
    });
  });
});
