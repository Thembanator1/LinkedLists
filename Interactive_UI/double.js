class DoubleTests {
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
        var Tailcheck = this.newNodes.find(node => node.name === "head");
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
        while (sourceNode != null) {

            if(sourceNode.name ==node){

                if(sourceNode.prev!=null){
                    while(Tailcheck.name !="tail" ){
                       Tailcheck = this.newNodes.find(node => node.name === Tailcheck.next);
                    }
                    if(Tailcheck.prev !=null){
                        this.add = "true";
                    }
                    else{
                        this.add = "true1";
                    }
                    
                }
                else{
                    this.add = "true2";
                }
                
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
        var Tailcheck = this.newNodes.find(node => node.name === "head");
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
       else{

        sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
            if(sourceNode.name ==node){
                if(sourceNode.prev =="head"){
                    while(Tailcheck.name !="tail" ){
                        Tailcheck = this.newNodes.find(node => node.name === Tailcheck.next);
                     }
                     if(Tailcheck.prev !=null){
                         this.add = "true";
                     }
                     else{
                         this.add = "true1";
                     }
                      
                }
                
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
            if(sourceNode.name!="head" && sourceNode.prev==null){
                this.add = "false1";
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

            if(sourceNode.next =="tail"){
                var curr = sourceNode.next;
                if(curr.prev ==null){
                    this.add = "false1";  
                }
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
        var Tailcheck = this.newNodes.find(node => node.name === "head");

        if(sourceNode.next==null){
            this.add = "false1";
            return this.add;
        }
        if(this.newNodes.length==this.oldNodes.length){
            return this.add;
        }
       else{
        sourceNode = this.newNodes.find(node => node.name === sourceNode.next);
            if(sourceNode.name ==node){
                this.add = "false";  
            }
            else{
                while(Tailcheck.name !="tail" ){
                    Tailcheck = this.newNodes.find(node => node.name === Tailcheck.next);
                 }
                 if(Tailcheck.prev !=null){
                     this.add = "false2";
                 }
                 
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
                
                if(sourceNode.prev!=null && temp.prev ==node){
                    
                    this.add = "true"; 
                }
                else{
                    if(sourceNode.prev==null){
                        this.add = "true1"; 
                    }
                    else{
                        this.add = "true2";
                    }
                }
               
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
    

}
//Here we export the class to be used as an object
export default DoubleTests;