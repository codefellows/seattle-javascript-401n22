class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.head === null;
  }

  insert(value) {
    this.head = {
      value,
      next: this.head,
    };
    if (!this.tail) {
      this.tail = this.head;
    }
    this.size += 1;
  }

  append(item) {
    if (!this.tail) {
      this.insert(item);
    } else {
      this.tail = this.tail.next = { item };
      this.size += 1;
    }
  }

  toString() {
    let str = "";

    let tracker = this.head;
    while (tracker !== undefined) {
      // Add this node to the string
      const strItem = display(tracker.item);
      str += `{ ${strItem} } -> `;
      tracker = tracker.next;
    }

    str += "NULL";

    return str;
  }
}

module.exports = LinkedList;
