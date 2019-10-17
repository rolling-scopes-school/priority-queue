
const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.memory = [];
		this.size = this.memory.length - 1;	
		this.empty = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);		
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root) {
			this.detachRoot();						
			this.restoreRootFromLastInsertedNode(this.detachRoot());
			this.shiftNodeDown(this.root);
			return this.root.data;
		} else {
			return
		}
	}

	detachRoot() {
		let res = this.root;
		this.root = null;
		return res;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.empty;
	}

	isEmpty() {			
		return (this.empty) ? false : true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.empty = 0;
		this.memory = [];
	}

	insertNode(node) {
		
		if (this.empty === 0) {				
			this.root = node;
			this.memory.push(null);
			this.memory.push(this.root);
			this.parentNodes.push(node);			
			this.empty++;										
		} else {						
			if (this.empty === 2) {
				this.parentNodes.shift()
			}	
			this.memory.push(node);
			this.parentNodes.push(node);			
			this.empty++;
			let index = this.memory.indexOf(node);
			let parent = this.memory[Math.floor((index)/2)];
			parent.appendChild(node);			
		}
		
	}

	shiftNodeUp(node) {
		
		
		
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
