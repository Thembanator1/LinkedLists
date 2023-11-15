class Tests {
    constructor(newN, oldN) {
        this.newNodes = oldN;
        this.oldNodes = newN;
        this.Check = "false"; // Move this line to the constructor
    }
    

    testNochange() {
        var sourceNode = this.newNodes.find(node => node.name === "head");
        var sourceN = this.oldNodes.find(node => node.name === "head");
       
        if(this.newNodes.length!=this.oldNodes.length){
            return this.Check;
        }
        while (sourceNode != null) { 
            if (sourceNode.name == sourceN.name) {
                this.Check = "true";
            } else {
                this.Check = "false";
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
            sourceN = this.oldNodes.find(node => node.name === sourceN.next);
        }
       

        return this.Check;
    }
    testAdd(node){
        this.add = "false";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
        while (sourceNode != null) {
            if(sourceNode.name ==node){
                this.add = "true"; 
                break;
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
        }
        return this.add;
    }
    testRemove(node){
        this.add = "true";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
        while (sourceNode != null) {
            if(sourceNode.name ==node){
                this.add = "false"; 
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
        }
        return this.add;

    }
    testMemory(){

    }

}

export default Tests;
