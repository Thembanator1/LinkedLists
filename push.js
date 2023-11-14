const canvas = document.getElementById("linkedListCanvas");
const ctx = canvas.getContext("2d");

let lastNodeX = 0;
let lastNodeY = 0;

function drawLinkedList() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let current = linkedList.head;
    let x = 50;
    const y = 200;
    const nodeWidth = 40;
    const nodeHeight = 20;

    while (current) {
        ctx.fillStyle = current.traversed ? "green" : (current.highlighted ? "red" : "black");
        ctx.strokeRect(x, y, nodeWidth, nodeHeight);
        ctx.fillText(current.value.toString(), x + 10, y + 15);

        if (current.next) {
            // Draw an arrow with a triangle at the end
            const startX = x + nodeWidth;
            const startY = y + nodeHeight / 2;
            const endX = startX + 30; // Adjust this for arrow length
            const endY = startY;
            drawArrowWithTriangle(ctx, startX, startY, endX + 10, endY);
        }
        
        lastNodeX = x;
        lastNodeY = y;
        

        x += 80;

        // Reset highlighting
        current.highlighted = false;
        current.traversed = false;

        current = current.next;
    }
    
}

// Define a function to draw an arrow with a triangle (unchanged)
function drawArrowWithTriangle(ctx, startX, startY, endX, endY) {
    // Draw the arrow line from start to end (unchanged)
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();

    // Calculate the angle of the arrow (unchanged)
    const angle = Math.atan2(endY - startY, endX - startX);

    // Draw the arrowhead as a triangle (unchanged)
    const arrowLength = 10; // Adjust this for the desired arrowhead size
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
        endX - arrowLength * Math.cos(angle - Math.PI / 6),
        endY - arrowLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        endX - arrowLength * Math.cos(angle + Math.PI / 6),
        endY - arrowLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
}

function showExplanation(index, text) {
    explanationBox.innerHTML = `<p><strong>Line ${index}:</strong> ${text}</p>`;
}

// Define the linked list data structure
class Link {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.highlighted = false; // Added property to track highlighting

        this.traversed = false; // Add a property to track traversal highlighting
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0; // Initialize the size to 0
    }

    pushFront(value) {
        const newLink = new Link(value);
        newLink.next = this.head;
        this.head = newLink;
        this.size++; // Increment the size
    }
    pushBack(value) {
        const newLink = new Link(value);

        if (!this.head) {
            // If the list is empty, the new node becomes the head
            this.head = newLink;
        } else {
            let current = this.head;

            // Traverse the list to find the last node
            while (current.next) {
                current = current.next;
            }

            // Add the new node after the last node
            current.next = newLink;
        }

        this.size++; // Increment the size
    }
    
}

const linkedList = new LinkedList(); // Create an instance of the linked list
function keepPanelOpen(){
    var sidePanel = document.getElementById("mySidepanel");
    var openButton = document.querySelector(".open-button");
    
    sidePanel.style.width = "600px";
    openButton.classList.add("active");    
}

const pushFrontButton = document.getElementById("pushFrontButton");
pushFrontButton.addEventListener("click", () => {
    // Get the index from the input field
    const stringValue = String(document.getElementById("pushFrontInput").value);
    const index = parseInt(indexInput.value, 10); // Parse the input as an integer
    
    // Call the popAtIndex method with the specified index
    //drawForwardLinkedList();
    linkedList.pushFront(stringValue);
    drawFNode(stringValue)
    //drawLinkedList();
    drawForwardLinkedList();
    
    setTimeout(() => {
        drawLinkedList();
    }, 2000);
});


function drawFNode(val) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawForwardLinkedList();
    let x = 50;
    const y = 200 -50;
    const nodeWidth = 40;
    const nodeHeight = 20;
    ctx.strokeRect(x, y, nodeWidth, nodeHeight);
    ctx.fillText(val, x + 10, y + 15);

    // Draw an arrow with a triangle at the end
    const startX = x + nodeWidth;
    const startY = y + nodeHeight / 2;
    const endX = startX + 30; // Adjust this for arrow length
    const endY = startY;
    //drawArrowWithTriangle(ctx, startX, startY, endX + 10, endY);


}
function drawForwardLinkedList() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    let current = linkedList.head.next;
    let x = 50+80;
    const y = 200;
    const nodeWidth = 40;
    const nodeHeight = 20;

    while (current) {
        ctx.fillStyle = current.traversed ? "green" : (current.highlighted ? "red" : "black");
        ctx.strokeRect(x, y, nodeWidth, nodeHeight);
        ctx.fillText(current.value.toString(), x + 10, y + 15);

        if (current.next) {
            // Draw an arrow with a triangle at the end
            const startX = x + nodeWidth;
            const startY = y + nodeHeight / 2;
            const endX = startX + 30; // Adjust this for arrow length
            const endY = startY;
            drawArrowWithTriangle(ctx, startX, startY, endX + 10, endY);
        }

        x += 80;

        // Reset highlighting
        current.highlighted = false;
        current.traversed = false;

        current = current.next;
    }
}

// Initial visualization
linkedList.pushFront("F");
linkedList.pushFront("E");
linkedList.pushFront("D");
linkedList.pushFront("C");
linkedList.pushFront("B");
linkedList.pushFront("A");
linkedList.pushBack(1);
linkedList.pushBack(2);
drawLinkedList();

const pushBackButton = document.getElementById("pushBackButton");
pushBackButton.addEventListener("click", () => {
    displayPushBackCode(); 
    keepPanelOpen();
    const stringValue = String(document.getElementById("pushBackInput").value);

        /*****traverseBack()********/
    let current = linkedList.head;
    let size = linkedList.size;
    const traverseAndHighlight = () => {
        if (current) {
            current.highlighted = true; // Highlight the current node in red
            drawLinkedList();
            setTimeout(() => {
                current.traversed = false; // Reset traversal highlighting for this node
                if (current.next) {
                    previous = current;
                    current = current.next;
                    traverseAndHighlight(); // Continue traversal
                } else {
                    current.traversed = true; // Highlight the Last node in green
                    drawLinkedList();
                    
                }
            }, 500); // Delay for 0.5 seconds before moving to the next node
        }
    };
    traverseAndHighlight();
    
    setTimeout(() => {
        visualPushBack(stringValue);
    }, 5000);// wait 5 seconds for Traverse to finish

});

function visualPushBack(val) {
    let x = 50;
    const y = 200;
    const nodeWidth = 40;
    const nodeHeight = 20;

    // Draw an arrow with a triangle at the end
    const startX = lastNodeX + nodeWidth;
    const startY = lastNodeY + nodeHeight / 2;
    const endX = startX + 30; // Adjust this for arrow length
    const endY = startY;
    //drawArrowWithTriangle(ctx, startX, startY, endX + 10, endY);/*10 is arrowHead overhead value*/
    ctx.strokeRect(endX+10, endY-50, nodeWidth, nodeHeight);
    ctx.fillText(val, endX + 25, endY-35);

    setTimeout(() => {
        drawLinkedList();
        ctx.strokeRect(endX+10, y, nodeWidth, nodeHeight);
        ctx.fillText(val, endX + 25, y+15);

        linkedList.pushBack(val);
        setTimeout(() => {
            drawLinkedList();
        }, 2000);
    
    }, 2000);


}
console.log(lastNodeX)
/*
// After the loop, you can use lastNodeX and lastNodeY for the standalone node
const arrowLength = 30;
const standaloneNodeX = lastNodeX + arrowLength;
const standaloneNodeY = lastNodeY;

// Draw standalone node
ctx.strokeRect(standaloneNodeX, standaloneNodeY, nodeWidth, nodeHeight);
ctx.fillText("New Node", standaloneNodeX + 10, standaloneNodeY + 15);*/