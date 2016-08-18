const Queue = require('../src/queue');
const MaxHeap = require('../src/max-heap');

describe('PriorityQueue', () => {
	describe('#constructor', () => {
		it('assings passed maxSize or set it to default value 30', () => {
			const q = new Queue(10);
			const qWithDefaultMaxSize = new Queue();

			expect(q.maxSize).to.equal(10);
			expect(qWithDefaultMaxSize.maxSize).to.equal(30);
		});

		it('assings new MaxHeap to this.heap', () => {
			const q = new Queue();

			expect(q.heap).to.be.instanceof(MaxHeap);
		});
	});

	describe('#push', () => {
		let q;

		beforeEach(() => {
			q = new Queue(3);
		});

		it('calls heap.push with passed data and priority', () => {
			sinon.spy(q.heap, 'push');

			q.push(0, 1);
			expect(q.heap.push).to.have.been.calledWith(0, 1);
		});

		it('throws an error if queue has max size', () => {
			q.push(0, 1);
			q.push(1, 2);
			q.push(2, 3);

			expect(() => {
				q.push(3, 4);
			}).to.throw();
		});
	});

	describe('#shift', () => {
		let q;

		beforeEach(() => {
			q = new Queue();
		});

		it('calls heap.pop', () => {
			q.push(0, 1);

			sinon.spy(q.heap, 'pop');
			q.shift();
			expect(q.heap.pop).to.have.been.called;
		});

		it('returns value of removed node', () => {
			q.push(0, 1);
			expect(q.shift()).to.equal(0);
		});

		it('throws an error if queue is empty', () => {
			expect(() => {
				q.shift()
			}).to.throw();
		});

		it('should return items sorted by priority', () => {
			const nodes = [
				{ priority: 10, data: 1 },
				{ priority: 20, data: 2 },
				{ priority:  5, data: 3 },
				{ priority:  0, data: 4 },
				{ priority:  8, data: 5 },
				{ priority: 12, data: 6 },
				{ priority: 17, data: 7 },
				{ priority: 15, data: 8 },
			];

			const expectedData = [2, 7, 8, 6, 1, 5, 3, 4]

			nodes.forEach(node => q.push(node.data, node.priority));
			expectedData.forEach(d => expect(q.shift()).to.equal(d));
		});

		it('should handle items with same priority (return in the same order this items have been added)', () => {
			const expectedData = [3, 5, 1, 0, 4, 2];

			q.push(0, 10);
			q.push(1, 15);
			q.push(2, 4);
			q.push(3, 17);
			q.push(4, 6);
			q.push(5, 17);

			for (var i = 0; i < 6; i++) {
				expect(q.shift()).to.equal(expectedData[i]);
			}
		});
	});

	describe('#size', () => {
		it('returns current size of queue', () => {
			const q = new Queue();

			q.push(0, 1);
			expect(q.size()).to.equal(1);

			q.push(1, 2);
			expect(q.size()).to.equal(2);

			q.push(2, 3);
			expect(q.size()).to.equal(3);

			q.shift();
			q.shift();

			expect(q.size()).to.equal(1);

			q.shift();
			expect(q.size()).to.equal(0);
		});
	});

	describe('#isEmpty', () => {
		it('return true if queue is empty', () => {
			const q = new Queue();

			expect(q.isEmpty()).to.equal(true);

			q.push(0, 1);
			expect(q.isEmpty()).to.equal(false);

			q.shift();
			expect(q.isEmpty()).to.equal(true);
		});
	});
});
