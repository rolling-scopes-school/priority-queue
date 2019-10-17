
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
		//let flag = false;
		if (this.empty === 0) {				
			this.root = node;
			this.memory.push(null);
			this.memory.push(this.root);
			this.parentNodes.push(node);
			//this.size = this.memory.length - 1;
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
		/*
		console.log('==================')
		console.log(this.parentNodes[0])
		console.log('==================')
		console.log(this.parentNodes[2])
		console.log('==================')
		*/
	}

	shiftNodeUp(node) {
		/*
		if (node.parent.data) {
			while (node.data > node.parent.data) {
				node.swapWithParent();
			}
		}
		*/
		//console.log(node.parent)
		
		
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
