"use strict";

const Queue = require("./queue");

describe("Queues", () => {
  test("sucessfully dequeues out of a queue the expected value", () => {
    let queue = new Queue();
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");
    let value = queue.dequeue();

    expect(value).toEqual("1");
    expect(queue.peek()).toEqual("2");
  });

  test("successfully peeks into a queue, seeing the expected value", () => {
    let queue = new Queue();

    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");
    let value = queue.peek();
    expect(value).toEqual("1");
  });

  test("successfully empties a queue after multiple dequeues", () => {
    let queue = new Queue();

    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    expect(queue.peek()).toEqual(null);
  });

  test("successfully instantiates an empty queue", () => {
    let queue = new Queue();
    expect(queue.peek()).toEqual(null);
  });

  test("calling dequeue or peek on empty queue raises exception", () => {
    let queue = new Queue();
    expect(() => {
      queue.dequeue();
    }).toThrow("Queue is Empty");
  });
});
