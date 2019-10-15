class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;		
		this.left = null;
		this.right = null;
	}

	appendChild(node) {	
		if (this.left && this.right) {
			return
		}	
		this.left !== null ? this.right = node : this.left = node;
		
	}

	removeChild(node) {

	}

	remove() {

	}

	swapWithParent() {
		
	}
}

module.exports = Node;
