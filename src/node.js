class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;		
		this.left = null;
		this.right = null;
		this.self = Symbol();
	}

	throwError(error) {
		throw new Error(error);
	}

	appendChild(node) {	
		if (this.left && this.right) {
			return 
		}	
		this.left !== null ? this.right = node : this.left = node;
		node.parent = this.self;
		
	}

	removeChild(node) {
		let scenary = (child, left, right) => {
          let check = direction => {
          let result = (direction === null ||direction.self != child.self) ? false : true;
          return result;
          }
			if (check(left)) {
				this.left = null;
				child.parent = null;
                return left
			} else if(check(right)) {
				this.right = null;
				child.parent = null;
			}
		}
        
        
        
        
		///if node is leaf
		if (node.parent === this.self) {
			scenary(node, this.left, this.right)
		} else {
			this.throwError('should be leaf of parent')
		}
							 
	}

	remove() {

	}

	swapWithParent() {
		
	}
}

module.exports = Node;
