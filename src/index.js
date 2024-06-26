
function Node(data,leftChild, rightChild){
    return {
        data: data,
        leftChild: leftChild,
        rightChild:rightChild
    }
};

function Tree(arr){
  function buildTree(arr, start, end){
    //should return lvl0 root node

    let mid = Math.floor((start + end) / 2);

    //base case for exiting out of recursion
    if (start > end) return null;

    //sets the middle element of the array as the root
    let root = arr[mid];

    //finds the middle element of the left half of the array and sets it as root
    let leftChild = buildTree(arr, start, mid-1);
    //does the same for the right half of the array
    let rightChild = buildTree(arr, mid+1, end);
    let node = Node(root, leftChild, rightChild);

    //prints out a visual representation of the tree
    prettyPrint(node)
    console.log(' ')
    return node;
  };
  
  //root uses the return value of buildTree func
  let root = buildTree(arr, 0, arr.length - 1)
  
    return{
      insert: function(value) {
        //we only insert as a 'leaf' of the tree 
        //WE NEVER RE-ARRANGE

        let subtree;

        //return if value is a duplicate
        if (value === root.data) return;

          //we check which subtree we'll go to first
        if (value < root.data) {
          subtree = root.leftChild;
        } else {
          subtree = root.rightChild;
        };

          //loops until one of the subtrees is null
        while (subtree.leftChild != null || subtree.rightChild != null) {

          //return if value is a duplicate
          if (value === subtree.data) return;

          if (value < subtree.data) {
            if (subtree.leftChild) subtree = subtree.leftChild;
            else break
          } else {
            if (subtree.rightChild) subtree = subtree.rightChild;
            else break
          };

          }
        //determine if the value should be added to the left subtree
        //or right subtree 
        let node = Node(value, null, null);

        if (value < subtree.data) {
          subtree.leftChild = node;
        } else {
          subtree.rightChild = node;
        };
      },
      delete: function(value) {
       let removableVar = root;
       let parentNode;

       //we loop through the tree until we find our value
       while (removableVar.data !== value) {

        //LOOP THROUGH THE TREE UNTIL WE FIND THE VALUE
        //we keep the parent stored, so that later we can remove the node
        parentNode = removableVar;
        //if nodes value is smaller than searched value, go left
        if (removableVar.data > value) {
          removableVar = removableVar.leftChild;
        } else {
          //else, go right
          removableVar = removableVar.rightChild;
        };
       };

       //REMOVE CASES FOR LEFT CHILD
       //check if left node isnt null
       if (parentNode.leftChild !== null) {
         if (parentNode.leftChild.data === value) {
         
          //CASE 1
          //we check if both children are null
          if (removableVar.leftChild === null && removableVar.rightChild === null) {
            parentNode.leftChild = null;
            return;
          };

          //CASE 2
          //we check if a node has ONLY one child
          if ((removableVar.leftChild && !removableVar.rightChild) || (!removableVar.leftChild && removableVar.rightChild)){

            let savedChild;
            //we check whether it has a right or a left child
            if (removableVar.leftChild) {
              savedChild = removableVar.leftChild;
              parentNode.leftChild = savedChild;
              return;
            } else {
              savedChild = removableVar.rightChild;
              parentNode.leftChild = savedChild;
              return;
            }
          }

          //CASE3
          //if node has 2 children, we find the most left child of its right subtree
          let mostLeftNode = removableVar.rightChild;
          let mostLeftParent;

          //if the right subtree has no left child
          //we get the right subtrees parent
          //we set the removable element to that right subtrees value
          //we delete that right subtree node
          if (!mostLeftNode.leftChild) {
            mostLeftParent = removableVar;
            //if it has no left and no right child
            if (!mostLeftNode.rightChild) {
              parentNode.leftChild.data = mostLeftNode.data;
              mostLeftParent.rightChild = null;
              return;
              //else if it has a right child
            } else {
              mostLeftParent.rightChild.data = mostLeftNode.rightChild.data;
              mostLeftNode.rightChild = null;
              parentNode.leftChild.data  = mostLeftNode.data;
              return;
            }
          }

          while (mostLeftNode.leftChild !== null) {
            mostLeftParent = mostLeftNode;
            mostLeftNode = mostLeftNode.leftChild;
          };
          //after we find the most left node, we have tis parent so that we can delete it
          parentNode.leftChild.data = mostLeftNode.data;
          mostLeftParent.leftChild = null;

         } 
       }

       //REMOVE CASES FOR RIGHT CHILD
       //check if right node isnt null
       if (parentNode.rightChild !== null) {
        if (parentNode.rightChild.data === value) {
          
          //CASE 1
          //we check if both children are null
          if (parentNode.rightChild.leftChild === null && parentNode.rightChild.rightChild === null) {
            parentNode.rightChild = null;
            return;
          };

          //CASE 2
          //we check if a node has ONLY one child
          if ((removableVar.leftChild && !removableVar.rightChild) || (!removableVar.leftChild && removableVar.rightChild)){

            let savedChild;
            //we check whether it has a right or a left child
            if (removableVar.leftChild) {
              savedChild = removableVar.leftChild;
              parentNode.rightChild = savedChild;
              return;
            } else {
              savedChild = removableVar.rightChild;
              parentNode.rightChild = savedChild;
              return;
            }
          }

          //CASE3
          //if node has 2 children, we find the most left child of its right subtree
          let mostLeftNode = removableVar.rightChild;
          let mostLeftParent;
          
          //if the right subtree has no left child
          //we get the right subtrees parent
          //we set the removable element to that right subtrees value
          //we delete that right subtree node
          if (!mostLeftNode.leftChild) {
            mostLeftParent = removableVar;
            //if it has no left and no right child
            if (!mostLeftNode.rightChild) {
              parentNode.rightChild.data = mostLeftNode.data;
              mostLeftParent.rightChild = null;
              return;
              //else if it has a right child
            } else {
              parentNode.rightChild.data  = mostLeftNode.data;
              removableVar.rightChild.data = mostLeftNode.rightChild.data;
              mostLeftNode.rightChild = null;
              return;
            }
          }

          while (mostLeftNode.leftChild !== null) {
            mostLeftParent = mostLeftNode;
            mostLeftNode = mostLeftNode.leftChild;
          };
          //after we find the most left node, we have tis parent so that we can delete it
          parentNode.rightChild.data = mostLeftNode.data;
          mostLeftParent.leftChild = null;

        }
       }
      },
      find: function(value) {
        let currentNode = root;

        while (currentNode.data !== value) {
          if (value > currentNode.data) {
            currentNode = currentNode.rightChild;
          } else {
            currentNode = currentNode.leftChild;
          }
          if (currentNode === null) return "Node doesn't exist";
        };

        return currentNode;
      },
      displayNodes: function(){
        const values = [];
        function defaultFunc(node) {
          // node += 1;
          values.push(node);
        }
        return {
          values, defaultFunc
        }
      },
      levelOrder: function(callback){
        //Write a levelOrder(callback) function that accepts an optional callback function as its parameter.
        //The method should return an array of values if no callback is given as an argument.

        //levelOrder should traverse the tree in breadth-first level order and provide each node as an argument to the callback.
        //As a result, the callback will perform an operation on each node following the order in which they are traversed
        let defaultArr = [];
        let queue = [];

        if (!root) return;
        queue.push(root);
        while (queue.length !== 0) {
          let node = queue.shift();
          //we check if the callback is provided
          if (callback) {
            callback.defaultFunc(node.data)
            //if it isn't provided, we just push the nodes data into our arr
          } else {
              defaultArr.push(node.data)
          }
          if (node.leftChild !== null) queue.push(node.leftChild);
          if (node.rightChild !== null) queue.push(node.rightChild);
        };

        //if theres a callback, return that callbacks array, if not, return defaultArr
        if (callback) return callback.values;
        return defaultArr;
      },
      preOrder: function( callback) {
        let defaultArr = [];
        let stack = [];
        
        if (!root) return;
        stack.push(root);
        while (stack.length !== 0) {
          let node = stack.pop();

          if (!callback) {
            defaultArr.push(node.data);
          } else {
            callback.defaultFunc(node.data);
          }

          if (node.rightChild) stack.push(node.rightChild);
          if (node.leftChild) stack.push(node.leftChild);
        }

        if (callback) return callback.values;
        return defaultArr;
      },
      inOrder: function(passedNode, callback) {
        let node
        if (!passedNode) {
          node = root;
        } else {
          node = passedNode;
        }
        let defaultArr = [];

        if (node === null) return;
        if (node.leftChild) defaultArr = defaultArr.concat(this.inOrder(node.leftChild, callback));

        if (!callback) {defaultArr.push(node.data);}
        else {callback.defaultFunc(node.data)};

        if (node.rightChild) defaultArr = defaultArr.concat(this.inOrder(node.rightChild, callback));

        if (callback) return callback.values;
        return defaultArr;
      },
      postOrder: function(passedNode, callback){
        let node
        if (!passedNode) {
          node = root;
        } else {
          node = passedNode;
        }
        let defaultArr = [];

        if (node === null) return;
        if (node.leftChild) defaultArr = defaultArr.concat(this.postOrder(node.leftChild, callback));
        if (node.rightChild) defaultArr = defaultArr.concat(this.postOrder(node.rightChild, callback));

        if (!callback) {defaultArr.push(node.data);}
        else {callback.defaultFunc(node.data)}

        if (callback) return callback.values;
        return defaultArr;
      },
      height: function(value) {
        let node;
        let heightNum = 0;

        if (value < root.data) {
          node = root.leftChild;
        } else if (value > root.data) {
          node = root.rightChild;
        } else {
          node = root;
        };

        if (node === null) return 0;
        while (node.data !== value) {
          if (value < node.data) {
            node = node.leftChild;
          } else {
            node = node.rightChild;
          }
        };

        while (true){
          if (node.rightChild) {
            heightNum++;
            node = node.rightChild;
            continue;
          };

          if (node.leftChild) {
            heightNum++;
            node = node.leftChild;
            continue;
          };
          break;
        };
        return heightNum;
      },
      depth: function(value) {
        let depthNum = 0;
        let node = root;
        if (value === node.data) return depthNum;

        if (value < node.data) {
          node = node.leftChild
        } else {
          node = node.rightChild;
        };

        depthNum++;

        while (node !== null && value !== node.data) {
          depthNum++;
          if (value < node.data) {
            node = node.leftChild
          } else {
            node = node.rightChild;
          };
        };

        return depthNum;
      }, 
      isBalanced: function(passedNode) {
        //is balanced if height of left subtree and right subtree is not more than 1
        //the leaf nodes dont have any children
        let balanced = true;
        let node
        if (!passedNode) {
          node = root;
        } else {
          node = passedNode;
        }

        if (node === null) return balanced;
        let h1 = 0;
        let h2 = 0;

        if (node.leftChild) {
          h1 = this.height(node.leftChild.data);
        };

        if (node.rightChild) {
          h2 = this.height(node.rightChild.data);
        };

        if ((h2-h1>1) || (h1-h2>1)) {
          balanced = false;
          return balanced;
        }

        if (node.leftChild) balanced = this.isBalanced(node.leftChild);
        if (balanced === false) return balanced;
        if (node.rightChild) balanced = this.isBalanced(node.rightChild);
        if (balanced === false) return balanced;

        return balanced;
      },
      rebalance: function(){
        let rebalancedTree = this.inOrder(null, this.displayNodes());
        root = buildTree(rebalancedTree, 0, rebalancedTree.length - 1);
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


let numbersArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 100, 200, 300, 400, 500, 600, ];


function merge(leftArray, rightArray, leftLength, rightLength, ks, arrayToSort) {
  let i = 0, j = 0, k=ks;
  //compare and copy
  while ( i< leftLength && j < rightLength) {
      if (leftArray[i] < rightArray[j]) {
          arrayToSort[k++] = leftArray[i++];
      } else {
          arrayToSort[k++] = rightArray[j++];
      }
  };

  //check if all the elements are sorted if not add them
  for ( ; i<leftLength; i++) {
      arrayToSort[k++] = leftArray[i];
  }
  for ( ; j<rightLength; j++) {
      arrayToSort[k++] = rightArray[j];
  }
}


function getArrayRange(array, startIndex, endIndex) {
  return array.slice(startIndex, endIndex + 1);
}

//splitting the array into the left and right half
function mergeSort (start, end, arrayToSort) {
  if (start < end) {
    
      let mid = (start + end) / 2;
      mid = Math.floor(mid);

      //getting the left half of the array
      mergeSort(start, mid, arrayToSort);
      let resultLeft = getArrayRange(arrayToSort, start, mid);

      //getting the right half
      mergeSort(mid+1, end, arrayToSort);
      let resultRight = getArrayRange(arrayToSort, mid+1, end);
      merge(resultLeft, resultRight, resultLeft.length, resultRight.length, start, arrayToSort);
  }
}

//removes duplicate values from an array
//the array needs to be SORTED in order for it to work
function removeDuplicates(arr){
  let p = null;
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[p]) {
      continue
    }
    filteredArr.push(arr[i])
    p = i;
  }
  return filteredArr;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomArrGen() {
  let arr = [];
  let i = 0;
  while (i++ < 25) {
    arr.push(getRandomInt(100));
  };

  return arr;
};


//testing
let randArray1 = randomArrGen();

console.log(randArray1);

mergeSort(0, numbersArr.length-1, numbersArr)
numbersArr = removeDuplicates(numbersArr)

mergeSort(0, randArray1.length - 1, randArray1);
randArray1 = removeDuplicates(randArray1);


let test = Tree(randArray1);
console.log(test.isBalanced());
console.log(test.levelOrder());
console.log(test.preOrder());
console.log(test.inOrder());
console.log(test.postOrder());
let i = 0;
while (i++ < 12) {
  test.insert((getRandomInt(100) + 101));
}
console.log(test.isBalanced());
test.rebalance();
console.log(test.isBalanced());
console.log(test.levelOrder());
console.log(test.preOrder());
console.log(test.inOrder());
console.log(test.postOrder());