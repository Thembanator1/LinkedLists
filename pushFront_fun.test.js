const { drawLinkedList } = require("./test/pushFront_fun"); 


// Assuming you have the necessary functions and constants defined elsewhere
// For example, you need to define drawNode, drawArrow, x, y, nodeSpacing, nodeWidth, nodeHeight

test('drawLinkedList should call drawNode and drawArrow with the correct arguments', () => {
    // Mock the drawNode and drawArrow functions
    const mockDrawNode = jest.fn();
    const mockDrawArrow = jest.fn();
  
    // Mocked linked list data
    const linkedList = {
      data: 1,
      next: {
        data: 2,
        next: {
          data: 3,
          next: null,
        },
      },
    };

  
  });
  
