const {start, addRandomNode, deleteNode, link, updateLink, drawLine, drawNode} = require("../Interactive_UI/first_fun");



describe('link function tests', () => {
  // Test case for a valid node
  it('should return the link for an existing node', () => {
    const nodes = [
      { name: 'node1' },
      { name: 'node2' },
      { name: 'node3' },
    ];

    const result = link(nodes[0], 'node2');
    expect(result).toBe('node1');
  });

  // Test case for a non-existing node
  it('should return an error for a non-existing node', () => {
    const nodes = [
      { name: 'node1' },
      { name: 'node2' },
      { name: 'node3' },
    ];

    const result = link(null, 'node4');
    expect(result).toBe(1);
  });

  // Test case for a special case (e.g., 'null' node name)
  it('should handle a special case (e.g., "null" node name)', () => {
    const nodes = [
      { name: 'node1' },
      { name: 'node2' },
      { name: 'node3' },
    ];

    const result = link(null, 'null');
    expect(result).toBe(null);
  });
});





describe('updateLink function tests', () => {
    // Test case for updating links
    it('should update links for the source node', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: 'head', prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: 'temp' },
        { x: 300, y: 200, name: 'tail', next: null, prev: 'head' },
      ];
  
      const sourceNodeName = 'head';
      const nextNodeName = 'tail';
      const prevNodeName = 'temp';
  
      // Call the updateLink function
      const result = updateLink(nodes, sourceNodeName, nextNodeName, prevNodeName);
  
      // Expect the result to be the modified nodes array
      expect(result).toHaveLength(3); // Ensure there are three nodes
  
      // Expect the links to be updated for the source node
      const updatedSourceNode = result.find(node => node.name === sourceNodeName);
      expect(updatedSourceNode.next).toBe(nextNodeName);
      expect(updatedSourceNode.prev).toBe(prevNodeName);
    });
  
    // Test case for not updating links with incomplete input
    it('should not update links with incomplete input', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: 'head', prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: 'temp' },
        { x: 300, y: 200, name: 'tail', next: null, prev: 'head' },
      ];
  
      const sourceNodeName = 'head';
      const nextNodeName = 'tail';
      const prevNodeName = null; // Incomplete input
  
      // Call the updateLink function
      const result = updateLink(nodes, sourceNodeName, nextNodeName, prevNodeName);
  
      // Expect the result to be the original nodes array (unchanged)
      expect(result).toEqual(nodes);
    });
  
    // Test case for not updating links if the source node doesn't exist
    it('should not update links if the source node does not exist', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: 'head', prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: 'temp' },
        { x: 300, y: 200, name: 'tail', next: null, prev: 'head' },
      ];
  
      const sourceNodeName = 'nonexistentNode';
      const nextNodeName = 'tail';
      const prevNodeName = 'temp';
  
      // Call the updateLink function
      const result = updateLink(nodes, sourceNodeName, nextNodeName, prevNodeName);
  
      // Expect the result to be the original nodes array (unchanged)
      expect(result).toEqual(nodes);
    });
});
  



describe('deleteNode function tests', () => {
    // Test case for deleting a node
    it('should delete a node and update neighboring nodes', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: 'head', prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: 'temp' },
        { x: 300, y: 200, name: 'tail', next: null, prev: 'head' },
      ];
  
      const selectedNode = nodes[1]; // Select the 'head' node for deletion
  
      // Call the deleteNode function
      const result = deleteNode(nodes, selectedNode);
  
      // Expect the result to be the modified nodes array
      expect(result).toHaveLength(2); // Ensure there are two nodes now
  
      // Expect the selected node to be removed
      expect(result.some(node => node.name === selectedNode.name)).toBe(false);
  
      // Expect the neighboring nodes' links to be updated
      const tempNode = result.find(node => node.name === 'temp');
      const tailNode = result.find(node => node.name === 'tail');
      expect(tempNode.next).toBe(null);
      expect(tailNode.prev).toBe(null);
    });
  
    // Test case for not deleting if no node is selected
    it('should not delete a node if no node is selected', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: 'head', prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: 'temp' },
        { x: 300, y: 200, name: 'tail', next: null, prev: 'head' },
      ];
  
      const selectedNode = null; // No node selected
  
      // Call the deleteNode function
      const result = deleteNode(nodes, selectedNode);
  
      // Expect the result to be the original nodes array (unchanged)
      expect(result).toEqual(nodes);
    });
});
  





describe('addRandomNode function tests', () => {
    // Test case for adding a new node
    it('should add a new node and update temp node', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: null, prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: null },
        { x: 300, y: 200, name: 'tail', next: null, prev: null },
      ];
  
      const newNodeName = 'NewNode';
  
      // Call the addRandomNode function
      const result = addRandomNode(nodes, newNodeName);
  
      // Expect the result to be the modified nodes array
      expect(result).toHaveLength(4); // Ensure there are four nodes now
  
      // Expect the new node to be added
      expect(result.some(node => node.name === newNodeName)).toBe(true);
  
      // Expect the temp node's next property to be updated
      const tempNode = result.find(node => node.name === 'temp');
      expect(tempNode.next).toBe(newNodeName);
    });
  
    // Test case for not adding a node with the same name
    it('should not add a node if a node with the same name already exists', () => {
      const nodes = [
        { x: 100, y: 500, name: 'temp', next: null, prev: null },
        { x: 100, y: 100, name: 'head', next: 'tail', prev: null },
        { x: 300, y: 200, name: 'tail', next: null, prev: null },
      ];
  
      const existingNodeName = 'head';
  
      // Call the addRandomNode function
      const result = addRandomNode(nodes, existingNodeName);
  
      // Expect the result to be the original nodes array (unchanged)
      expect(result).toEqual(nodes);
    });
});
  












