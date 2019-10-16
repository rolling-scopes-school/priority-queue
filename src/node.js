
class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
		this.self = this;
		this.identity = Symbol()
	}

	hasLeftNode() {
		return this.left ? true : false;
	}
	hasRightNode() {
		return this.right ? true : false;
	}

	
	isEvenOneEqual (...args) {
		let itemOfComparasion = args.pop();  
		let result = args.filter(item => item === itemOfComparasion);
		return result.length ? true : false;
	}
	

	appendChild(node) {
		if (!this.hasLeftNode()) {
			this.left = node.self;
			node.parent = this.self;
		} else if (!this.hasRightNode()) {
			this.right = node.self;
			node.parent = this.self;
		} else if (this.hasLeftNode() && this.hasRightNode()) {
			return
		}	else {
			throw new Error;
		}
	}

	removeChild(node) {	
		
		//check if even one of leaf is node
		
		if (this.left && this.right && !this.isEvenOneEqual(this.left.identity, 
								this.right.identity, 
								node.identity)) {
			throw new Error
		}		
		
		if (this.isEvenOneEqual(node.identity, this.left.identity)) {			
			this.left = null;
			node.parent = null;	
			return		
		} 
		
		if (this.isEvenOneEqual(node.identity, this.right.identity)) {
			this.right = null;
			node.parent = null;	
			return		
		}
				
	}

	remove() {
		if (this.isEvenOneEqual(this.parent, null)) {
			return
		} else {	
			//console.log(this.parent.removeChild(this.self))		
			this.parent.removeChild(this.self);
		}
	}

	swapWithParent() {
		
	}
}


module.exports = Node;
