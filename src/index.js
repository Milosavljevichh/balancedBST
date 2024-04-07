function Node(data,leftChild, rightChild){
    return {
        data: data,
        leftChild: leftChild,
        rightChild:rightChild
    }
};

function Tree(){
    return{//root uses the return value of buildTree func
      buildTree: function(arr, start, end){
        //should return lvl0 root node
    
        let mid = Math.floor((start + end) / 2);
    
        //base case for exiting out of recursion
        if (start > end) return null;
    
        //sets the middle element of the array as the root
        let root = arr[mid];
    
        //finds the middle element of the left half of the array and sets it as root
        let leftChild = this.buildTree(arr, start, mid-1);
    
        //does the same for the right half of the array
        let rightChild = this.buildTree(arr, mid+1, end);
        let node = Node(root, leftChild, rightChild);
    
        //prints out a visual representation of the tree
        prettyPrint(node)
        console.log(' ')
        return node;
      },
      root: function(arr, st, en){
        let root = this.buildTree(arr, st, en);
        return root;
      } 
    }
};

//code for visually representing the tree, takes root node as a parameter
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
let numbersArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


let idek = Tree();
// idek.buildTree(numbersArr, 0, numbersArr.length - 1);
console.log(idek.root(numbersArr, 0, numbersArr.length - 1))