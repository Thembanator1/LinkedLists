const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const nodes = [];
const links = [];

let selectedNode = null;

function addRandomNode() {
    const nodeName = document.getElementById("nodeName").value;
    if (!nodeName) return;

    // Check if a node with the same name already exists
    if (nodes.some(node => node.name === nodeName)) {
        alert("A node with the same name already exists.");
        return;
    }

    const node = { x: getRandomInt(20, canvas.width - 20), y: getRandomInt(20, canvas.height - 20), name: nodeName };
    nodes.push(node);
    draw();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addLink() {
    const sourceNodeName = document.getElementById("sourceNode").value;
    const targetNodeName = document.getElementById("targetNode").value;

    if (!sourceNodeName || !targetNodeName) {
        alert("Please enter both source and target node names.");
        return;
    }

    // Check if the source and target nodes exist
    const sourceNode = nodes.find(node => node.name === sourceNodeName);
    const targetNode = nodes.find(node => node.name === targetNodeName);

    if (!sourceNode || !targetNode) {
        alert("Source and/or target node does not exist.");
        return;
    }

    const link = { source: sourceNode.name, target: targetNode.name };
    links.push(link);
    draw();
}

function deleteNode() {
    if (selectedNode) {
        // Remove the selected node and associated links
        nodes.splice(nodes.indexOf(selectedNode), 1);
        links.splice(links.findIndex(link => link.source === selectedNode.name || link.target === selectedNode.name), 1);
        selectedNode = null;
        draw();
    }
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

    draw();
});

canvas.addEventListener("mousemove", function (e) {
    if (selectedNode) {
        selectedNode.x = e.clientX - canvas.getBoundingClientRect().left;
        selectedNode.y = e.clientY - canvas.getBoundingClientRect().top;
        draw();
    }
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw links
    for (const link of links) {
        const sourceNode = nodes.find(node => node.name === link.source);
        const targetNode = nodes.find(node => node.name === link.target);
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
            ctx.fillStyle = "red";  // Arrow color
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - arrowSize * Math.cos(angle - Math.PI / 6), arrowY - arrowSize * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(arrowX - arrowSize * Math.cos(angle + Math.PI / 6), arrowY - arrowSize * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();
        }
    }

    // Draw nodes
    for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = selectedNode === node ? "red" : "blue";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";  // Center the text horizontally
        ctx.textBaseline = "middle";  // Center the text vertically
        ctx.fillText(node.name, node.x, node.y);
    }
}

draw();