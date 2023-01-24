const chance = require("chance")();

const EVENT_NAMES = {
  pickup: "pickup",
  delivered: "delivered",
  driverReady: "driver ready",
};

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.unshift(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = { chance, EVENT_NAMES, Queue };
