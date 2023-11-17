

function drawLinkedList(headNode) {
    let currentNode = headNode;

    while (currentNode) {
      if (currentNode.next) {
        const nextX = x + nodeWidth + nodeSpacing;
        const nextY = y + nodeSpacing;

        x = nextX;
      }

      currentNode = currentNode.next;
    }
  }


  module.exports = drawLinkedList;
