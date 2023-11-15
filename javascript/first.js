// i.js
import Tests from './second.js';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const nodes = [];

var firstTest;

var toAdd = [];

var ToRemove = [];

let selectedNode = null;

start();
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

canvas.addEventListener("mousedown", function (e) {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Check if a node is clicked
    for (const node of nodes) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 20) {
            if (selectedNode === node) {
                // Toggle selection off
                selectedNode = null;
            } else {
                // Select the clicked node
                selectedNode = node;
            }
            break;
        }
    }

    traversal();
});

canvas.addEventListener("mousemove", function (e) {
    if (selectedNode) {
        selectedNode.x = e.clientX - canvas.getBoundingClientRect().left;
        selectedNode.y = e.clientY - canvas.getBoundingClientRect().top;
        traversal();
    }
});








function start(){

    const temp = { x: 100, y: canvas.height - 100, name: "temp", next: null, prev: null };
    nodes.push(temp);

    const head = { x: 100, y: 100, name: "head", next: "tail", prev: null };
    nodes.push(head);

    const tail = { x: 300, y: 200, name: "tail", next: null, prev: null };
    nodes.push(tail);

    //const null0 = { x: canvas.width - 60, y: 60, name: "null", next: null };
    //nodes.push(null0);

    firstTest = [].concat(nodes);    
    traversal();
}

function addRandomNode() {
    const nodeName = document.getElementById("nodeName").value;

    if (!nodeName) return;

    // Check if a node with the same name already exists
    if (nodes.some(node => node.name === nodeName)) {
        alert("A node with the same name already exists.");
        return;
    }

    const node = { x: 300, y: canvas.height - 100, name: nodeName, next: null, prev: null };
    nodes.push(node);

    const tempNode = nodes.find(node => node.name === "temp");
    tempNode.next = nodeName;
    traversal();
}


function deleteNode() {
    if (selectedNode) {
        // Remove the selected node and associated links
        const prevNode = nodes.find(node => node.next === selectedNode.name);
        const nextNode = nodes.find(node => node.prev === selectedNode.name);

        if (prevNode){
            prevNode.next = null;
        }
        if (nextNode){
            nextNode.prev = null;
        }

        nodes.splice(nodes.indexOf(selectedNode), 1);
        selectedNode = null;
        traversal();
    }
}




function link(node, nodeName){
    var link;

    if (!node){
        if (nodeName==="null") {
            link = null;
        }
        else {
            alert("Next node does not exist.");
            return 1;
        }
    }
    else {
        link = node.name;
    }

    return link;
}

function updateLink() {
    const sourceNodeName = document.getElementById("sourceNode").value;
    const nextNodeName = document.getElementById("nextNode").value;
    const prevNodeName = document.getElementById("prevNode").value;

    if (!sourceNodeName || !nextNodeName || !prevNodeName) {
        alert("Please enter source, next and prev node names.");
        return;
    }

    // Check if the source and target nodes exist
    const sourceNode = nodes.find(node => node.name === sourceNodeName);
    const nextNode = nodes.find(node => node.name === nextNodeName);
    const prevNode = nodes.find(node => node.name === prevNodeName);

    if (!sourceNode) {
        alert("Source node does not exist.");
        return;
    }

    var nextLink = link(nextNode, nextNodeName);
    var prevLink = link(prevNode, prevNodeName);

    if (nextLink==1 || prevLink==1){
        return;
    }

    sourceNode.next = nextLink;
    sourceNode.prev = prevLink;
    traversal();
}






function drawLine(colour, sourceNode, targetNode){
    if (sourceNode && targetNode) {
        // Calculate the angle between source and target nodes
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const angle = Math.atan2(dy, dx);

        // Draw the link line
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = "black";  // Link color
        ctx.stroke();

        // Draw an arrowhead at the target node
        const arrowSize = 10;
        const arrowX = targetNode.x - 20 * Math.cos(angle);
        const arrowY = targetNode.y - 20 * Math.sin(angle);
        ctx.fillStyle = colour;  // Arrow color
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - arrowSize * Math.cos(angle - Math.PI / 6), arrowY - arrowSize * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(arrowX - arrowSize * Math.cos(angle + Math.PI / 6), arrowY - arrowSize * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }
}

function drawNode(sourceNode){
    
    ctx.beginPath();           
    ctx.arc(sourceNode.x, sourceNode.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = selectedNode === sourceNode ? "red" : "blue";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";  // Center the text horizontally
    ctx.textBaseline = "middle";  // Center the text vertically
    ctx.fillText(sourceNode.name, sourceNode.x, sourceNode.y);  
}






function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw links
    for (const sourceNode of nodes) {
        var targetNode = nodes.find(node => node.name === sourceNode.next);
        drawLine("green", sourceNode, targetNode);

        targetNode = nodes.find(node => node.name === sourceNode.prev);
        drawLine("red", sourceNode, targetNode);
    }

    // Draw nodes
    for (const sourceNode of nodes) {
        drawNode(sourceNode);
    }
}




function travLink(start){

    var sourceNode = nodes.find(node => node.name === start);
    while (sourceNode!=null) {

        var targetNode = nodes.find(node => node.name === sourceNode.next);
        drawLine("green", sourceNode, targetNode);

        targetNode = nodes.find(node => node.name === sourceNode.prev);
        drawLine("red", sourceNode, targetNode);

        sourceNode = nodes.find(node => node.name === sourceNode.next);
        if (sourceNode==null){break;}
        if (sourceNode.name===start){break;}
    }
}

function travNode(start){
    var sourceNode = nodes.find(node => node.name === start);
    while (sourceNode!=null) {

        drawNode(sourceNode);
        sourceNode = nodes.find(node => node.name === sourceNode.next);

        if (sourceNode==null){break;}
        if (sourceNode.name===start){break;}
    }
}

function traversal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw traversal link 
    travLink("head");
    travLink("temp");

    // Draw traversal nodes
    travNode("head");
    travNode("temp");

}






function test(){
   var lastTest = [].concat(nodes);   
    let unitTest = new Tests(firstTest,lastTest);
    var Nochange = unitTest.testNochange();

    if(Nochange == "true"){
        alert("No changes Made");
    }

    else{
        alert("Changes were made");
    }

    var len = toAdd.length;
    var addInt = 0;

    for (let i = 0; i < len; i++) {
        var add = unitTest.testAdd(toAdd[i]);

        if(add == "true"){

            addInt = addInt + 1;
            
        }
    
        else{

            alert("False incorrect / no node was added"  + toAdd[i] );
            
        }
    }
    var len2 = ToRemove.length;
    var removeInt = 0;
    for (let i = 0; i < len2; i++) {
        var remove = unitTest.testRemove(ToRemove[i]);

        if(remove == "true"){

            removeInt = removeInt + 1; 
           

        }
    
        else{

            alert("The node was not removed" + ToRemove[i]);

        }
    }
    const scoreCard = document.getElementById('scoreCard');
    const AddingScore = (addInt/len) * 100;
    const RemoveScore = (removeInt/len2) * 100;
    const ChangingScore = 100;
  
    // Calculate overall percentage
    const overallScore = (AddingScore + RemoveScore + ChangingScore) / 3;
  
    // Update HTML elements with calculated scores
    document.getElementById('Adding-Score').textContent = AddingScore;
    document.getElementById('Removing-Score').textContent = RemoveScore;
    document.getElementById('Changing-Score').textContent = ChangingScore;
    scoreCard.style.display = scoreCard.style.display = 'block';
}

traversal();




document.addEventListener("DOMContentLoaded", function () {
     // Function to handle "Creating questions" button click
     
     document.getElementById("toggleButton").addEventListener("click", function () {
        ToggleOn();
    });

    document.getElementById("close").addEventListener("click", function () {
        toggleScoreCard();
    });

    document.getElementById("loginButton").addEventListener("click", function () {
        generateQuestions();
    });
     // Add click event listener to the button

    // Function to handle "Add Node" button click
    document.getElementById("addNodeBtn").addEventListener("click", function () {
        addRandomNode();
    });

    // Function to handle "Update Link" button click
    document.getElementById("updateLinkBtn").addEventListener("click", function () {
        updateLink();
    });

    // Function to handle "Delete Node" button click
    document.getElementById("deleteNodeBtn").addEventListener("click", function () {
        deleteNode();
    });

    // Function to handle "Memory" button click
    document.getElementById("drawBtn").addEventListener("click", function () {
        draw();
    });

    // Function to handle "Test" button click
    document.getElementById("testBtn").addEventListener("click", function () {
        test();
    });
});

function generateQuestions() {

     toAdd.push(document.getElementById('Add').value);

     ToRemove.push(document.getElementById('Remove').value);

  
}

function ToggleOn() {
    var loginCard = document.getElementById('loginCard');
    loginCard.style.display = (loginCard.style.display === 'none' || loginCard.style.display === '') ? 'block' : 'none';
}

function toggleScoreCard() {
    const scoreCard = document.getElementById('scoreCard');
    const overlay = document.getElementById('overlay');
    scoreCard.style.display = scoreCard.style.display === 'none' ? 'block' : 'none';
   
  }