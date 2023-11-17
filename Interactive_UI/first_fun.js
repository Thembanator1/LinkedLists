
const nodes = [];



function start(nodes){

    const temp = { x: 100, y: 500, name: "temp", next: null, prev: null };
    nodes.push(temp);

    const head = { x: 100, y: 100, name: "head", next: "tail", prev: null };
    nodes.push(head);

    const tail = { x: 300, y: 200, name: "tail", next: null, prev: null };
    nodes.push(tail);

    return nodes;
}

function addRandomNode(nodes, nodeName) {

    if (!nodeName) return nodes;

    // Check if a node with the same name already exists
    if (nodes.some(node => node.name === nodeName)) {
        return nodes;
    }

    const node = { x: 300, y: 500, name: nodeName, next: null, prev: null };
    nodes.push(node);

    const tempNode = nodes.find(node => node.name === "temp");
    tempNode.next = nodeName;

    return nodes; // Return the modified nodes array
}


function deleteNode(nodes, selectedNode) {
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

        const updatedNodes = nodes.filter(node => node.name !== selectedNode.name);
        return updatedNodes; // Return the modified nodes array
    }
    else {
        return nodes;
    }
}




function link(node, nodeName){
    var link;

    if (!node){
        if (nodeName==="null") {
            link = null;
        }
        else {
            return 1;
        }
    }
    else {
        link = node.name;
    }

    return link;
}

function updateLink(nodes,sourceNodeName,nextNodeName,prevNodeName) {

    if (!sourceNodeName || !nextNodeName || !prevNodeName) {
        return  nodes;
    }

    // Check if the source and target nodes exist
    const sourceNode = nodes.find(node => node.name === sourceNodeName);
    const nextNode = nodes.find(node => node.name === nextNodeName);
    const prevNode = nodes.find(node => node.name === prevNodeName);

    if (!sourceNode) {
        return nodes;
    }

    var nextLink = link(nextNode, nextNodeName);
    var prevLink = link(prevNode, prevNodeName);

    if (nextLink==1 || prevLink==1){
        return nodes;
    }

    sourceNode.next = nextLink;
    sourceNode.prev = prevLink;

    return nodes;
}



module.exports = {start, addRandomNode, deleteNode, link, updateLink};
