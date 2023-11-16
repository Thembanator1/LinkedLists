const canvas = document.getElementById("linkedListCanvas");
const ctx = canvas.getContext("2d");


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

        x += 80;

        // Reset highlighting
        current.highlighted = false;
        current.traversed = false;

        current = current.next;
    }
}
// Define a function to draw a triangle (unchanged)
function drawTriangle(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y + 5);
    ctx.lineTo(x + 10, y - 5);
    ctx.closePath();
    ctx.fill();
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

    popAtIndex(i) {
        if (!this.head || i < 0 || i >= this.size) return;

        if (i === 0) {
            // Special case: Removing the head node
            this.head.highlighted = true; // Highlight the head node
            drawLinkedList();
            setTimeout(() => {
                this.head = this.head.next;
                drawLinkedList();
                this.size--; // Decrement the size
            }, 1000); // Delay for 1 second before deletion
            return;
        }

        let current = this.head;
        let previous = null;
        let currentIndex = 0;

        const traverseAndHighlight = () => {
            if (currentIndex === i) {
                // Highlight the node to be deleted in red
                current.highlighted = true;
                drawLinkedList();
                setTimeout(() => {
                    previous.next = current.next;
                    drawLinkedList();
                    this.size--; // Decrement the size
                }, 1000); // Delay for 1 second before deletion
                return;
            }

            if (current) {
                current.traversed = true; // Highlight the current node in green
                drawLinkedList();
                setTimeout(() => {
                    current.traversed = false; // Reset traversal highlighting for this node
                    traverseAndHighlight(); // Continue traversal
                }, 500); // Delay for 0.5 seconds before moving to the next node
                previous = current;
                current = current.next;
                currentIndex++;
            } else {
                // If the index is out of bounds, reset highlighting
                drawLinkedList();
            }
        };

        // Start traversal
        traverseAndHighlight();
    }
    basicPopBack() {
        if (!this.head || this.size === 0) return; // Empty list
    
        if (this.size === 1) {
            // Special case: Only one element in the list
            this.head = null;
        } else {
            let current = this.head;
            let previous = null;
    
            while (current.next) {
                previous = current;
                current = current.next;
            }
    
            // Now 'current' points to the last element, and 'previous' to the second-to-last
            previous.next = null;
        }
    
        this.size--; // Decrement the size
        drawLinkedList(); // Update the visualization
    }
    

    popBack() {
        var steps = popBackSteps;
        var totalSteps = steps.length;
        console.log(steps.length)
        let currentStep = 0;
        let current = this.head;
        let previous = null;

        if(this.size === 1){//If the Head is the Tail
            steps = popBackSteps2;
            const executeNextStep = () => {
                const step = steps[0];
                highlightLine(step.index);
                showExplanation(step.index, step.explanation);
                //Delay 5 seconds so first explanation appears long enough
                setTimeout(() => {
                    const step = steps[1];
                    highlightLine(step.index);
                    showExplanation(step.index, step.explanation);
                    
                }, 3000);
                setTimeout(() => {
                    const step = steps[2];
                    highlightLine(step.index);
                    showExplanation(step.index, step.explanation);
                    this.basicPopBack();
                    
                }, 6000);
                /*
                setTimeout(() => {
                    const step = steps[3];
                    highlightLine(step.index);
                    showExplanation(step.index, step.explanation);
                    
                }, 8000);
                
                setTimeout(() => {
                    const step = steps[4];
                    highlightLine(step.index);
                    showExplanation(step.index, step.explanation);
                    
                }, 8000);*/
                
            };
            executeNextStep(); //execute
        }else{

            const traverseAndHighlight = () => {
                if (current) {
                    current.traversed = true; // Highlight the current node in green
                    drawLinkedList();
                    setTimeout(() => {
                        current.traversed = false; // Reset traversal highlighting for this node
                        if (current.next) {
                            previous = current;
                            current = current.next;
                            traverseAndHighlight(); // Continue traversal
                        } else {
                            // If the traversal is complete, set the last node as red
                            current.highlighted = true;
                            drawLinkedList();
                            
                        }
                    }, 500); // Delay for 0.5 seconds before moving to the next node
                }
            };
    
            const step = steps[0];
            highlightLine(step.index);
            showExplanation(step.index, step.explanation);
            setTimeout(() => {
                traverseAndHighlight(); 
                const step = steps[1];
                highlightLine(step.index);
                showExplanation(step.index, step.explanation);
            }, 4000);
            setTimeout(() => {
                let step = steps[2];
                highlightLine(step.index);
                showExplanation(step.index, step.explanation);
                this.basicPopBack();
            }, 8000);
            setTimeout(() => {
                const step = popBackSteps2[4];
                highlightLine(step.index);
                showExplanation(step.index, step.explanation);
                
            }, 12000);

        }
        
    }
    popFront() {
        const steps = popFrontSteps; // Use the same steps for highlighting
        const totalSteps = steps.length;
        let currentStep = 0;
        let current = this.head;
        let previous = null;
    
    
        const executeNextStep = () => {
            const step = steps[0];
            highlightLine(step.index);
            showExplanation(step.index, step.explanation);
            // Delay 2 seconds per explanation
            setTimeout(() => {
                if (currentStep < 3) {
                    currentStep++; //u i think know I complicated this code, but this make currentStep ==1
                    if (currentStep === 1) {
                        // When at the second explanation, perform traversal with green and red highlighting
                        const step = steps[currentStep];
                        highlightLine(step.index);
                        showExplanation(step.index, step.explanation);
                        currentStep++;
                    }
                    if (currentStep === 2) { // code-line: delete tmp;
                        setTimeout(() => {
                            const step = steps[currentStep];
                            highlightLine(step.index);
                            showExplanation(step.index, step.explanation);
                            this.popAtIndex(0);
                        }, 2000);
                    }
                }
            }, 2000);
        };
    
        // Start the code trace animation
        executeNextStep();
    } 
    
}

const linkedList = new LinkedList(); // Create an instance of the linked list
function keepPanelOpen(){
    var sidePanel = document.getElementById("mySidepanel");
    var openButton = document.querySelector(".open-button");
    
    sidePanel.style.width = "490px";
    openButton.classList.add("active");    
}
const popFrontButton = document.getElementById("popFrontButton");
popFrontButton.addEventListener("click", () => {
    displayPopFrontCode(); 
    keepPanelOpen();
    linkedList.popFront();
});

const popBackButton = document.getElementById("popBackButton");
popBackButton.addEventListener("click", () => {
    displayPopBackCode();
    keepPanelOpen();
    linkedList.popBack();
});

const popButton = document.getElementById("popButton");
popButton.addEventListener("click", () => {
    // Get the index from the input field
    const indexInput = document.getElementById("indexInput");
    const index = parseInt(indexInput.value, 10); // Parse the input as an integer
    
    // Call the popAtIndex method with the specified index
    linkedList.popAtIndex(index);
});

// Initial visualization
linkedList.pushFront("F");
linkedList.pushFront("E");
linkedList.pushFront("D");
linkedList.pushFront("C");
linkedList.pushFront("B");
linkedList.pushFront("A");

drawLinkedList();

const popBackSteps = [
    {
        index: 7, //code line 7
        explanation: 'Our traversal will be looking 2 steps ahead.',
    },
    {
        index: 8, //line 8
        explanation: 'Move to the next node so long as while loop is satisfied, (i.e. the 2nd node ahead of us is NOT the last)',
    },
    {
        index: 10, //line 10
        explanation: 'Condition broken, the node ahead is the last(points to null), lets delete it!',
    }

];

const popBackSteps2 = [ // fighting a bug
    {
        index: 2, 
        explanation: 'The heads next pointer is set to nullptr, implying the head is also the tail.',
    },
    {
        index: 3, 
        explanation: 'So we call pop_front() and delete the node.',
    },
    {
        index: 4, 
        explanation: 'We return and finish execution.',
    },
    {
        index: 10, 
        explanation: 'The next pointer of the node we are currently on (tmp) Still points to where the deleted node was, so we set it to nullptr;',
    },
    {
        index: 11, 
        explanation: 'The next pointer of the node we are currently on (tmp) Still points to where the deleted node was, so we set it to nullptr;',
    },

];

const popFrontSteps = [
    {
        index: 2, //code line 7
        explanation: 'Create a temporary pointer, tmp now points to what the Head is pointing to. Its like "keeping record" of where head is pointing.',
    },
    {
        index: 3, //line 8
        explanation: 'We update the head pointer, head now points to the next thing in the list.',
    },
    {
        index: 4, //line 10
        explanation: 'We no longer need the old head because its not the first item in the list anymore. So, we delete it to free up memory',
    },
];
