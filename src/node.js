
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
			return
		} else if (!this.hasRightNode()) {
			this.right = node.self;
			node.parent = this.self;
			return
		} else if (this.hasLeftNode() && this.hasRightNode()) {
			return
		}	else {
			throw new Error;
		}
	}

	removeChild(node) {	
		
		//check if even one of leaf exist and is node		
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

		let relation = (doughter) => (mama) => {
			let result;
			if  (mama.left) {
				this.isEvenOneEqual(doughter.identity, mama.left.identity) ? result = 'left' : '';
			}
			if (mama.right) {
				this.isEvenOneEqual(doughter.identity, mama.right.identity) ? result = 'right' : '';
			}
			return result;
		}

		


		if (this.isEvenOneEqual(this.parent, null)) {
			return
		} else { 
			let son = this.self;   let dad = this.parent; let grand = this.parent.parent;
			//let sonL = this.left;  let dadL = dad.left;   let grandL = grand.left;
			//let sonR = this.right; let dadR = dad.right;  let grandR = grand.right;
			//let sonRelationToDad = relation(son)(dad);
			//let dadRelationToGrand = relation(dad)(son);

			
			 
			
			
			
			//update parent.parent			
			son.parent = grand;
			dad.parent = son;
			
			

			//updates parent.child.parent
			
			let position = relation(son)(dad)
			
			let posBackUp = son[position];			
			son[position] = dad;
			
			
			let sonL = son.left;
			let dadL = dad.left;
			if (dad.left != null && !this.isEvenOneEqual(dad.left.identity, son.identity)) {			
				dadL.parent = son;
				son.left = dadL;							
				dad.left = sonL;
				
			}

			let sonR = son.right;
			let dadR = dad.right;			
			if (dad.right != null && !this.isEvenOneEqual(dad.right.identity, son.identity)) {				
				dadR.parent = son;
				son.right = dadR;							
				dad.right = sonR;
				
				
			}
			
			//posBackUp.parent = dad;
			dad[position] = posBackUp;
			if (dad[position] != null) {
				dad[position].parent = dad;
			}
			
			if (grand) {
				let positionGrand = relation(dad)(grand);
				//console.log(positionGrand);
			
				if (grand[positionGrand] != null) {
					grand[positionGrand] = son;				
				}
			
			}
			
			
			//console.log(grand);
			//console.log('------');


		}
	}
}


module.exports = Node;
