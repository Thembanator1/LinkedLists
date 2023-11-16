// Define a basic node for the linked list
class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

  // Create three linked list nodes
  const node1 = new Node(["Value : 1", "Address: 0x100"]);
  const node2 = new Node(["Value : 2", "Address: 0x200"]);
  const node3 = new Node(["Value : 3", "Address: 0x300"]);
  const nullNode = new Node(["NULL", ""]);

  // Link the nodes together
  node1.next = node2;
  node2.next = node3;
  node3.next = nullNode;

  // Canvas setup
  const canvas1 = document.getElementById("myCanvas");
  const ctx1 = canvas1.getContext("2d");

  // Animation variables
  const nodeWidth = 100;
  const nodeHeight = 50;
  const nodeSpacing = 20;
  let x = 50;
  const y = 100;

  // Function to draw a rectangle for a node
  function drawNode(data, x, y) {
    console.log(data);
    ctx1.fillStyle = "purple";
    ctx1.fillRect(x, y, nodeWidth, nodeHeight);
    ctx1.strokeRect(x, y, nodeWidth, nodeHeight);

    ctx1.fillStyle = "white";
    ctx1.fillText(data[0], x + 10, y + 20);
    ctx1.fillText(data[1], x + 10, y + 40);
  }

  // Function to draw an arrow between nodes with arrowheads
  function drawArrow(x1, y1, x2, y2) {
    const dx = x2 - (x1 + nodeWidth);
    const dy = (y2 + nodeHeight / 2) - (y1 + nodeHeight / 2);
    const angle = Math.atan2(dy, dx);

    // Draw the arrow line
    ctx1.beginPath();
    ctx1.moveTo(x1 + nodeWidth, y1 + nodeHeight / 2);
    ctx1.lineTo(x2, y2 + nodeHeight / 2);
    ctx1.strokeStyle = "black";
    ctx1.lineWidth = 2;
    ctx1.stroke();

    // Draw the arrowhead
    ctx1.save();
    ctx1.translate(x2, y2 + nodeHeight / 2);
    ctx1.rotate(angle);
    ctx1.beginPath();
    ctx1.moveTo(-10, -5);
    ctx1.lineTo(0, 0);
    ctx1.lineTo(-10, 5);
    ctx1.fillStyle = "black";
    ctx1.fill();
    ctx1.restore();
  }

  // Function to draw the linked list
  function drawLinkedList(headNode) {
    let currentNode = headNode;

    while (currentNode) {
      drawNode(currentNode.data, x + 130, y + nodeSpacing);

      if (currentNode.next) {
        const nextX = x + nodeWidth + nodeSpacing;
        const nextY = y + nodeSpacing;

        drawArrow(x + 130, y + nodeSpacing + nodeHeight / 2 - 10, nextX + 130, nextY + nodeHeight / 2 - 10);

        x = nextX;
      }

      currentNode = currentNode.next;
    }
  }


  module.exports = drawLinkedList;

  // Function to draw the head pointer
  function drawHeadPointer(name, x, y, check) {
    ctx1.fillStyle = "green";
    ctx1.fillRect(x, y, nodeWidth, nodeHeight);
    ctx1.strokeRect(x, y, nodeWidth, nodeHeight);
    if (check) {
      drawArrow(x - 30, y + 25, 50 + 130, 100);
    }
    ctx1.fillStyle = "white";
    ctx1.fillText(name, x + 10, y + 20);
  }
 var i=0;

  function pushBack(step) {
    console.log(" step : ", step);
    if (step === 0) {
     // ctx1.save();
       console.log(step);
      drawHeadPointer("tmp", x - 400, y + 100, false);
     
    }
    if (step === 1) {
      drawArrow(x - 400, y + 100, x - 230, y + 100);
      console.log(step);
    }
    if (step === 2) {
      drawNode(["Value : 0", "Address: 0x000"], x - 230, y + 100);
      console.log(step);
    }
    if (step === 3) {
      drawArrow(x - 280, y + 75, x - 180, y + 45);  console.log(step);
    }
    if (step === 4) {
      ctx1.clearRect(20, 101, 159, 80);  console.log(step);
    }
    if (step === 5) {
      drawArrow(x - 400, y - 25, x - 230, y + 75);  console.log(step);
    }
    if (step === 6) {
      ctx1.clearRect(x - 400 - 5, y + 100 - 5, nodeWidth + 10, nodeHeight + 10);
      console.log(step);
    }
    if (step === 7) {
      ctx1.clearRect(x - 400, y + 100, x - 230 - 11.2, y + 100);
      console.log(step);
      // ctx1.restore();
    }
   // i++;
   
    
  }
  function pause(milliseconds) {
return new Promise(resolve => setTimeout(resolve, milliseconds));
}
  async function draw() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.save();
    // Draw the head pointer
    drawHeadPointer("Head", x, y - 50, true);

    // Draw the linked list
    drawLinkedList(node1);
    
    while (i < 8) {
       // i++;
       pushBack(i);
       if(i==7 || i==6){}
       else{
       await pause(1000); }// Pause the code for 5 seconds (5000 milliseconds)
        i++;
      
    }
   // pushBack(0);
    x = 50;
    ctx1.restore();
    //requestAnimationFrame(draw);
    // Request the next animation frame after a delay (500 milliseconds)
   
  }
var push=document.getElementById("pushFront");
  // Start the animation
  draw();