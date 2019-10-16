const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}
	throwError(error) {
		throw new Error(error)
	}

	push(data, priority) {
		this.maxSize === this.heap.length ? this.throwError('Sorry, maxHeap violation') : this.heap.push(data, priority);
	}

	shift() {	
		return this.heap.pop();
	}

	size() {
		return this.heap.length;
	}

	isEmpty() {
		let res;
		//this.heap.memory.length >= 1
		this.heap.memory.length < 2 ? res = true : res = false;
		return res;
	}
}

module.exports = PriorityQueue;
