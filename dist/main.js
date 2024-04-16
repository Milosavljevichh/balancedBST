/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};

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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIE5vZGUoZGF0YSxsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGxlZnRDaGlsZDogbGVmdENoaWxkLFxyXG4gICAgICAgIHJpZ2h0Q2hpbGQ6cmlnaHRDaGlsZFxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVHJlZShhcnIpe1xyXG4gIGZ1bmN0aW9uIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpe1xyXG4gICAgLy9zaG91bGQgcmV0dXJuIGx2bDAgcm9vdCBub2RlXHJcblxyXG4gICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpO1xyXG5cclxuICAgIC8vYmFzZSBjYXNlIGZvciBleGl0aW5nIG91dCBvZiByZWN1cnNpb25cclxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgLy9zZXRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgYXJyYXkgYXMgdGhlIHJvb3RcclxuICAgIGxldCByb290ID0gYXJyW21pZF07XHJcblxyXG4gICAgLy9maW5kcyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGxlZnQgaGFsZiBvZiB0aGUgYXJyYXkgYW5kIHNldHMgaXQgYXMgcm9vdFxyXG4gICAgbGV0IGxlZnRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBtaWQtMSk7XHJcbiAgICAvL2RvZXMgdGhlIHNhbWUgZm9yIHRoZSByaWdodCBoYWxmIG9mIHRoZSBhcnJheVxyXG4gICAgbGV0IHJpZ2h0Q2hpbGQgPSBidWlsZFRyZWUoYXJyLCBtaWQrMSwgZW5kKTtcclxuICAgIGxldCBub2RlID0gTm9kZShyb290LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpO1xyXG5cclxuICAgIC8vcHJpbnRzIG91dCBhIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHJlZVxyXG4gICAgcHJldHR5UHJpbnQobm9kZSlcclxuICAgIGNvbnNvbGUubG9nKCcgJylcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH07XHJcbiAgXHJcbiAgLy9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gIGxldCByb290ID0gYnVpbGRUcmVlKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpXHJcbiAgXHJcbiAgICByZXR1cm57XHJcbiAgICAgIGluc2VydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL3dlIG9ubHkgaW5zZXJ0IGFzIGEgJ2xlYWYnIG9mIHRoZSB0cmVlIFxyXG4gICAgICAgIC8vV0UgTkVWRVIgUkUtQVJSQU5HRVxyXG5cclxuICAgICAgICBsZXQgc3VidHJlZTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gaWYgdmFsdWUgaXMgYSBkdXBsaWNhdGVcclxuICAgICAgICBpZiAodmFsdWUgPT09IHJvb3QuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIC8vd2UgY2hlY2sgd2hpY2ggc3VidHJlZSB3ZSdsbCBnbyB0byBmaXJzdFxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9sb29wcyB1bnRpbCBvbmUgb2YgdGhlIHN1YnRyZWVzIGlzIG51bGxcclxuICAgICAgICB3aGlsZSAoc3VidHJlZS5sZWZ0Q2hpbGQgIT0gbnVsbCB8fCBzdWJ0cmVlLnJpZ2h0Q2hpbGQgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHN1YnRyZWUuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQpIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgZWxzZSBicmVha1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN1YnRyZWUucmlnaHRDaGlsZCkgc3VidHJlZSA9IHN1YnRyZWUucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgZWxzZSBicmVha1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLy9kZXRlcm1pbmUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgbGVmdCBzdWJ0cmVlXHJcbiAgICAgICAgLy9vciByaWdodCBzdWJ0cmVlIFxyXG4gICAgICAgIGxldCBub2RlID0gTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgIGxldCByZW1vdmFibGVWYXIgPSByb290O1xyXG4gICAgICAgbGV0IHBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgLy93ZSBsb29wIHRocm91Z2ggdGhlIHRyZWUgdW50aWwgd2UgZmluZCBvdXIgdmFsdWVcclxuICAgICAgIHdoaWxlIChyZW1vdmFibGVWYXIuZGF0YSAhPT0gdmFsdWUpIHtcclxuXHJcbiAgICAgICAgLy9MT09QIFRIUk9VR0ggVEhFIFRSRUUgVU5USUwgV0UgRklORCBUSEUgVkFMVUVcclxuICAgICAgICAvL3dlIGtlZXAgdGhlIHBhcmVudCBzdG9yZWQsIHNvIHRoYXQgbGF0ZXIgd2UgY2FuIHJlbW92ZSB0aGUgbm9kZVxyXG4gICAgICAgIHBhcmVudE5vZGUgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgLy9pZiBub2RlcyB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gc2VhcmNoZWQgdmFsdWUsIGdvIGxlZnRcclxuICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmRhdGEgPiB2YWx1ZSkge1xyXG4gICAgICAgICAgcmVtb3ZhYmxlVmFyID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9lbHNlLCBnbyByaWdodFxyXG4gICAgICAgICAgcmVtb3ZhYmxlVmFyID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgIH07XHJcblxyXG4gICAgICAgLy9SRU1PVkUgQ0FTRVMgRk9SIExFRlQgQ0hJTERcclxuICAgICAgIC8vY2hlY2sgaWYgbGVmdCBub2RlIGlzbnQgbnVsbFxyXG4gICAgICAgaWYgKHBhcmVudE5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID09PSB2YWx1ZSkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgIC8vQ0FTRSAxXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGJvdGggY2hpbGRyZW4gYXJlIG51bGxcclxuICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkID09PSBudWxsICYmIHJlbW92YWJsZVZhci5yaWdodENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvL0NBU0UgMlxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBhIG5vZGUgaGFzIE9OTFkgb25lIGNoaWxkXHJcbiAgICAgICAgICBpZiAoKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgIXJlbW92YWJsZVZhci5yaWdodENoaWxkKSB8fCAoIXJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAvL3dlIGNoZWNrIHdoZXRoZXIgaXQgaGFzIGEgcmlnaHQgb3IgYSBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgc2F2ZWRDaGlsZCA9IHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vQ0FTRTNcclxuICAgICAgICAgIC8vaWYgbm9kZSBoYXMgMiBjaGlsZHJlbiwgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IGNoaWxkIG9mIGl0cyByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgICBsZXQgbW9zdExlZnROb2RlID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICBsZXQgbW9zdExlZnRQYXJlbnQ7XHJcblxyXG4gICAgICAgICAgLy9pZiB0aGUgcmlnaHQgc3VidHJlZSBoYXMgbm8gbGVmdCBjaGlsZFxyXG4gICAgICAgICAgLy93ZSBnZXQgdGhlIHJpZ2h0IHN1YnRyZWVzIHBhcmVudFxyXG4gICAgICAgICAgLy93ZSBzZXQgdGhlIHJlbW92YWJsZSBlbGVtZW50IHRvIHRoYXQgcmlnaHQgc3VidHJlZXMgdmFsdWVcclxuICAgICAgICAgIC8vd2UgZGVsZXRlIHRoYXQgcmlnaHQgc3VidHJlZSBub2RlXHJcbiAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgICAgIC8vaWYgaXQgaGFzIG5vIGxlZnQgYW5kIG5vIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIC8vZWxzZSBpZiBpdCBoYXMgYSByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2hpbGUgKG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSBtb3N0TGVmdE5vZGU7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZSA9IG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy9hZnRlciB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgbm9kZSwgd2UgaGF2ZSB0aXMgcGFyZW50IHNvIHRoYXQgd2UgY2FuIGRlbGV0ZSBpdFxyXG4gICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgbW9zdExlZnRQYXJlbnQubGVmdENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgIH0gXHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgLy9SRU1PVkUgQ0FTRVMgRk9SIFJJR0hUIENISUxEXHJcbiAgICAgICAvL2NoZWNrIGlmIHJpZ2h0IG5vZGUgaXNudCBudWxsXHJcbiAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL0NBU0UgMVxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBib3RoIGNoaWxkcmVuIGFyZSBudWxsXHJcbiAgICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCA9PT0gbnVsbCAmJiBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vQ0FTRSAyXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGEgbm9kZSBoYXMgT05MWSBvbmUgY2hpbGRcclxuICAgICAgICAgIGlmICgocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiAhcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpIHx8ICghcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiByZW1vdmFibGVWYXIucmlnaHRDaGlsZCkpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgIC8vd2UgY2hlY2sgd2hldGhlciBpdCBoYXMgYSByaWdodCBvciBhIGxlZnQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkID0gc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0NBU0UzXHJcbiAgICAgICAgICAvL2lmIG5vZGUgaGFzIDIgY2hpbGRyZW4sIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBjaGlsZCBvZiBpdHMgcmlnaHQgc3VidHJlZVxyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0Tm9kZSA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0UGFyZW50O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL2lmIHRoZSByaWdodCBzdWJ0cmVlIGhhcyBubyBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAvL3dlIGdldCB0aGUgcmlnaHQgc3VidHJlZXMgcGFyZW50XHJcbiAgICAgICAgICAvL3dlIHNldCB0aGUgcmVtb3ZhYmxlIGVsZW1lbnQgdG8gdGhhdCByaWdodCBzdWJ0cmVlcyB2YWx1ZVxyXG4gICAgICAgICAgLy93ZSBkZWxldGUgdGhhdCByaWdodCBzdWJ0cmVlIG5vZGVcclxuICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAgICAgLy9pZiBpdCBoYXMgbm8gbGVmdCBhbmQgbm8gcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIC8vZWxzZSBpZiBpdCBoYXMgYSByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhICA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgICAgIHJlbW92YWJsZVZhci5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZC5kYXRhO1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3aGlsZSAobW9zdExlZnROb2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IG1vc3RMZWZ0Tm9kZTtcclxuICAgICAgICAgICAgbW9zdExlZnROb2RlID0gbW9zdExlZnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvL2FmdGVyIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBub2RlLCB3ZSBoYXZlIHRpcyBwYXJlbnQgc28gdGhhdCB3ZSBjYW4gZGVsZXRlIGl0XHJcbiAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgbW9zdExlZnRQYXJlbnQubGVmdENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBmaW5kOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IHJvb3Q7XHJcblxyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZS5kYXRhICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID4gY3VycmVudE5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIFwiTm9kZSBkb2Vzbid0IGV4aXN0XCI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xyXG4gICAgICB9LFxyXG4gICAgICBkaXNwbGF5Tm9kZXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gZGVmYXVsdEZ1bmMobm9kZSkge1xyXG4gICAgICAgICAgLy8gbm9kZSArPSAxO1xyXG4gICAgICAgICAgdmFsdWVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZXMsIGRlZmF1bHRGdW5jXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBsZXZlbE9yZGVyOiBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgLy9Xcml0ZSBhIGxldmVsT3JkZXIoY2FsbGJhY2spIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiBhcyBpdHMgcGFyYW1ldGVyLlxyXG4gICAgICAgIC8vVGhlIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cclxuXHJcbiAgICAgICAgLy9sZXZlbE9yZGVyIHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBpbiBicmVhZHRoLWZpcnN0IGxldmVsIG9yZGVyIGFuZCBwcm92aWRlIGVhY2ggbm9kZSBhcyBhbiBhcmd1bWVudCB0byB0aGUgY2FsbGJhY2suXHJcbiAgICAgICAgLy9BcyBhIHJlc3VsdCwgdGhlIGNhbGxiYWNrIHdpbGwgcGVyZm9ybSBhbiBvcGVyYXRpb24gb24gZWFjaCBub2RlIGZvbGxvd2luZyB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSBhcmUgdHJhdmVyc2VkXHJcbiAgICAgICAgbGV0IGRlZmF1bHRBcnIgPSBbXTtcclxuICAgICAgICBsZXQgcXVldWUgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyb290KSByZXR1cm47XHJcbiAgICAgICAgcXVldWUucHVzaChyb290KTtcclxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIHRoZSBjYWxsYmFjayBpcyBwcm92aWRlZFxyXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmRlZmF1bHRGdW5jKG5vZGUuZGF0YSlcclxuICAgICAgICAgICAgLy9pZiBpdCBpc24ndCBwcm92aWRlZCwgd2UganVzdCBwdXNoIHRoZSBub2RlcyBkYXRhIGludG8gb3VyIGFyclxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkICE9PSBudWxsKSBxdWV1ZS5wdXNoKG5vZGUubGVmdENoaWxkKTtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHF1ZXVlLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2lmIHRoZXJlcyBhIGNhbGxiYWNrLCByZXR1cm4gdGhhdCBjYWxsYmFja3MgYXJyYXksIGlmIG5vdCwgcmV0dXJuIGRlZmF1bHRBcnJcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjay52YWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByZU9yZGVyOiBmdW5jdGlvbiggY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBzdGFjayA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuO1xyXG4gICAgICAgIHN0YWNrLnB1c2gocm9vdCk7XHJcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgbGV0IG5vZGUgPSBzdGFjay5wb3AoKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZCk7XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk9yZGVyOiBmdW5jdGlvbihwYXNzZWROb2RlLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBub2RlXHJcbiAgICAgICAgaWYgKCFwYXNzZWROb2RlKSB7XHJcbiAgICAgICAgICBub2RlID0gcm9vdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9kZSA9IHBhc3NlZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkZWZhdWx0QXJyID0gW107XHJcblxyXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSBkZWZhdWx0QXJyID0gZGVmYXVsdEFyci5jb25jYXQodGhpcy5pbk9yZGVyKG5vZGUubGVmdENoaWxkLCBjYWxsYmFjaykpO1xyXG5cclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7ZGVmYXVsdEFyci5wdXNoKG5vZGUuZGF0YSk7fVxyXG4gICAgICAgIGVsc2Uge2NhbGxiYWNrLmRlZmF1bHRGdW5jKG5vZGUuZGF0YSl9O1xyXG5cclxuICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSBkZWZhdWx0QXJyID0gZGVmYXVsdEFyci5jb25jYXQodGhpcy5pbk9yZGVyKG5vZGUucmlnaHRDaGlsZCwgY2FsbGJhY2spKTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBwb3N0T3JkZXI6IGZ1bmN0aW9uKHBhc3NlZE5vZGUsIGNhbGxiYWNrKXtcclxuICAgICAgICBsZXQgbm9kZVxyXG4gICAgICAgIGlmICghcGFzc2VkTm9kZSkge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUgPSBwYXNzZWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG5cclxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgZGVmYXVsdEFyciA9IGRlZmF1bHRBcnIuY29uY2F0KHRoaXMucG9zdE9yZGVyKG5vZGUubGVmdENoaWxkLCBjYWxsYmFjaykpO1xyXG4gICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIGRlZmF1bHRBcnIgPSBkZWZhdWx0QXJyLmNvbmNhdCh0aGlzLnBvc3RPcmRlcihub2RlLnJpZ2h0Q2hpbGQsIGNhbGxiYWNrKSk7XHJcblxyXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTt9XHJcbiAgICAgICAgZWxzZSB7Y2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKX1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5vZGU7XHJcbiAgICAgICAgbGV0IGhlaWdodE51bSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3QubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiByb290LmRhdGEpIHtcclxuICAgICAgICAgIG5vZGUgPSByb290LnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUgPSByb290O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICB3aGlsZSAobm9kZS5kYXRhICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRydWUpe1xyXG4gICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICBoZWlnaHROdW0rKztcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICBoZWlnaHROdW0rKztcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBoZWlnaHROdW07XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlcHRoOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCBkZXB0aE51bSA9IDA7XHJcbiAgICAgICAgbGV0IG5vZGUgPSByb290O1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbm9kZS5kYXRhKSByZXR1cm4gZGVwdGhOdW07XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZGVwdGhOdW0rKztcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwgJiYgdmFsdWUgIT09IG5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgZGVwdGhOdW0rKztcclxuICAgICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGRcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkZXB0aE51bTtcclxuICAgICAgfSwgXHJcbiAgICAgIGlzQmFsYW5jZWQ6IGZ1bmN0aW9uKHBhc3NlZE5vZGUpIHtcclxuICAgICAgICAvL2lzIGJhbGFuY2VkIGlmIGhlaWdodCBvZiBsZWZ0IHN1YnRyZWUgYW5kIHJpZ2h0IHN1YnRyZWUgaXMgbm90IG1vcmUgdGhhbiAxXHJcbiAgICAgICAgLy90aGUgbGVhZiBub2RlcyBkb250IGhhdmUgYW55IGNoaWxkcmVuXHJcbiAgICAgICAgbGV0IGJhbGFuY2VkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbm9kZVxyXG4gICAgICAgIGlmICghcGFzc2VkTm9kZSkge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUgPSBwYXNzZWROb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiBiYWxhbmNlZDtcclxuICAgICAgICBsZXQgaDEgPSAwO1xyXG4gICAgICAgIGxldCBoMiA9IDA7XHJcblxyXG4gICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgaDEgPSB0aGlzLmhlaWdodChub2RlLmxlZnRDaGlsZC5kYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICBoMiA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHRDaGlsZC5kYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoKGgyLWgxPjEpIHx8IChoMS1oMj4xKSkge1xyXG4gICAgICAgICAgYmFsYW5jZWQgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybiBiYWxhbmNlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgYmFsYW5jZWQgPSB0aGlzLmlzQmFsYW5jZWQobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIGlmIChiYWxhbmNlZCA9PT0gZmFsc2UpIHJldHVybiBiYWxhbmNlZDtcclxuICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSBiYWxhbmNlZCA9IHRoaXMuaXNCYWxhbmNlZChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgIGlmIChiYWxhbmNlZCA9PT0gZmFsc2UpIHJldHVybiBiYWxhbmNlZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhbGFuY2VkO1xyXG4gICAgICB9LFxyXG4gICAgICByZWJhbGFuY2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHJlYmFsYW5jZWRUcmVlID0gdGhpcy5pbk9yZGVyKG51bGwsIHRoaXMuZGlzcGxheU5vZGVzKCkpO1xyXG4gICAgICAgIHJvb3QgPSBidWlsZFRyZWUocmViYWxhbmNlZFRyZWUsIDAsIHJlYmFsYW5jZWRUcmVlLmxlbmd0aCAtIDEpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0LCAxMDAsIDIwMCwgMzAwLCA0MDAsIDUwMCwgNjAwLCBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tQXJyR2VuKCkge1xyXG4gIGxldCBhcnIgPSBbXTtcclxuICBsZXQgaSA9IDA7XHJcbiAgd2hpbGUgKGkrKyA8IDI1KSB7XHJcbiAgICBhcnIucHVzaChnZXRSYW5kb21JbnQoMTAwKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcblxyXG4vL3Rlc3RpbmdcclxubGV0IHJhbmRBcnJheTEgPSByYW5kb21BcnJHZW4oKTtcclxuXHJcbmNvbnNvbGUubG9nKHJhbmRBcnJheTEpO1xyXG5cclxubWVyZ2VTb3J0KDAsIG51bWJlcnNBcnIubGVuZ3RoLTEsIG51bWJlcnNBcnIpXHJcbm51bWJlcnNBcnIgPSByZW1vdmVEdXBsaWNhdGVzKG51bWJlcnNBcnIpXHJcblxyXG5tZXJnZVNvcnQoMCwgcmFuZEFycmF5MS5sZW5ndGggLSAxLCByYW5kQXJyYXkxKTtcclxucmFuZEFycmF5MSA9IHJlbW92ZUR1cGxpY2F0ZXMocmFuZEFycmF5MSk7XHJcblxyXG5cclxubGV0IHRlc3QgPSBUcmVlKHJhbmRBcnJheTEpO1xyXG5jb25zb2xlLmxvZyh0ZXN0LmlzQmFsYW5jZWQoKSk7XHJcbmNvbnNvbGUubG9nKHRlc3QubGV2ZWxPcmRlcigpKTtcclxuY29uc29sZS5sb2codGVzdC5wcmVPcmRlcigpKTtcclxuY29uc29sZS5sb2codGVzdC5pbk9yZGVyKCkpO1xyXG5jb25zb2xlLmxvZyh0ZXN0LnBvc3RPcmRlcigpKTtcclxubGV0IGkgPSAwO1xyXG53aGlsZSAoaSsrIDwgMTIpIHtcclxuICB0ZXN0Lmluc2VydCgoZ2V0UmFuZG9tSW50KDEwMCkgKyAxMDEpKTtcclxufVxyXG5jb25zb2xlLmxvZyh0ZXN0LmlzQmFsYW5jZWQoKSk7XHJcbnRlc3QucmViYWxhbmNlKCk7XHJcbmNvbnNvbGUubG9nKHRlc3QuaXNCYWxhbmNlZCgpKTtcclxuY29uc29sZS5sb2codGVzdC5sZXZlbE9yZGVyKCkpO1xyXG5jb25zb2xlLmxvZyh0ZXN0LnByZU9yZGVyKCkpO1xyXG5jb25zb2xlLmxvZyh0ZXN0LmluT3JkZXIoKSk7XHJcbmNvbnNvbGUubG9nKHRlc3QucG9zdE9yZGVyKCkpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==