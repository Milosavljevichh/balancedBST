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
    // console.log(leftChild)
    // if (leftChild !== null && leftChild.data === root) {
    //   // let tempNode = leftChild.rightChild;
    //   // leftChild = leftChild.leftChild;
    //   // leftChild.rightChild = tempNode;

    // };
    //does the same for the right half of the array
    let rightChild = buildTree(arr, mid+1, end);
    // if (rightChild.data === root) {rightChild = rightChild.leftChild};
    let node = Node(root, leftChild, rightChild);

    //prints out a visual representation of the tree
    prettyPrint(node)
    console.log(' ')
    return node;
  };
  
  //root uses the return value of buildTree func
  let root = buildTree(arr, 0, arr.length - 1)
  
    return{
      root,
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
        while (subtree.leftChild != null && subtree.rightChild != null) {

          //return if value is a duplicate
          if (value === subtree.leftChild.data || value === subtree.rightChild.data) return;

          if (value < subtree.data) {
            subtree = subtree.leftChild;
          } else {
            subtree = subtree.rightChild;
          };

          }
        //determine if the value should be added to the left subtree
        //or right subtree 
        let node = Node(value, null, null);

        if (subtree.leftChild === null) {
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
          node += 1;
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
      inOrder: function(callback) {
        let defaultArr = [];
        let stack = [];
        if (!root) return;

        let node = root.leftChild;

        while (node !== null) {
          stack.push(node);
          node = node.leftChild;
        };

        while(stack.length !== 0) {
          node = stack.pop();
          if (!callback) {
            defaultArr.push(node.data);
          } else {
            callback.defaultFunc(node.data);
          }
          if (!node.leftChild && !node.rightChild) continue;
          if (node.rightChild) {
            stack.push(node.rightChild);
            //we do these steps so that same values don't get added over and over again
            //since we're working with a stack
            if (node.rightChild.leftChild === null)  continue;
            stack.push(node.rightChild.leftChild);
            continue;
          }
          if (node.leftChild) stack.push(node.leftChild);
        };
        if (!callback) {
          defaultArr.push(root.data);
        } else {
          callback.defaultFunc(root.data);
        }

        node = root.rightChild;
        while (node !== null) {
          stack.push(node);
          node = node.leftChild;
        };

        
        while(stack.length !== 0) {
          node = stack.pop();
          if (!callback) {
            defaultArr.push(node.data);
          } else {
            callback.defaultFunc(node.data);
          }
          if (!node.leftChild && !node.rightChild) continue;
          if (node.rightChild) {
            stack.push(node.rightChild);
            if (node.rightChild.leftChild === null)  continue;
            stack.push(node.rightChild.leftChild);
            continue;
          }
          if (node.leftChild) stack.push(node.leftChild);
        };

        if (callback) return callback.values;
        return defaultArr;
      },
      postOrder: function(callback){
        let defaultArr = [];
        let stack = [];
        if (!root) return;

        let node = root.rightChild;

        while (node !== null) {
          stack.push(node);
          node = node.leftChild;
        };

        while(stack.length !== 0) {
          node = stack.pop();
          defaultArr.push(node.data);
          if (!node.leftChild && !node.rightChild) continue;
          if (node.rightChild) {
            stack.push(node.rightChild);
            //we do these steps so that same values don't get added over and over again
            //since we're working with a stack
            if (node.rightChild.leftChild === null)  continue;
            stack.push(node.rightChild.leftChild);
            continue;
          }
          if (node.leftChild) stack.push(node.leftChild);
        };
        defaultArr.push(root.data);

        node = root.leftChild;
        while (node !== null) {
          stack.push(node);
          node = node.leftChild;
        };

        
        while(stack.length !== 0) {
          node = stack.pop();
          defaultArr.push(node.data);
          if (!node.leftChild && !node.rightChild) continue;
          if (node.rightChild) {
            stack.push(node.rightChild);
            if (node.rightChild.leftChild === null)  continue;
            stack.push(node.rightChild.leftChild);
            continue;
          }
          if (node.leftChild) stack.push(node.leftChild);
        };

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

        while (node.data !== value) {
          if (value < node.data) {
            node = node.leftChild;
          } else {
            node = node.rightChild;
          }
        };

        heightNum++;
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

mergeSort(0, numbersArr.length-1, numbersArr)
numbersArr = removeDuplicates(numbersArr)
console.log(numbersArr)


let idek = Tree(numbersArr);
console.log(idek.root)
console.log(idek.inOrder())
// console.log(idek.inOrder(idek.displayNodes()))
console.log(idek.depth(324))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3hFO0FBQ0EsbUJBQW1CLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQ2pFO0FBQ0EscUNBQXFDLE9BQU8sRUFBRSx5QkFBeUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsY0FBYztBQUN4QjtBQUNBO0FBQ0EsVUFBVSxlQUFlO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZnVuY3Rpb24gTm9kZShkYXRhLGxlZnRDaGlsZCwgcmlnaHRDaGlsZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgbGVmdENoaWxkOiBsZWZ0Q2hpbGQsXHJcbiAgICAgICAgcmlnaHRDaGlsZDpyaWdodENoaWxkXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUcmVlKGFycil7XHJcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAvL3Nob3VsZCByZXR1cm4gbHZsMCByb290IG5vZGVcclxuXHJcbiAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcblxyXG4gICAgLy9iYXNlIGNhc2UgZm9yIGV4aXRpbmcgb3V0IG9mIHJlY3Vyc2lvblxyXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAvL3NldHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBhcnJheSBhcyB0aGUgcm9vdFxyXG4gICAgbGV0IHJvb3QgPSBhcnJbbWlkXTtcclxuXHJcbiAgICAvL2ZpbmRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheSBhbmQgc2V0cyBpdCBhcyByb290XHJcbiAgICBsZXQgbGVmdENoaWxkID0gYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZC0xKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGxlZnRDaGlsZClcclxuICAgIC8vIGlmIChsZWZ0Q2hpbGQgIT09IG51bGwgJiYgbGVmdENoaWxkLmRhdGEgPT09IHJvb3QpIHtcclxuICAgIC8vICAgLy8gbGV0IHRlbXBOb2RlID0gbGVmdENoaWxkLnJpZ2h0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZCA9IGxlZnRDaGlsZC5sZWZ0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZC5yaWdodENoaWxkID0gdGVtcE5vZGU7XHJcblxyXG4gICAgLy8gfTtcclxuICAgIC8vZG9lcyB0aGUgc2FtZSBmb3IgdGhlIHJpZ2h0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgcmlnaHRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIG1pZCsxLCBlbmQpO1xyXG4gICAgLy8gaWYgKHJpZ2h0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge3JpZ2h0Q2hpbGQgPSByaWdodENoaWxkLmxlZnRDaGlsZH07XHJcbiAgICBsZXQgbm9kZSA9IE5vZGUocm9vdCwgbGVmdENoaWxkLCByaWdodENoaWxkKTtcclxuXHJcbiAgICAvL3ByaW50cyBvdXQgYSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyZWVcclxuICAgIHByZXR0eVByaW50KG5vZGUpXHJcbiAgICBjb25zb2xlLmxvZygnICcpXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9O1xyXG4gIFxyXG4gIC8vcm9vdCB1c2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYnVpbGRUcmVlIGZ1bmNcclxuICBsZXQgcm9vdCA9IGJ1aWxkVHJlZShhcnIsIDAsIGFyci5sZW5ndGggLSAxKVxyXG4gIFxyXG4gICAgcmV0dXJue1xyXG4gICAgICByb290LFxyXG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLy93ZSBvbmx5IGluc2VydCBhcyBhICdsZWFmJyBvZiB0aGUgdHJlZSBcclxuICAgICAgICAvL1dFIE5FVkVSIFJFLUFSUkFOR0VcclxuXHJcbiAgICAgICAgbGV0IHN1YnRyZWU7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSByb290LmRhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIHdoaWNoIHN1YnRyZWUgd2UnbGwgZ28gdG8gZmlyc3RcclxuICAgICAgICBpZiAodmFsdWUgPCByb290LmRhdGEpIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vbG9vcHMgdW50aWwgb25lIG9mIHRoZSBzdWJ0cmVlcyBpcyBudWxsXHJcbiAgICAgICAgd2hpbGUgKHN1YnRyZWUubGVmdENoaWxkICE9IG51bGwgJiYgc3VidHJlZS5yaWdodENoaWxkICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAvL3JldHVybiBpZiB2YWx1ZSBpcyBhIGR1cGxpY2F0ZVxyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhIHx8IHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLy9kZXRlcm1pbmUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgbGVmdCBzdWJ0cmVlXHJcbiAgICAgICAgLy9vciByaWdodCBzdWJ0cmVlIFxyXG4gICAgICAgIGxldCBub2RlID0gTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgIGxldCByZW1vdmFibGVWYXIgPSByb290O1xyXG4gICAgICAgbGV0IHBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgLy93ZSBsb29wIHRocm91Z2ggdGhlIHRyZWUgdW50aWwgd2UgZmluZCBvdXIgdmFsdWVcclxuICAgICAgIHdoaWxlIChyZW1vdmFibGVWYXIuZGF0YSAhPT0gdmFsdWUpIHtcclxuXHJcbiAgICAgICAgLy9MT09QIFRIUk9VR0ggVEhFIFRSRUUgVU5USUwgV0UgRklORCBUSEUgVkFMVUVcclxuICAgICAgICAvL3dlIGtlZXAgdGhlIHBhcmVudCBzdG9yZWQsIHNvIHRoYXQgbGF0ZXIgd2UgY2FuIHJlbW92ZSB0aGUgbm9kZVxyXG4gICAgICAgIHBhcmVudE5vZGUgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgLy9pZiBub2RlcyB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gc2VhcmNoZWQgdmFsdWUsIGdvIGxlZnRcclxuICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmRhdGEgPiB2YWx1ZSkge1xyXG4gICAgICAgICAgcmVtb3ZhYmxlVmFyID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9lbHNlLCBnbyByaWdodFxyXG4gICAgICAgICAgcmVtb3ZhYmxlVmFyID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgIH07XHJcblxyXG4gICAgICAgLy9SRU1PVkUgQ0FTRVMgRk9SIExFRlQgQ0hJTERcclxuICAgICAgIC8vY2hlY2sgaWYgbGVmdCBub2RlIGlzbnQgbnVsbFxyXG4gICAgICAgaWYgKHBhcmVudE5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID09PSB2YWx1ZSkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgIC8vQ0FTRSAxXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGJvdGggY2hpbGRyZW4gYXJlIG51bGxcclxuICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkID09PSBudWxsICYmIHJlbW92YWJsZVZhci5yaWdodENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvL0NBU0UgMlxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBhIG5vZGUgaGFzIE9OTFkgb25lIGNoaWxkXHJcbiAgICAgICAgICBpZiAoKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgIXJlbW92YWJsZVZhci5yaWdodENoaWxkKSB8fCAoIXJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAvL3dlIGNoZWNrIHdoZXRoZXIgaXQgaGFzIGEgcmlnaHQgb3IgYSBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgc2F2ZWRDaGlsZCA9IHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vQ0FTRTNcclxuICAgICAgICAgIC8vaWYgbm9kZSBoYXMgMiBjaGlsZHJlbiwgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IGNoaWxkIG9mIGl0cyByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgICBsZXQgbW9zdExlZnROb2RlID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICBsZXQgbW9zdExlZnRQYXJlbnQ7XHJcblxyXG4gICAgICAgICAgLy9pZiB0aGUgcmlnaHQgc3VidHJlZSBoYXMgbm8gbGVmdCBjaGlsZFxyXG4gICAgICAgICAgLy93ZSBnZXQgdGhlIHJpZ2h0IHN1YnRyZWVzIHBhcmVudFxyXG4gICAgICAgICAgLy93ZSBzZXQgdGhlIHJlbW92YWJsZSBlbGVtZW50IHRvIHRoYXQgcmlnaHQgc3VidHJlZXMgdmFsdWVcclxuICAgICAgICAgIC8vd2UgZGVsZXRlIHRoYXQgcmlnaHQgc3VidHJlZSBub2RlXHJcbiAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgICAgIC8vaWYgaXQgaGFzIG5vIGxlZnQgYW5kIG5vIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIC8vZWxzZSBpZiBpdCBoYXMgYSByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2hpbGUgKG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSBtb3N0TGVmdE5vZGU7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZSA9IG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy9hZnRlciB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgbm9kZSwgd2UgaGF2ZSB0aXMgcGFyZW50IHNvIHRoYXQgd2UgY2FuIGRlbGV0ZSBpdFxyXG4gICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgbW9zdExlZnRQYXJlbnQubGVmdENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgIH0gXHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgLy9SRU1PVkUgQ0FTRVMgRk9SIFJJR0hUIENISUxEXHJcbiAgICAgICAvL2NoZWNrIGlmIHJpZ2h0IG5vZGUgaXNudCBudWxsXHJcbiAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL0NBU0UgMVxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBib3RoIGNoaWxkcmVuIGFyZSBudWxsXHJcbiAgICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCA9PT0gbnVsbCAmJiBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vQ0FTRSAyXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGEgbm9kZSBoYXMgT05MWSBvbmUgY2hpbGRcclxuICAgICAgICAgIGlmICgocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiAhcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpIHx8ICghcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiByZW1vdmFibGVWYXIucmlnaHRDaGlsZCkpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgIC8vd2UgY2hlY2sgd2hldGhlciBpdCBoYXMgYSByaWdodCBvciBhIGxlZnQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkID0gc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0NBU0UzXHJcbiAgICAgICAgICAvL2lmIG5vZGUgaGFzIDIgY2hpbGRyZW4sIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBjaGlsZCBvZiBpdHMgcmlnaHQgc3VidHJlZVxyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0Tm9kZSA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0UGFyZW50O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL2lmIHRoZSByaWdodCBzdWJ0cmVlIGhhcyBubyBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAvL3dlIGdldCB0aGUgcmlnaHQgc3VidHJlZXMgcGFyZW50XHJcbiAgICAgICAgICAvL3dlIHNldCB0aGUgcmVtb3ZhYmxlIGVsZW1lbnQgdG8gdGhhdCByaWdodCBzdWJ0cmVlcyB2YWx1ZVxyXG4gICAgICAgICAgLy93ZSBkZWxldGUgdGhhdCByaWdodCBzdWJ0cmVlIG5vZGVcclxuICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAgICAgLy9pZiBpdCBoYXMgbm8gbGVmdCBhbmQgbm8gcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIC8vZWxzZSBpZiBpdCBoYXMgYSByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhICA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgICAgIHJlbW92YWJsZVZhci5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZC5kYXRhO1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3aGlsZSAobW9zdExlZnROb2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IG1vc3RMZWZ0Tm9kZTtcclxuICAgICAgICAgICAgbW9zdExlZnROb2RlID0gbW9zdExlZnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvL2FmdGVyIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBub2RlLCB3ZSBoYXZlIHRpcyBwYXJlbnQgc28gdGhhdCB3ZSBjYW4gZGVsZXRlIGl0XHJcbiAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgbW9zdExlZnRQYXJlbnQubGVmdENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBmaW5kOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IHJvb3Q7XHJcblxyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZS5kYXRhICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID4gY3VycmVudE5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIFwiTm9kZSBkb2Vzbid0IGV4aXN0XCI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xyXG4gICAgICB9LFxyXG4gICAgICBkaXNwbGF5Tm9kZXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gZGVmYXVsdEZ1bmMobm9kZSkge1xyXG4gICAgICAgICAgbm9kZSArPSAxO1xyXG4gICAgICAgICAgdmFsdWVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB2YWx1ZXMsIGRlZmF1bHRGdW5jXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBsZXZlbE9yZGVyOiBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgLy9Xcml0ZSBhIGxldmVsT3JkZXIoY2FsbGJhY2spIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiBhcyBpdHMgcGFyYW1ldGVyLlxyXG4gICAgICAgIC8vVGhlIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBhcyBhbiBhcmd1bWVudC5cclxuXHJcbiAgICAgICAgLy9sZXZlbE9yZGVyIHNob3VsZCB0cmF2ZXJzZSB0aGUgdHJlZSBpbiBicmVhZHRoLWZpcnN0IGxldmVsIG9yZGVyIGFuZCBwcm92aWRlIGVhY2ggbm9kZSBhcyBhbiBhcmd1bWVudCB0byB0aGUgY2FsbGJhY2suXHJcbiAgICAgICAgLy9BcyBhIHJlc3VsdCwgdGhlIGNhbGxiYWNrIHdpbGwgcGVyZm9ybSBhbiBvcGVyYXRpb24gb24gZWFjaCBub2RlIGZvbGxvd2luZyB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSBhcmUgdHJhdmVyc2VkXHJcbiAgICAgICAgbGV0IGRlZmF1bHRBcnIgPSBbXTtcclxuICAgICAgICBsZXQgcXVldWUgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFyb290KSByZXR1cm47XHJcbiAgICAgICAgcXVldWUucHVzaChyb290KTtcclxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIHRoZSBjYWxsYmFjayBpcyBwcm92aWRlZFxyXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmRlZmF1bHRGdW5jKG5vZGUuZGF0YSlcclxuICAgICAgICAgICAgLy9pZiBpdCBpc24ndCBwcm92aWRlZCwgd2UganVzdCBwdXNoIHRoZSBub2RlcyBkYXRhIGludG8gb3VyIGFyclxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkICE9PSBudWxsKSBxdWV1ZS5wdXNoKG5vZGUubGVmdENoaWxkKTtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHF1ZXVlLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2lmIHRoZXJlcyBhIGNhbGxiYWNrLCByZXR1cm4gdGhhdCBjYWxsYmFja3MgYXJyYXksIGlmIG5vdCwgcmV0dXJuIGRlZmF1bHRBcnJcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjay52YWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByZU9yZGVyOiBmdW5jdGlvbiggY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBzdGFjayA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuO1xyXG4gICAgICAgIHN0YWNrLnB1c2gocm9vdCk7XHJcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgbGV0IG5vZGUgPSBzdGFjay5wb3AoKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZCk7XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk9yZGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBkZWZhdWx0QXJyID0gW107XHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcbiAgICAgICAgaWYgKCFyb290KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBub2RlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcblxyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBzdGFjay5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdoaWxlKHN0YWNrLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgbm9kZSA9IHN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmRlZmF1bHRGdW5jKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIW5vZGUubGVmdENoaWxkICYmICFub2RlLnJpZ2h0Q2hpbGQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZCk7XHJcbiAgICAgICAgICAgIC8vd2UgZG8gdGhlc2Ugc3RlcHMgc28gdGhhdCBzYW1lIHZhbHVlcyBkb24ndCBnZXQgYWRkZWQgb3ZlciBhbmQgb3ZlciBhZ2FpblxyXG4gICAgICAgICAgICAvL3NpbmNlIHdlJ3JlIHdvcmtpbmcgd2l0aCBhIHN0YWNrXHJcbiAgICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkID09PSBudWxsKSAgY29udGludWU7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSBzdGFjay5wdXNoKG5vZGUubGVmdENoaWxkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChyb290LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYWxsYmFjay5kZWZhdWx0RnVuYyhyb290LmRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc3RhY2sucHVzaChub2RlKTtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB3aGlsZShzdGFjay5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIG5vZGUgPSBzdGFjay5wb3AoKTtcclxuICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZGVmYXVsdEFyci5wdXNoKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5kZWZhdWx0RnVuYyhub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFub2RlLmxlZnRDaGlsZCAmJiAhbm9kZS5yaWdodENoaWxkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCA9PT0gbnVsbCkgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgc3RhY2sucHVzaChub2RlLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBwb3N0T3JkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBzdGFjayA9IFtdO1xyXG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbm9kZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHN0YWNrLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuICAgICAgICAgIGlmICghbm9kZS5sZWZ0Q2hpbGQgJiYgIW5vZGUucmlnaHRDaGlsZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgICAgLy93ZSBkbyB0aGVzZSBzdGVwcyBzbyB0aGF0IHNhbWUgdmFsdWVzIGRvbid0IGdldCBhZGRlZCBvdmVyIGFuZCBvdmVyIGFnYWluXHJcbiAgICAgICAgICAgIC8vc2luY2Ugd2UncmUgd29ya2luZyB3aXRoIGEgc3RhY2tcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgPT09IG51bGwpICBjb250aW51ZTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVmYXVsdEFyci5wdXNoKHJvb3QuZGF0YSk7XHJcblxyXG4gICAgICAgIG5vZGUgPSByb290LmxlZnRDaGlsZDtcclxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc3RhY2sucHVzaChub2RlKTtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB3aGlsZShzdGFjay5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIG5vZGUgPSBzdGFjay5wb3AoKTtcclxuICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpO1xyXG4gICAgICAgICAgaWYgKCFub2RlLmxlZnRDaGlsZCAmJiAhbm9kZS5yaWdodENoaWxkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCA9PT0gbnVsbCkgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgc3RhY2sucHVzaChub2RlLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBoZWlnaHQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG5vZGU7XHJcbiAgICAgICAgbGV0IGhlaWdodE51bSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3QubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiByb290LmRhdGEpIHtcclxuICAgICAgICAgIG5vZGUgPSByb290LnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vZGUgPSByb290O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdoaWxlIChub2RlLmRhdGEgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoZWlnaHROdW0rKztcclxuICAgICAgICB3aGlsZSAodHJ1ZSl7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgIGhlaWdodE51bSsrO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgIGhlaWdodE51bSsrO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodE51bTtcclxuICAgICAgfSxcclxuICAgICAgZGVwdGg6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGRlcHRoTnVtID0gMDtcclxuICAgICAgICBsZXQgbm9kZSA9IHJvb3Q7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBub2RlLmRhdGEpIHJldHVybiBkZXB0aE51bTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9kZSA9IG5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBkZXB0aE51bSsrO1xyXG5cclxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gbm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICBkZXB0aE51bSsrO1xyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgbm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcHRoTnVtO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0LCAxMDAsIDIwMCwgMzAwLCA0MDAsIDUwMCwgNjAwLCBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbm1lcmdlU29ydCgwLCBudW1iZXJzQXJyLmxlbmd0aC0xLCBudW1iZXJzQXJyKVxyXG5udW1iZXJzQXJyID0gcmVtb3ZlRHVwbGljYXRlcyhudW1iZXJzQXJyKVxyXG5jb25zb2xlLmxvZyhudW1iZXJzQXJyKVxyXG5cclxuXHJcbmxldCBpZGVrID0gVHJlZShudW1iZXJzQXJyKTtcclxuY29uc29sZS5sb2coaWRlay5yb290KVxyXG5jb25zb2xlLmxvZyhpZGVrLmluT3JkZXIoKSlcclxuLy8gY29uc29sZS5sb2coaWRlay5pbk9yZGVyKGlkZWsuZGlzcGxheU5vZGVzKCkpKVxyXG5jb25zb2xlLmxvZyhpZGVrLmRlcHRoKDMyNCkpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9