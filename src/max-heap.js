
const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.empty = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);		
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
		return this.empty ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.empty = 0;
	}

	insertNode(node) {
		if (!this.isEmpty()) {
			//this.parentNodes.push(null);
			this.root = node;
		} else {
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
