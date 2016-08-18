const Node = require('../src/node');
const MaxHeap = require('../src/max-heap');

describe('MaxHeap', () => {
	describe('#constructor', () => {
		const h = new MaxHeap();

		it('assigns null to this.root', () => {
			expect(h.root).to.equal(null);
		});

		it('assigns [] to this.parentNodes', () => {
			expect(h.parentNodes).to.deep.equal([]);
		});
	});

	describe('#push', () => {
		let h;

		beforeEach(() => {
			h = new MaxHeap();
		});

		it('calls insertNode with new node having passed data and priority', () => {
			sinon.spy(h, 'insertNode');

			h.push(42, 15);

			expect(h.insertNode).to.have.been.calledOnce;
			expect(h.insertNode.firstCall.args[0]).to.be.an.instanceof(Node);
			expect(h.insertNode.firstCall.args[0].data).to.equal(42);
			expect(h.insertNode.firstCall.args[0].priority).to.equal(15);
		});

		it('calls shiftNodeUp with new node having passed data and priority', () => {
			sinon.spy(h, 'shiftNodeUp');

			h.push(42, 15);

			expect(h.shiftNodeUp).to.have.been.calledOnce;
			expect(h.shiftNodeUp.firstCall.args[0]).to.be.an.instanceof(Node);
			expect(h.shiftNodeUp.firstCall.args[0].data).to.equal(42);
			expect(h.shiftNodeUp.firstCall.args[0].priority).to.equal(15);
		});
	});

	describe('#insertNode', () => {
		let h;

		beforeEach(() => {
			h = new MaxHeap();
		});

		it('assings passed node to this.root if heap is empty', () => {
			const node = new Node(42, 15);

			h.insertNode(node);
			expect(h.root).to.equal(node);
		});

		it('inserts nodes to correct places', () => {
			const nodes = [
				new Node(0, 0),
				new Node(1, 1),
				new Node(2, 2),
				new Node(3, 3),
				new Node(4, 4),
				new Node(5, 5),
				new Node(6, 6),
			];

			nodes.forEach(node => {
				h.insertNode(node);
			});

			expect(h.root).to.equal(nodes[0]);
			expect(h.root.left).to.equal(nodes[1]);
			expect(h.root.right).to.equal(nodes[2]);
			expect(h.root.left.left).to.equal(nodes[3]);
			expect(h.root.left.right).to.equal(nodes[4]);
		});

		it('maintains this.parentNodes in correct state', () => {
			const nodes = [
				new Node(0, 0),
				new Node(1, 1),
				new Node(2, 2),
				new Node(3, 3),
				new Node(4, 4),
				new Node(5, 5),
				new Node(6, 6),
			];

			h.insertNode(nodes[0]);
			expect(h.parentNodes[0]).to.equal(nodes[0]);

			h.insertNode(nodes[1]);
			expect(h.parentNodes[0]).to.equal(nodes[0]);
			expect(h.parentNodes[1]).to.equal(nodes[1]);

			h.insertNode(nodes[2]);
			expect(h.parentNodes[0]).to.equal(nodes[1]);
			expect(h.parentNodes[1]).to.equal(nodes[2]);

			h.insertNode(nodes[3]);
			expect(h.parentNodes[0]).to.equal(nodes[1]);
			expect(h.parentNodes[1]).to.equal(nodes[2]);
			expect(h.parentNodes[2]).to.equal(nodes[3]);

			h.insertNode(nodes[4]);
			expect(h.parentNodes[0]).to.equal(nodes[2]);
			expect(h.parentNodes[1]).to.equal(nodes[3]);
			expect(h.parentNodes[2]).to.equal(nodes[4]);

			h.insertNode(nodes[5]);
			expect(h.parentNodes[0]).to.equal(nodes[2]);
			expect(h.parentNodes[1]).to.equal(nodes[3]);
			expect(h.parentNodes[2]).to.equal(nodes[4]);
			expect(h.parentNodes[3]).to.equal(nodes[5]);

			h.insertNode(nodes[6]);
			expect(h.parentNodes[0]).to.equal(nodes[3]);
			expect(h.parentNodes[1]).to.equal(nodes[4]);
			expect(h.parentNodes[2]).to.equal(nodes[5]);
			expect(h.parentNodes[3]).to.equal(nodes[6]);
		});
	});

	describe('#shiftNodeUp', () => {
		let h;

		beforeEach(() => {
			h = new MaxHeap();

			h.root = new Node(0, 10);
			h.root.appendChild(new Node(1, 5));
			h.root.appendChild(new Node(2, 7));
			h.root.left.appendChild(new Node(3, 20));

/**
        10                       20
       /  \                     /  \
      5    7  - shift up ->   10   7
     /                        /
    20                       5
**/

			h.parentNodes = [
				h.root.left,
				h.root.right,
				h.root.left.left,
			];
		});

		it('shifts node up until heap property is valid', () => {
			const newRoot = h.root.left.left;
			h.shiftNodeUp(h.root.left.left);
			expect(h.root).to.equal(newRoot);
		});

		it('maintants parentNodes in correct state', () => {
			const correctParentNodesOrderAfterShiftUp = [
				h.root,
				h.root.right,
				h.root.left
			]

			h.shiftNodeUp(h.root.left.left);

			expect(h.parentNodes[0]).to.equal(correctParentNodesOrderAfterShiftUp[0]);
			expect(h.parentNodes[1]).to.equal(correctParentNodesOrderAfterShiftUp[1]);
			expect(h.parentNodes[2]).to.equal(correctParentNodesOrderAfterShiftUp[2]);
		});

		it('calls Node.swapWithParent', () => {
			const nodeToShiftUp = h.root.left.left;
			sinon.spy(nodeToShiftUp, 'swapWithParent');

			h.shiftNodeUp(nodeToShiftUp);

			expect(nodeToShiftUp.swapWithParent).to.have.been.calledTwice;
		});

		it('calls itself recursively', () => {
			const nodeToShiftUp = h.root.left.left;
			sinon.spy(h, 'shiftNodeUp');

			h.shiftNodeUp(nodeToShiftUp);

			expect(h.shiftNodeUp).to.have.been.calledThrice;
			expect(h.shiftNodeUp.firstCall.args[0]).to.equal(nodeToShiftUp);
			expect(h.shiftNodeUp.secondCall.args[0]).to.equal(nodeToShiftUp);
			expect(h.shiftNodeUp.thirdCall.args[0]).to.equal(nodeToShiftUp);
		});
	});

	describe('#clear', () => {
		it('assigns null to root and [] to parentNodes', () => {
			const h = new MaxHeap();
			h.push(0, 0);
			h.push(15, 2);
			h.push(42, 13);

			h.clear();

			expect(h.root).to.equal(null);
			expect(h.parentNodes).to.deep.equal([]);
		});
	});

	describe('#pop', () => {
		it('does nothing if heap is empty', () => {
			const h = new MaxHeap();
			expect(() => {
				h.pop();
			}).not.to.throw();
		});

		it('returns data associated with root', () => {
			const h = new MaxHeap();
			h.push(42, 15);
			h.push(15, 14);
			h.push(0, 16);
			h.push(100, 100);

			expect(h.pop()).to.equal(100);
			expect(h.pop()).to.equal(0);
			expect(h.pop()).to.equal(42);
			expect(h.pop()).to.equal(15);
		});

		it('calls detachRoot', () => {
			const h = new MaxHeap();
			h.push(42, 15);

			sinon.spy(h, 'detachRoot');

			h.pop();

			expect(h.detachRoot).to.have.been.called;
		});

		it('calls restoreRootFromLastInsertedNode with detached root', () => {
			const fakeDetachedNode = {};

			const h = new MaxHeap();
			h.push(42, 15);

			sinon.stub(h, 'detachRoot').returns(fakeDetachedNode);
			sinon.spy(h, 'restoreRootFromLastInsertedNode');

			h.pop();

			expect(h.restoreRootFromLastInsertedNode).to.have.been.calledWith(fakeDetachedNode);
		});

		it('calls shiftNodeDown with current heap root', () => {
			const h = new MaxHeap();
			h.push(42, 15);
			h.push(15, 42);
			h.push(100, 100);

			const expectedNodeToShiftDown = h.root.right;

			sinon.spy(h, 'shiftNodeDown');

			h.pop();
			expect(h.shiftNodeDown).to.have.been.calledWith(expectedNodeToShiftDown);
		});
	});

	describe('#detachRoot', () => {
		let h;

		beforeEach(() => {
			h = new MaxHeap();
		});

		it('assigns null to this.root', () => {
			h.push(42, 15);
			h.detachRoot();

			expect(h.root).to.equal(null);
		});

		it('removes root from parentNodes', () => {
			h.push(42, 15);
			h.push(15, 42);

			h.detachRoot();

			expect(h.parentNodes[0].data).to.equal(42);
			expect(h.parentNodes[0].priority).to.equal(15);
		});

		it('returns detached root', () => {
			h.push(42, 15);

			const expected = h.root;
			const actual = h.detachRoot();

			expect(actual).to.equal(expected);
		});
	});

	describe('#restoreRootFromLastInsertedNode', () => {
		let h;

		beforeEach(() => {
			h = new MaxHeap();

			h.push(42, 15);
			h.push(14, 32);
			h.push(0, 0);
		});

		it('should remove last inserted node and assing it to root', () => {
			const lastInsertedNode = h.root.right;
			const left = h.root.left;

			const detached = h.detachRoot();
			h.restoreRootFromLastInsertedNode(detached);

			expect(h.root).to.equal(lastInsertedNode);
			expect(h.root.left).to.equal(left);
			expect(left.parent).to.equal(lastInsertedNode);
		});

		it('should maintain correct state of parentNodes', () => {
			const root = h.root;
			const left = h.root.left;
			const lastInsertedNode = h.root.right;

			const detached = h.detachRoot();
			h.restoreRootFromLastInsertedNode(detached);

			expect(h.parentNodes.indexOf(root)).to.equal(-1);
			expect(h.parentNodes[0]).to.equal(lastInsertedNode);
			expect(h.parentNodes[1]).to.equal(left);
		});
	});

	describe('#shiftNodeDown', () => {
		let h;

		beforeEach(() => {
			h = new MaxHeap();

			h.root = new Node(0, 3);
			h.root.appendChild(new Node(1, 20));
			h.root.appendChild(new Node(2, 7));
			h.root.left.appendChild(new Node(3, 5));

/**
          3                        20
        /  \                      /  \
      20    7  - shift down ->   5    7
     /                          /
    5                          3
**/

			h.parentNodes = [
				h.root.left,
				h.root.right,
				h.root.left.left,
			];
		});

		it('shifts node down until heap property is valid', () => {
			const newRoot = h.root.left;
			const newDeepest = h.root;

			h.shiftNodeDown(h.root);
			expect(h.root).to.equal(newRoot);
			expect(h.root.left.left).to.equal(newDeepest);
		});

		it('maintants parentNodes in correct state', () => {
			const correctParentNodesOrderAfterShiftUp = [
				h.root.left.left,
				h.root.right,
				h.root
			]

			h.shiftNodeDown(h.root);

			expect(h.parentNodes[0]).to.equal(correctParentNodesOrderAfterShiftUp[0]);
			expect(h.parentNodes[1]).to.equal(correctParentNodesOrderAfterShiftUp[1]);
			expect(h.parentNodes[2]).to.equal(correctParentNodesOrderAfterShiftUp[2]);
		});

		it('calls Node.swapWithParent', () => {
			const firstNodeToSwapWith = h.root.left;
			sinon.spy(firstNodeToSwapWith, 'swapWithParent');

			h.shiftNodeDown(h.root);

			expect(firstNodeToSwapWith.swapWithParent).to.have.been.calledOnce;
		});

		it('calls itself recursively', () => {
			const nodeToShiftDown = h.root;
			sinon.spy(h, 'shiftNodeDown');

			h.shiftNodeDown(nodeToShiftDown);

			expect(h.shiftNodeDown).to.have.been.calledThrice;
			expect(h.shiftNodeDown.firstCall.args[0]).to.equal(nodeToShiftDown);
			expect(h.shiftNodeDown.secondCall.args[0]).to.equal(nodeToShiftDown);
			expect(h.shiftNodeDown.thirdCall.args[0]).to.equal(nodeToShiftDown);
		});
	});

	describe('#size', () => {
		it('returns current size of heap', () => {
			const h = new MaxHeap();
			expect(h.size()).to.equal(0);

			h.push(15, 42);
			h.push(13, 0);
			expect(h.size()).to.equal(2);

			h.push(14, 100);
			expect(h.size()).to.equal(3);

			h.pop();
			h.pop();
			expect(h.size()).to.equal(1);

			h.clear();
			expect(h.size()).to.equal(0);
		});
	});

	describe('#isEmpty', () => {
		it('reutrns true if heap is empty', () => {
			const h = new MaxHeap();
			expect(h.isEmpty()).to.equal(true);

			h.push(100, 500);
			expect(h.isEmpty()).to.equal(false);

			h.clear();
			expect(h.isEmpty()).to.equal(true);
		});
	});
});
