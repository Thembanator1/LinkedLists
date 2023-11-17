// i.js
import Tests from './second.js';
import DoubleTests from './double.js';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const nodes = [];

var firstTest;

var toAdd = [];
var toAddback;
var toAddfront;

var ToRemove = [];
var toRemoveBack;
var toRemoveFront;
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







////Initial function to be run at the biginning
function start(){
    //We here initialise all the initial nodes 
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

//function to add a new node the user inputs on the screen
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

//Function to remove the node the user choses to delete
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



///This is the function that links the nodes the user choses to link
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

///Function that can either create or delete a node
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





//Function that will be used to then draw the line and arrow that links different nodes
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

//Function that depicts the colours of the node on click and move
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



//Function used to traverse the nodes 
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

//Function to draw the traversal links
function traversal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw traversal link 
    travLink("head");
    travLink("temp");

    // Draw traversal nodes
    travNode("head");
    travNode("temp");

}





//Main function used to create object and run tests depending on which test the user choses to test
function test(testType){

   var lastTest = [].concat(nodes);   
    let unitTest = new testType(firstTest,lastTest);
    var Nochange = unitTest.testNochange();
    var cMade =0;
    if(Nochange == "true"){
        
        alert("No changes Made");
    }

    else{
        cMade = 100;
        alert("Changes were made");
    }

    var len = toAdd.length;
    var addInt = 0;
    if(len!=0){
    for (let i = 0; i < len; i++) {
        var add = unitTest.testAdd(toAdd[i]);

        if(add == "true"){

            addInt = addInt + 1;
            
        }
    
        else{
            if(add =="true1"){
                alert("tail has not been set a previous pointer");
                addInt = addInt + 0.5;
            }
            if(add =="true2"){
                alert("previous pointer has not been added on the node");
                addInt = addInt + 0.5;
            }

            if(add =="false"){
                alert("False incorrect / no node was added"  + toAdd[i] );
            }

            
            
        }
    }
    }

    var len2 = ToRemove.length;
    var removeInt = 0;
    if(len2 !=0){
    
    for (let i = 0; i < len2; i++) {
        var remove = unitTest.testRemove(ToRemove[i]);

        if(remove == "true"){
            removeInt = removeInt + 1; 
        }
    
        else{
            if(remove =="false1"){
                alert("tail has not been set a previous pointer");
                addInt = addInt + 0.5;
            }
            else{
                alert("The node was not removed " + ToRemove[i]);
            }
            

        }
    }

    }
        var len3 = -1;
        if(toAddback != null){
        var addB = unitTest.testAddFront(toAddback);
        if(addB =="true"){
            len3 = 100;
         
        }
        else{
            if(add =="true1"){
                alert("tail has not been set a previous pointer");
                len3 = len3 + 50;
            }
            else{
                alert("False incorrect / no node was added");
                len3 = 0;
            }
            
           
        }
    }

    
        

        
        var len4 = -1;
        if(toRemoveBack != null){
        var removeB = unitTest.testRemoveBack(toRemoveBack);
        if(removeB == "true"){

            len4 = 100;
            
        }
        else{
            if(removeB=="false1"){
                alert("head does not point to the next node");
                len4 = 50;
            }
            if(removeB=="false2"){
                alert("tail does not point to the prev node");
                len4 = 50;
            }
            if(removeB=="false"){
                alert("failed to remove node");
                len4 = 0;
            }
            
            
        }

      }
    

        var len5 = -1;
        if(toAddfront != null){
        var AddNodeback = unitTest.testAddBack(toAddfront);
        
        if(AddNodeback == "true"){
            len5 = 100;
           
        }else{
            if(AddNodeback =="true1"){
             alert("failed to add a prev pointer on the node");
             len5 = 50;
            }
            if(AddNodeback =="true2"){
                alert("failed to add a prev pointer on the tail");
                len5 = 50;
               }
            if(AddNodeback =="false"){
            alert("failed to add the node at the back");
            len5 = 0;
            }
           
            
        }

    }

        var len6 = -1;
        if(toRemoveFront != null){
        
        
        var remFront = unitTest.testRemoveFront(toRemoveFront);

        if(remFront == "true"){
            len6 = 100;
        
        }else{
            if(remFront == "false1"){
                alert("Head does not lead to the next node");
                len6 = 50;

            }
            if(remFront == "false2"){
                alert("tail does not point to the prev node");
                len6 = 50;
            }
            else{
                alert("Failed to remove node");
                len6 = 0; 
            }
            len6 = 0;
          
        }
    }
    

    
    const scoreCard = document.getElementById('scoreCard');
    var AddingScore = -1;
    if(len !=0){
         AddingScore = (addInt/len) * 100;
    }

    var RemoveScore = -1;
    if(len2!=0){
        RemoveScore = (removeInt/len2) * 100;
    }
    
    
    var ChangingScore = cMade ;
    var Addingfront = len3;
    var AddingBack = len5;
    var poppingBack = len4;
    var poppingFront = len6;
 // const poppingFront = 

    // Calculate overall percentage
    const overallScore = (AddingScore + RemoveScore + ChangingScore) / 3;
  
    // Update HTML elements with calculated scores
    var scoreElement = document.getElementById('Adding-Score');
    if(AddingScore != -1){
        
        scoreElement.textContent = AddingScore+ "%";;
    }
    else{
        var AddContainer = document.getElementById('AddingContainer');
        AddContainer.style.display = 'none';
    }

    var RemoveElement = document.getElementById('Removing-Score');
    if(RemoveScore!= -1){
        RemoveElement.textContent  = RemoveScore + "%";
    }
    else{
        var RemoveContainer = document.getElementById('RemoveContainer');
        RemoveContainer.style.display = 'none';
        
    }

    var FrontElement = document.getElementById('Front-Score');
    if(Addingfront!=-1){
        FrontElement.textContent = Addingfront+ "%";;
    }
    else{
        var PufrontContainer = document.getElementById('PufrontContainer');
        PufrontContainer.style.display = 'none';
    }

    var PopElement = document.getElementById('pBack-Score');
    if(poppingBack!= -1){
        PopElement.textContent = poppingBack+ "%";;
    }
    else{
        var PobehindContainer = document.getElementById('PobehindContainer');
        PobehindContainer.style.display = 'none';
    }

    var addBackElement = document.getElementById('pushBack-Score');
    if(AddingBack != -1){
      addBackElement.textContent = AddingBack+ "%";;
    }
    else{
        var PubehindContainer = document.getElementById('PubehindContainer');
        PubehindContainer.style.display = 'none';
    }

    var popFrontElement = document.getElementById('popFront-Score');
    if(poppingFront != -1){
      popFrontElement.textContent = poppingFront+ "%";;
    }
    else{
        var PoFrontContainer = document.getElementById('PoFrontContainer');
        PoFrontContainer.style.display = 'none';
    }
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

    document.getElementById("InstructionsBtn").addEventListener("click", function () {
        window.location.href = "instructions.html";
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
        test(Tests);
    });
    document.getElementById("testBtn2").addEventListener("click", function () {
        test(DoubleTests);
    });
});

function generateQuestions() {

    // Assuming you have toAdd and toAddback arrays declared somewhere in your code

    // Get the input values
    var addValue = document.getElementById('Add').value;
    var addBackValue = document.getElementById('Addback').value;

    // Check if the values are not null before pushing
    if (addValue !== null && addValue !== "") {
        toAdd.push(addValue);
    }

    if (addBackValue !== null && addBackValue !== "") {
        toAddback =addBackValue;
    }
///////////////////////////////////////////////
    var RemoveValue = document.getElementById('Remove').value;
    var RemoveBackValue = document.getElementById('RemoveBack').value;

    if (RemoveValue !== null && RemoveValue !== "") {
        ToRemove.push(RemoveValue);
    }

    if (RemoveBackValue !== null && RemoveBackValue !== "") {
        toRemoveBack =RemoveBackValue;
    }
///////////////////////////////////////////////
    var RemoveFrontValue = document.getElementById('RemoveFront').value;
    var AddBackValue = document.getElementById('AddingtoBack').value;

    if (RemoveFrontValue !== null && RemoveFrontValue !== "") {
        toRemoveFront = RemoveFrontValue;
    }

    if (AddBackValue !== null && AddBackValue !== "") {
        toAddfront =AddBackValue;
    }

     

  
}
//Function to switch on and off the Questions card-card 
function ToggleOn() {
    var loginCard = document.getElementById('loginCard');
    loginCard.style.display = (loginCard.style.display === 'none' || loginCard.style.display === '') ? 'block' : 'none';
}
//function to switch on and off the score card
function toggleScoreCard() {
    const scoreCard = document.getElementById('scoreCard');
    const overlay = document.getElementById('overlay');
    scoreCard.style.display = scoreCard.style.display === 'none' ? 'block' : 'none';
   
  }