
class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
		this.self = this;
	}

	hasLeftNode() {
		return this.left ? true : false;
	}
	hasRightNode() {
		return this.right ? true : false;
	}

	appendChild(node) {
		if (!this.hasLeftNode()) {
			this.left = node.self;
		} else if (!this.hasRightNode()) {
			this.right = node.self;
		} else if (this.hasLeftNode() || this.hasRightNode()) {
			return
		}	else {
			throw new Error;
		}
	}

	removeChild(node) {

	}

	remove() {

	}

	swapWithParent() {
		
	}
}


module.exports = Node;
