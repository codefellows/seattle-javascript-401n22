const Stack = require("./stack");
class Queue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }

  isEmpty() {
    return this.inbox.isEmpty() && this.outbox.isEmpty();
  }

  enqueue(value) {
    // 1. Push to inbox
    this.inbox.push(value);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    // 2. Peek outbox; if not null, pop.
    if (this.outbox.isEmpty()) {
      this.flip();
    }
    return this.outbox.pop();
  }

  peek() {
    // 2. Peek outbox; if not null, pop.
    if (this.outbox.isEmpty()) {
      this.flip();
    }
    return this.outbox.peek();
  }

  flip() {
    // 2a. If it is null, reverse inbox to outbox
    // repeat ???
    // while (this.inbox.length > 0) { // These are the "same" condition
    while (!this.inbox.isEmpty()) {
      // move one item from inbox to outbox
      const move = this.inbox.pop();
      this.outbox.push(move);
    }
  }
}

module.exports = Queue;
