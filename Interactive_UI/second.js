class Tests {
    constructor(newN, oldN) {
        this.newNodes = oldN;
        this.oldNodes = newN;
        this.Check = "false"; // Move this line to the constructor
    }
    
    ///Function to test is changes where made on the nodes
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
                break;
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
            sourceN = this.oldNodes.find(node => node.name === sourceN.next);
        }
       

        return this.Check;
    }
    //Function to check if node has been added to the linkedlist
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
    ////function to check if node has been added to the front of the linkedlist
    testAddFront(node){
        this.add = "false";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
       else{

        sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
            if(sourceNode.name ==node){
                this.add = "true";  
            }
           
        }
        return this.add;
    }
    ////Function to check if the node has been removed from the linkedlist
    testRemove(node){
        this.add = "true";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        
        while (sourceNode != null) {
            if(sourceNode.name ==node){
                this.add = "false"; 
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
        }
        return this.add;

    }
    /////Function to check if pop back has been done correctly
    testRemoveBack(node){
        this.add = "true";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        var temp = this.newNodes.find(node => node.name === sourceNode.next);

        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
        while (sourceNode != null) {
            if(sourceNode.name ==node && temp.name =="tail"){
                this.add = "false"; 
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);

            if(sourceNode != null){            
            if(sourceNode.name!="tail"){
             temp = this.newNodes.find(node => node.name === sourceNode.next);
            }
        }
            
        }
        return this.add;

    }
    /////Function to check if pop front has been done correclty
    testRemoveFront(node){

        this.add = "true";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
       else{
        sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
            if(sourceNode.name ==node){
                this.add = "false";  
            }
           
        }
        return this.add;

    }
    ///Function to check if push front has been done correctly
   testAddBack(node){
    this.add = "false";
        var sourceNode = this.newNodes.find(node => node.name === "head");
        var temp = this.newNodes.find(node => node.name === sourceNode.next);

        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
        while (sourceNode != null) {
            if(sourceNode.name ==node && temp.name =="tail"){
                this.add = "true"; 
            }
            sourceNode = this.newNodes.find(node => node.name === sourceNode.next);

            if(sourceNode != null){            
            if(sourceNode.name!="tail"){
             temp = this.newNodes.find(node => node.name === sourceNode.next);
            }
        }
            
        }
        return this.add;

   }
    
    testMemory(){

    }

}
//Here we export the class to be used as an object
export default Tests;