// script.js

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Array to store nodes and their positions
const nodes = [];

// Array to store links between nodes
let links = [];

// Variable to keep track of the selected node
let selectedNode = null;

// Event listener for the "Add Node" button
document.getElementById("addNodeButton").addEventListener("click", addNode);

// Event listener for the "Link Nodes" button
document.getElementById("linkNodesButton").addEventListener("click", linkNodes);

// Event listener for the "Delete Node" button
document.getElementById("deleteNodeButton").addEventListener("click", deleteSelectedNode);

// Event listener for canvas click to select/deselect nodes
canvas.addEventListener("click", selectNode);

// Function to add a new node
function addNode() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const nodeName1 = document.getElementById("nodeName1").value;
    const nodeName2 = document.getElementById("nodeName2").value;

    nodes.push({ x, y, nodeName1, nodeName2 });
    drawNodes();
}

// Function to link nodes
function linkNodes() {
    const nodeName1 = document.getElementById("nodeName1").value;
    const nodeName2 = document.getElementById("nodeName2").value;

    const node1 = nodes.find(node => node.nodeName1 === nodeName1 || node.nodeName2 === nodeName1);
    const node2 = nodes.find(node => node.nodeName1 === nodeName2 || node.nodeName2 === nodeName2);

    if (node1 && node2) {
        links.push({ node1, node2 });
        drawNodes();
    }
}

// Function to select/deselect nodes on canvas click
function selectNode(e) {
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
            drawNodes();
            break;
        }
    }
}

// Function to delete the selected node
function deleteSelectedNode() {
    if (selectedNode) {
        // Remove the selected node and associated links
        const index = nodes.indexOf(selectedNode);
        nodes.splice(index, 1);
        links = links.filter(link => link.node1 !== selectedNode && link.node2 !== selectedNode);
        selectedNode = null;
        drawNodes();
    }
}

// Function to draw nodes and their connections on the canvas
function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = selectedNode === node ? "red" : "#007bff";
        ctx.fill();
        ctx.closePath();

        ctx.font = "12px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText(node.nodeName1, node.x - 15, node.y - 25);
        ctx.fillText(node.nodeName2, node.x - 15, node.y + 15);
    });

    // Draw connections between nodes
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.node1.x, link.node1.y);
        ctx.lineTo(link.node2.x, link.node2.y);
        ctx.stroke();
        ctx.closePath();
    });
}

// Initial canvas drawing
drawNodes();
