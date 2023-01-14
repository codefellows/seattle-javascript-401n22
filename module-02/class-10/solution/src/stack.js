const LinkedList = require("./linked-list");

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  push(value) {
    this.list.insert(value);
  }

  peek() {
    if (!this.list.head) {
      throw new Error("Stack is empty");
    }
    return this.list.head.value;
  }

  pop() {
    if (!this.list.head) {
      throw new Error("Stack is empty");
    }
    let value = this.list.head.value;

    this.list.head = this.list.head.next;
    if (!this.list.head) {
      this.list.tail = this.list.head;
    }

    return value;
  }
}

module.exports = Stack;
