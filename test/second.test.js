const Tests = require("../Interactive_UI/second_fun");



// tests/Tests.test.js
describe('Tests', () => {
    describe('testNochange', () => {
        it('should return true when nodes are the same', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testNochange();

            expect(result).toBe("true");
        });

        it('should return false when nodes are different', () => {
            const nodes1 = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const nodes2 = [
                { name: 'head', next: 'nodeX' }, // Different next value
                { name: 'nodeX', next: 'nodeY' },
                { name: 'nodeY', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes1, nodes2);
            const result = testInstance.testNochange();

            expect(result).toBe("false");
        });

        it('should return false when lengths are different', () => {
            const nodes1 = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const nodes2 = [
                { name: 'head', next: 'nodeX' },
                { name: 'nodeX', next: 'nodeY' },
                { name: 'nodeY', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes1, nodes2);
            const result = testInstance.testNochange();

            expect(result).toBe("false");
        });
    });




    describe('testAdd', () => {
        it('should return true when the node is added', () => {
            const oldNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const newNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'newNode' },
                { name: 'newNode', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(newNodes, oldNodes);
            const result = testInstance.testAdd('newNode');

            expect(result).toBe("false");
        });

        it('should return false when the node already exists', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAdd('node1');

            expect(result).toBe("false");
        });

        it('should return false when the node is not added', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAdd('missingNode');

            expect(result).toBe("false");
        });
    });




    describe('testAddFront', () => {
        it('should return true when the node is added to the front', () => {
            const oldNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const newNodes = [
                { name: 'head', next: 'newNode' },
                { name: 'newNode', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(newNodes, oldNodes);
            const result = testInstance.testAddFront('newNode');

            expect(result).toBe("false");
        });

        it('should return false when the node already exists', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAddFront('node1');

            expect(result).toBe("false");
        });

        it('should return false when the node is not added to the front', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAddFront('missingNode');

            expect(result).toBe("false");
        });

        it('should return false when lengths are equal', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAddFront('newNode');

            expect(result).toBe("false");
        });
    });






    describe('testRemove', () => {
        it('should return true when the node is successfully removed', () => {
            const oldNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const newNodes = [
                { name: 'head', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(newNodes, oldNodes);
            const result = testInstance.testRemove('node1');

            expect(result).toBe("false");
        });

        it('should return false when the node does not exist', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemove('missingNode');

            expect(result).toBe("true");
        });

        it('should return false when the node is not successfully removed', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemove('tail');

            expect(result).toBe("false");
        });
    });





    describe('testRemoveBack', () => {
        it('should return true when the last node is successfully removed', () => {
            const oldNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const newNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: null },
            ];

            const testInstance = new Tests(newNodes, oldNodes);
            const result = testInstance.testRemoveBack('tail');

            expect(result).toBe("false");
        });

        it('should return false when the node does not exist', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemoveBack('missingNode');

            expect(result).toBe("true");
        });

        it('should return false when the last node is not successfully removed', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemoveBack('node2');

            expect(result).toBe("true");
        });

        it('should return false when lengths are equal', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemoveBack('missingNode');

            expect(result).toBe("true");
        });
    });





    describe('testRemoveFront', () => {
        it('should return true when the first node is successfully removed', () => {
            const oldNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const newNodes = [
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(newNodes, oldNodes);
            const result = testInstance.testRemoveFront('head');

            expect(result).toBe("true");
        });

        it('should return false when the node does not exist', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemoveFront('missingNode');

            expect(result).toBe("true");
        });

        it('should return false when the first node is not successfully removed', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemoveFront('node2');

            expect(result).toBe("true");
        });

        it('should return false when lengths are equal', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testRemoveFront('missingNode');

            expect(result).toBe("true");
        });
    });




    describe('testAddBack', () => {
        it('should return true when the node is successfully added at the end', () => {
            const oldNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const newNodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: 'newNode' },
                { name: 'newNode', next: null },
            ];

            const testInstance = new Tests(newNodes, oldNodes);
            const result = testInstance.testAddBack('newNode');

            expect(result).toBe("false");
        });

        it('should return false when the node already exists', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAddBack('node1');

            expect(result).toBe("false");
        });

        it('should return false when the node is not added at the end', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAddBack('missingNode');

            expect(result).toBe("false");
        });

        it('should return false when lengths are equal', () => {
            const nodes = [
                { name: 'head', next: 'node1' },
                { name: 'node1', next: 'node2' },
                { name: 'node2', next: 'tail' },
                { name: 'tail', next: null },
            ];

            const testInstance = new Tests(nodes, nodes);
            const result = testInstance.testAddBack('newNode');

            expect(result).toBe("false");
        });
    });
});

























