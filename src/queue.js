
const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap;
	}

	push(data, priority) {		
		if (this.heap.memory.length-1 === this.maxSize) {
			throw new Error;		
		}
		this.heap.push(data, priority);
		
	}

	shift() {
		if (this.heap.memory.length >= 2) {
			this.heap.pop()
			//this.heap.memory.length-1;
			//console.log(this.heap.empty);
			//this.heap.empty--;
		} else {
			throw new Error;
		}
		
	}

	size() {
		return this.heap.empty;
	}

	isEmpty() {
		//console.log(this.heap.memory)
		//console.log(this.heap.empty);
		if (this.heap.empty === 0) {
			return true;
		} else {
			return false;
		}
		
	}
}

module.exports = PriorityQueue;
