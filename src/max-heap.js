const Node = require('./node');

class MaxHeap {
	constructor() {	
		this.memory = [null];	
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority);		
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		let result;
		let scenary = () => {			
			let poped = this.memory.pop();			
			result = poped.data;
			//console.log(result)
			//console.log('==============')
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return result;
		}
		this.memory.length > 1 ? result = scenary() : '';	
		return result;
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	getMemS() {
		return this.memory.length;
	}
	size() {
		//console.log(this.getMemS()-1)
		//console.log('==============')
		//let l = this.memory.length;
		//let res = l - 1;
		//console.log(res)
		//return res; 
		return this.getMemS()-1;
	}

	isEmpty() {
		let res;
		this.getMemS() === 1 ? res = true : res = false;
		return res;
	}

	clear() {
		this.memory = [null];	
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {			
		if (this.root) {			
			this.memory.push(node);
			this.parentNodes.push(node);			
			let index = this.memory.length-1;
			let parentIndex = Math.floor(index/2);
			this.memory[index].parent = this.memory[parentIndex];
			this.memory[parentIndex].left === null ? this.memory[parentIndex].left = node.selfRef : this.memory[parentIndex].right = node.selfRef;
	
		} else {
			this.memory.push(node);
			this.root = this.memory[1];
			this.parentNodes.push(node);
			//this.parentNodes = node;
		}
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
