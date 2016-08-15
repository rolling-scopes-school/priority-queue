const Node = require('../src/node');

describe('Node', () => {
	describe('#constructor', () => {
		const node = new Node(42, 15);

		it('assigns passed data and priority to this', () => {
			expect(node.data).to.equal(42);
			expect(node.priority).to.equal(15);
		});

		it('assigns this.parent, this.left and this.right to null', () => {
			expect(node.parent).to.equal(null);
			expect(node.left).to.equal(null);
			expect(node.right).to.equal(null);
		});
	});

	describe('#appendChild', () => {
		let parent, leftChild, rightChild;

		beforeEach(() => {
			parent = new Node(42, 15);
			leftChild = new Node(13, 20);
			rightChild = new Node(98, 69);
		});

		it('assigns passed child to this.left', () => {
			parent.appendChild(leftChild);

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(null);
		});

		it('assigns passed child to this.right if this.left exists', () => {
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});

		it('does nothing if this.left and this.right exist', () => {
			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
			parent.appendChild(new Node(42, 15));

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});
	});

	describe('#removeChild', () => {
		let parent, leftChild, rightChild;

		beforeEach(() => {
			parent = new Node(42, 15);
			leftChild = new Node(13, 20);
			rightChild = new Node(98, 69);

			parent.appendChild(leftChild);
			parent.appendChild(rightChild);
		});

		it('assing null to this.left if passed node is left child', () => {
			parent.removeChild(leftChild);
			expect(parent.left).to.equal(null);
		});

		it('assing null to this.right if passed node is right child', () => {
			parent.removeChild(rightChild);
			expect(parent.right).to.equal(null);
		});

		it('throws error if passed node is not a child of this node', () => {
			expect(() => {
				parent.removeChild(new Node(15, 42));
			}).to.throw();

			expect(parent.left).to.equal(leftChild);
			expect(parent.right).to.equal(rightChild);
		});

		it('assigns null to child.parent', () => {
			parent.removeChild(leftChild);

			expect(leftChild.parent).to.equal(null);
		})
	});

	describe('#remove', () => {
		it('does nothing if node does not have parent', () => {
			const node = new Node(42, 15);

			expect(() => {
				node.remove();
			}).not.to.throw();
		});

		it('calls child.parent.removeChild with child as arg', () => {
			const parent = new Node(42, 15);
			const child = new Node(15, 42);

			parent.appendChild(child);

			sinon.spy(parent, 'removeChild');

			child.remove();

			expect(parent.removeChild).to.have.been.calledOnce;
			expect(parent.removeChild).to.have.been.calledWith(child);
		});
	});

	describe('#swapWithParent', () => {
		it('does nothing if node does not have parent', () => {
			const node = new Node(15, 42);

			expect(() => {
				node.swapWithParent();
			}).not.to.throw();
		});

		it('updates parent.parent', () => {
			const parent = new Node(15, 42);
			const child = new Node(42, 15);

			parent.appendChild(child);
			child.swapWithParent();

			expect(parent.parent).to.equal(child);
		});

		it('updates child.parent', () => {
			const parentOfParent = new Node(100, 500);
			const parent = new Node(15, 42);
			const child = new Node(42, 15);

			parentOfParent.appendChild(parent);
			parent.appendChild(child);
			child.swapWithParent();

			expect(child.parent).to.equal(parentOfParent);
		});

		it('updates parent.child.parent', () => {
			const root = new Node(1, 2);
			const left = new Node(3, 4);
			const right = new Node(5, 6);

			root.appendChild(left);
			root.appendChild(right);

			right.swapWithParent();

			expect(left.parent).to.equal(right);
		})

		it('updates children of node and parent node', () => {
			const root = new Node(42, 15);
			const left = new Node(13, 42);
			const right = new Node(0, 1);
			const childOfLeft = new Node(0, 15);

			root.appendChild(left);
			root.appendChild(right);
			left.appendChild(childOfLeft);

			left.swapWithParent();

			expect(left.right).to.equal(right);
			expect(left.left).to.equal(root);
			expect(root.left).to.equal(childOfLeft);
		});

		it('maintains correct state of parent.parent.left and parent.parent.right', () => {
			const root = new Node(15, 42);
			const left = new Node(42, 15);
			const right = new Node(13, 42);
			const childOfLeft = new Node(13, 34);
			const childOfRight = new Node(0, 1);

			root.appendChild(left);
			root.appendChild(right);
			left.appendChild(childOfLeft);
			right.appendChild(childOfRight);

			childOfLeft.swapWithParent();
			childOfRight.swapWithParent();

			expect(root.left).to.equal(childOfLeft);
			expect(root.right).to.equal(childOfRight);
		});
	});
});
