
const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.memory = [];
		this.size = this.memory.length - 1;	
	}

	push(data, priority) {
		let node = new Node(data, priority);		
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root) {
			return this.root.data;
		} else {
			return
		}
	}

	detachRoot() {
		this.root = null;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.memory.length-1;
	}

	isEmpty() {			
		return (this.size+1) ? true : false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.empty = 0;
		this.memory = [];
	}

	insertNode(node) {
		if (!this.isEmpty()) {				
			this.root = node;
			this.memory.push(null);
			this.memory.push(this.root);
			this.size = this.memory.length - 1;						
		} else {				
			this.memory.push(node);
			this.parentNodes.push(node);
			this.size = this.memory.length - 1;
			let index = this.memory.indexOf(node);
			let parent = this.memory[Math.floor((index)/2)];
			parent.appendChild(node);			
		}
		//console.log(this.parentNodes[1]);
	}

	shiftNodeUp(node) {
		/*
		while (node.parent != null || node.parent.data > node.data) {
			node.swapWithParent();
		};
		*/
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
