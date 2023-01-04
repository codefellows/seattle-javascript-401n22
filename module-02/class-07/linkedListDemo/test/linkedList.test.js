"use strict";
const { LinkedList } = require("../linkedList.js");

describe("linked list testing", () => {
  test("tests append: add a node to the end of the list", () => {
    let appendLinkedList = new LinkedList();
    appendLinkedList.head = {
      value: 1,
      next: { value: 2, next: { value: 3, next: null } },
    };
    let newList = appendLinkedList.append(4);
    console.log(newList);
    expect(newList).toEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    });
  });
  test("tests insertBefore: adds a node with a given new value immediately before the first node with the given value", () => {
    // when given a value we will return a linked list with the the new node with the specified value before the node with the value
    let insertBeforeLinkedList = new LinkedList();
    insertBeforeLinkedList.head = {
      value: 1,
      next: { value: 3, next: { value: 4, next: null } },
    };
    let newList = insertBeforeLinkedList.insertBefore(3, 2);
    expect(newList).toEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    });
  });
  test("tests insertAfter: adds a node with a given new value immediately after the first node with the given value", () => {
    // when given a value we will return a linked list with the the new node with the specified value after the node with the value
    let insertAfterLinkedList = new LinkedList();
    insertAfterLinkedList.head = {
      value: 1,
      next: { value: 2, next: { value: 4, next: null } },
    };
    let newList = insertAfterLinkedList.insertAfter(2, 3);
    expect(newList).toEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    });
  });
  test("It returns the value of the node kth from the end of the list", () => {
    let llKth = new LinkedList();
    llKth.head = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    };
    expect(llKth.kthFromEnd(1)).toBe(3);
  });
  test("If given a k longer than the length of the list returns undefined", () => {
    let llKthBad = new LinkedList();
    llKthBad.head = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null,
          },
        },
      },
    };
    expect(llKthBad.kthFromEnd(10)).toBe(undefined);
  });
});
