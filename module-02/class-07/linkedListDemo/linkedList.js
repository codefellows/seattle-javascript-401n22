"use strict";

// this is our node class, any new Node we make will have this structure
// singly linked list: always points or has reference to the next node in the chain
// doubley linked list: points to prev and next
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
    // this.prev
  }
}

// this is our linked list class
class LinkedList {
  constructor() {
    this.head = null;
  }
  // size is definitely a property you could add to any data structure
  // always the head is the very first node of the list
  insert(value) {
    // add a new node to the head of the list with the value argument
    // if this.head === null if it's empty
    // if (this.head === null) this.head = new Node(value)
    if (this.head === null) {
      let newNode = new Node(value);
      this.head = newNode;
    } else {
      // let leash = new Node(value, this.head);
      let leash = new Node(value);
      leash.next = this.head;
      this.head = leash;
    }
    // if there is something in the head position?? we gotta do the switcharoo
    // attach a leash to the new node, make the next the current head
    // make the new node the new head
  }
  includes(value) {
    // takes a value, iterates through the list and returns true if it finds a node with a matching value
    // returns false if not
    // write a while loop that stops when current is null
    if (!this.head) return false;
    // early exit strategy
    let current = this.head;
    while (current !== null) {
      // do something to check value
      if (value === current.value) return true;
      current = current.next;
    }
    return false;
  }

  toString() {
    // "{ a } -> { b } -> { c } -> NULL"
    // while loop that adds/prints each value until we hit null
    let string = "";
    let current = this.head;
    while (current !== null) {
      // iterate through linked list pulling out the values
      // do something
      string = `{ ${current.value} } -> `;
      // go on to the next
      current = current.next;
    }
    // I am out of the loop! No more nodes!
    string += "NULL";
    return string;
  }

  insertBefore(value, newValue) {
    let newNode = new Node(newValue);
    // first we should check the head to see if it is our value
    if (this.head.value === value) {
      newNode.next = this.head;
      this.head = newNode;
      return this.head;
    } else {
      let current = this.head;
      while (current.next) {
        if (current.next.value === value) {
          newNode.next = current.next;
          current.next = newNode;
          return this.head;
        } else {
          current = current.next;
        }
      }
      return this.head;
    }
    // return the list here:::

    // find the value in the linked list
    // if current.value === value
  }

  append(value) {
    // it will add a new node with the value to the end
    // check if we have a valid head node
    // if no head now value is new head
    if (!this.head) {
      this.head = new Node(value);
      return this.head;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(value);
      return this.head;
    }
  }

  insertAfter(value, newValue) {
    let newNode = new Node(newValue);

    let current = this.head;
    while (current) {
      if (current.value === value) {
        newNode.next = current.next;
        current.next = newNode;
        return this.head;
      } else {
        current = current.next;
      }
    }
    return this.head;
  }

  kthFromEnd(k) {
    let counter = 0;
    let current = this.head;

    while (current) {
      counter++;
      current = current.next;
    }

    let target = counter - (k + 1);
    if (target < 0) return undefined;

    // start at head with 0 and go to two, when at two return the value
    counter = 0;
    current = this.head;

    while (counter <= target) {
      if (counter === target) return current.value;
      counter += 1;
      current = current.next;
    }
  }
}

module.exports = { LinkedList };
