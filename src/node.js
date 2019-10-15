class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;		
		this.left = null;
		this.right = null;
		this.self = Symbol();
        this.selfRef = this;
        this.parentRef = null;
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
        node.parentRef = this.selfRef;
	}

	removeChild(node) {
      //check if it was called from this.remove()
        
          let scenary = (child, left, right) => {
          let check = direction => {
          let result = (direction === null ||direction.self != child.self) ? false : true;
          return result;
          }
			if (check(left)) {
				this.left = null;
				child.parent = null;
				child.parentRef = null;
                return left
			} else if(check(right)) {
				this.right = null;
				child.parent = null;
				child.parentRef = null;
			}
		}
        
        
        
        
		///if node is leaf
		if (node.parent === this.self) {
			scenary(node, this.left, this.right)
		} else {
			this.throwError('should be leaf of parent')
		}
       					 
	}


	///need to think about it
	remove() { 
      //let removeBounded = this.removeChild.bind(this.p)
	  //this.parent ? removeBounded(this.s) : '';
	  this.parent ? this.parentRef.removeChild(this.selfRef) : '';
	}

	swapWithParent() {
		
	}
}



module.exports = Node;
