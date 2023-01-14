const LinkedList = require("./linked-list");

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  push(value) {
    this.list.insert(value);
  }

  peek() {
    if (!this.list.head) {
      return null;
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

  isEmpty() {
    return this.list.isEmpty();
  }
}

module.exports = Stack;
