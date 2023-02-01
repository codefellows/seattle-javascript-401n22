"use strict";

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  // Root Left Right
  // time - O(n)
  // space - O(h)
  preOrder() {
    let result = [];

    let _walk = (node) => {
      // process the node in some way
      result.push(node.value);

      // check the left side
      if (node.left) _walk(node.left);

      // check the right side
      if (node.right) _walk(node.right);
      return;
    };

    _walk(this.root);
    return result;
  }

  // Left Right Root

  postOrder() {
    let result = [];

    let _walk = (node) => {
      // check the left side
      if (node.left) _walk(node.left);

      // check the right side
      if (node.right) _walk(node.right);

      // process the node in some way
      result.push(node.value);

      return;
    };

    _walk(this.root);
    return result;
  }

  // Left Root Right
  inOrder() {
    let result = [];

    let _walk = (node) => {
      // check the left side
      if (node.left) _walk(node.left);

      // process the node in some way
      result.push(node.value);

      // check the right side
      if (node.right) _walk(node.right);

      return;
    };

    _walk(this.root);
    return result;
  }
}

class BST extends BinaryTree {
  constructor(root) {
    super(root);
  }

  add(number) {
    let newNode = new Node(number);
    if (!this.root) {
      this.root = newNode;
    } else {
      //traverse bst - currentNode, newNode
      _walk(this.root, newNode);
    }

    function _walk(current, newNode) {
      if (newNode.value < current.value) {
        // if we have a left check that node value
        if (current.left) _walk(current.left, newNode);
        // if not put the node there
        else current.left = newNode;
      }
      if (newNode.value > current.value) {
        // if we have a right check the right
        if (current.right) _walk(current.right, newNode);
        // if not the new node is our new right node
        else current.right = newNode;
      }
      return;
    }
  }
  // both have 2 children, BST has to have numeric values stored lower left and higher right
  // add and contains
  // no replication of values
  contains(number) {
    if (!this.root) return false;
    return _walk(this.root, number);

    function _walk(current, number) {
      if (number === current.value) return true;
      else if (number > current.value) {
        if (current.right) {
          return _walk(current.right, number);
        } else {
          return false;
        }
      } else if (number < current.value) {
        if (current.left) {
          return _walk(current.left, number);
        }
        return false;
      }
    }
  }
}
