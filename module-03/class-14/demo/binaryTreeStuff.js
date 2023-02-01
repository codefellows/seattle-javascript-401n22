"use strict";

// specifically a node that has a .left .right
class btNode {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root) {
    this.root = root;
  }

  // pre-order
  // root left right (left first is the way)
  preOrder() {
    let traversal = [];
    traversal.push(this.value); // root?

    if (this.left) {
      let leftTraversal = this.left.preOrder();
      traversal = traversal.concat(leftTraversal);
    }

    if (this.right) {
      let rightTraversal = this.right.preOrder();
      traversal = traversal.concat(rightTraversal);
    }

    return traversal;
  }

  // post-order

  // in-order
}

class BSTNode extends Node {
  add(number) {
    if (number === this.value) {
      // put it in the garbage
      return;
    } else if (number > this.value) {
      // check right
      if (!this.right) {
        this.right = new BSTNode(number);
      } else {
        this.right.add(number);
      }
    } else if (number < this.value) {
      if (!this.left) {
        this.left = new BSTNode(number);
      } else {
        this.left.add(number);
      }
    }
  }
  // both have 2 children, BST has to have numeric values stored lower left and higher right
  // add and contains
  // no replication of values
  contains(number) {
    if (number === this.value) {
      return true;
    } else if (number > this.value) {
      if (this.right) {
        this.right.contains(number);
      } else {
        return false;
      }
    } else if (number < this.value) {
      if (this.left) {
        this.left.contains(number);
      }
      return false;
    }
  }
}
