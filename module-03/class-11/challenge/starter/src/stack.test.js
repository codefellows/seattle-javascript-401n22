"use strict";

const Stack = require("./stack");

describe("Stack", () => {
  test("sucessfully pops", () => {
    let stack = new Stack();
    stack.push("1");
    stack.push("2");
    stack.push("3");
    let value = stack.pop();

    expect(value).toEqual("3");
    expect(stack.peek()).toEqual("2");
  });

  test("successfully peeks into a stack", () => {
    let stack = new Stack();

    stack.push("1");
    stack.push("2");
    stack.push("3");
    let value = stack.peek();
    expect(value).toEqual("3");
  });

  test("Should successfully empty a stack after multiple pops", () => {
    let stack = new Stack();

    stack.push("1");
    stack.push("2");
    stack.push("3");
    stack.pop();
    stack.pop();
    stack.pop();
    expect(stack.peek()).toEqual(null);
  });

  test("successfully instantiates an empty stack", () => {
    let stack = new Stack();
    expect(stack.peek()).toEqual(null);
  });

  test("Calling pop or peek on empty stack raises exception", () => {
    let stack = new Stack();
    expect(() => {
      stack.pop();
    }).toThrow("Stack is empty");
  });
});
