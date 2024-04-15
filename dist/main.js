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
      postOrder: function(passedNode, callback){
        let node
        if (!passedNode) {
          node = root;
        } else {
          node = passedNode;
        }
        let defaultArr = [];

        if (node === null) return;
        if (node.leftChild) defaultArr = defaultArr.concat(this.postOrder(node.leftChild));
        if (node.rightChild) defaultArr = defaultArr.concat(this.postOrder(node.rightChild));
        defaultArr.push(node.data);

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
console.log(idek.postOrder())
// console.log(idek.inOrder(idek.displayNodes()))
console.log(idek.depth(324))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTyxFQUFFLHlCQUF5QjtBQUN4RTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUNqRTtBQUNBLHFDQUFxQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQTtBQUNBLFVBQVUsZUFBZTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIE5vZGUoZGF0YSxsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGxlZnRDaGlsZDogbGVmdENoaWxkLFxyXG4gICAgICAgIHJpZ2h0Q2hpbGQ6cmlnaHRDaGlsZFxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVHJlZShhcnIpe1xyXG4gIGZ1bmN0aW9uIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpe1xyXG4gICAgLy9zaG91bGQgcmV0dXJuIGx2bDAgcm9vdCBub2RlXHJcblxyXG4gICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpO1xyXG5cclxuICAgIC8vYmFzZSBjYXNlIGZvciBleGl0aW5nIG91dCBvZiByZWN1cnNpb25cclxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgLy9zZXRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgYXJyYXkgYXMgdGhlIHJvb3RcclxuICAgIGxldCByb290ID0gYXJyW21pZF07XHJcblxyXG4gICAgLy9maW5kcyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGxlZnQgaGFsZiBvZiB0aGUgYXJyYXkgYW5kIHNldHMgaXQgYXMgcm9vdFxyXG4gICAgbGV0IGxlZnRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBtaWQtMSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhsZWZ0Q2hpbGQpXHJcbiAgICAvLyBpZiAobGVmdENoaWxkICE9PSBudWxsICYmIGxlZnRDaGlsZC5kYXRhID09PSByb290KSB7XHJcbiAgICAvLyAgIC8vIGxldCB0ZW1wTm9kZSA9IGxlZnRDaGlsZC5yaWdodENoaWxkO1xyXG4gICAgLy8gICAvLyBsZWZ0Q2hpbGQgPSBsZWZ0Q2hpbGQubGVmdENoaWxkO1xyXG4gICAgLy8gICAvLyBsZWZ0Q2hpbGQucmlnaHRDaGlsZCA9IHRlbXBOb2RlO1xyXG5cclxuICAgIC8vIH07XHJcbiAgICAvL2RvZXMgdGhlIHNhbWUgZm9yIHRoZSByaWdodCBoYWxmIG9mIHRoZSBhcnJheVxyXG4gICAgbGV0IHJpZ2h0Q2hpbGQgPSBidWlsZFRyZWUoYXJyLCBtaWQrMSwgZW5kKTtcclxuICAgIC8vIGlmIChyaWdodENoaWxkLmRhdGEgPT09IHJvb3QpIHtyaWdodENoaWxkID0gcmlnaHRDaGlsZC5sZWZ0Q2hpbGR9O1xyXG4gICAgbGV0IG5vZGUgPSBOb2RlKHJvb3QsIGxlZnRDaGlsZCwgcmlnaHRDaGlsZCk7XHJcblxyXG4gICAgLy9wcmludHMgb3V0IGEgdmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0cmVlXHJcbiAgICBwcmV0dHlQcmludChub2RlKVxyXG4gICAgY29uc29sZS5sb2coJyAnKVxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfTtcclxuICBcclxuICAvL3Jvb3QgdXNlcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGJ1aWxkVHJlZSBmdW5jXHJcbiAgbGV0IHJvb3QgPSBidWlsZFRyZWUoYXJyLCAwLCBhcnIubGVuZ3RoIC0gMSlcclxuICBcclxuICAgIHJldHVybntcclxuICAgICAgcm9vdCxcclxuICAgICAgaW5zZXJ0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIC8vd2Ugb25seSBpbnNlcnQgYXMgYSAnbGVhZicgb2YgdGhlIHRyZWUgXHJcbiAgICAgICAgLy9XRSBORVZFUiBSRS1BUlJBTkdFXHJcblxyXG4gICAgICAgIGxldCBzdWJ0cmVlO1xyXG5cclxuICAgICAgICAvL3JldHVybiBpZiB2YWx1ZSBpcyBhIGR1cGxpY2F0ZVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gcm9vdC5kYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgLy93ZSBjaGVjayB3aGljaCBzdWJ0cmVlIHdlJ2xsIGdvIHRvIGZpcnN0XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgcm9vdC5kYXRhKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvL2xvb3BzIHVudGlsIG9uZSBvZiB0aGUgc3VidHJlZXMgaXMgbnVsbFxyXG4gICAgICAgIHdoaWxlIChzdWJ0cmVlLmxlZnRDaGlsZCAhPSBudWxsICYmIHN1YnRyZWUucmlnaHRDaGlsZCAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgLy9yZXR1cm4gaWYgdmFsdWUgaXMgYSBkdXBsaWNhdGVcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3VidHJlZS5sZWZ0Q2hpbGQuZGF0YSB8fCB2YWx1ZSA9PT0gc3VidHJlZS5yaWdodENoaWxkLmRhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICBpZiAodmFsdWUgPCBzdWJ0cmVlLmRhdGEpIHtcclxuICAgICAgICAgICAgc3VidHJlZSA9IHN1YnRyZWUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3VidHJlZSA9IHN1YnRyZWUucmlnaHRDaGlsZDtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIC8vZGV0ZXJtaW5lIGlmIHRoZSB2YWx1ZSBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIGxlZnQgc3VidHJlZVxyXG4gICAgICAgIC8vb3IgcmlnaHQgc3VidHJlZSBcclxuICAgICAgICBsZXQgbm9kZSA9IE5vZGUodmFsdWUsIG51bGwsIG51bGwpO1xyXG5cclxuICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQgPT09IG51bGwpIHtcclxuICAgICAgICAgIHN1YnRyZWUubGVmdENoaWxkID0gbm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VidHJlZS5yaWdodENoaWxkID0gbm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgICBkZWxldGU6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICBsZXQgcmVtb3ZhYmxlVmFyID0gcm9vdDtcclxuICAgICAgIGxldCBwYXJlbnROb2RlO1xyXG5cclxuICAgICAgIC8vd2UgbG9vcCB0aHJvdWdoIHRoZSB0cmVlIHVudGlsIHdlIGZpbmQgb3VyIHZhbHVlXHJcbiAgICAgICB3aGlsZSAocmVtb3ZhYmxlVmFyLmRhdGEgIT09IHZhbHVlKSB7XHJcblxyXG4gICAgICAgIC8vTE9PUCBUSFJPVUdIIFRIRSBUUkVFIFVOVElMIFdFIEZJTkQgVEhFIFZBTFVFXHJcbiAgICAgICAgLy93ZSBrZWVwIHRoZSBwYXJlbnQgc3RvcmVkLCBzbyB0aGF0IGxhdGVyIHdlIGNhbiByZW1vdmUgdGhlIG5vZGVcclxuICAgICAgICBwYXJlbnROb2RlID0gcmVtb3ZhYmxlVmFyO1xyXG4gICAgICAgIC8vaWYgbm9kZXMgdmFsdWUgaXMgc21hbGxlciB0aGFuIHNlYXJjaGVkIHZhbHVlLCBnbyBsZWZ0XHJcbiAgICAgICAgaWYgKHJlbW92YWJsZVZhci5kYXRhID4gdmFsdWUpIHtcclxuICAgICAgICAgIHJlbW92YWJsZVZhciA9IHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vZWxzZSwgZ28gcmlnaHRcclxuICAgICAgICAgIHJlbW92YWJsZVZhciA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICB9O1xyXG5cclxuICAgICAgIC8vUkVNT1ZFIENBU0VTIEZPUiBMRUZUIENISUxEXHJcbiAgICAgICAvL2NoZWNrIGlmIGxlZnQgbm9kZSBpc250IG51bGxcclxuICAgICAgIGlmIChwYXJlbnROb2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICBpZiAocGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAvL0NBU0UgMVxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBib3RoIGNoaWxkcmVuIGFyZSBudWxsXHJcbiAgICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCA9PT0gbnVsbCAmJiByZW1vdmFibGVWYXIucmlnaHRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9DQVNFIDJcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgYSBub2RlIGhhcyBPTkxZIG9uZSBjaGlsZFxyXG4gICAgICAgICAgaWYgKChyZW1vdmFibGVWYXIubGVmdENoaWxkICYmICFyZW1vdmFibGVWYXIucmlnaHRDaGlsZCkgfHwgKCFyZW1vdmFibGVWYXIubGVmdENoaWxkICYmIHJlbW92YWJsZVZhci5yaWdodENoaWxkKSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgLy93ZSBjaGVjayB3aGV0aGVyIGl0IGhhcyBhIHJpZ2h0IG9yIGEgbGVmdCBjaGlsZFxyXG4gICAgICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIubGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkID0gc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc2F2ZWRDaGlsZCA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkID0gc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0NBU0UzXHJcbiAgICAgICAgICAvL2lmIG5vZGUgaGFzIDIgY2hpbGRyZW4sIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBjaGlsZCBvZiBpdHMgcmlnaHQgc3VidHJlZVxyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0Tm9kZSA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0UGFyZW50O1xyXG5cclxuICAgICAgICAgIC8vaWYgdGhlIHJpZ2h0IHN1YnRyZWUgaGFzIG5vIGxlZnQgY2hpbGRcclxuICAgICAgICAgIC8vd2UgZ2V0IHRoZSByaWdodCBzdWJ0cmVlcyBwYXJlbnRcclxuICAgICAgICAgIC8vd2Ugc2V0IHRoZSByZW1vdmFibGUgZWxlbWVudCB0byB0aGF0IHJpZ2h0IHN1YnRyZWVzIHZhbHVlXHJcbiAgICAgICAgICAvL3dlIGRlbGV0ZSB0aGF0IHJpZ2h0IHN1YnRyZWUgbm9kZVxyXG4gICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50ID0gcmVtb3ZhYmxlVmFyO1xyXG4gICAgICAgICAgICAvL2lmIGl0IGhhcyBubyBsZWZ0IGFuZCBubyByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAvL2Vsc2UgaWYgaXQgaGFzIGEgcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtb3N0TGVmdFBhcmVudC5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZC5kYXRhO1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhICA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHdoaWxlIChtb3N0TGVmdE5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50ID0gbW9zdExlZnROb2RlO1xyXG4gICAgICAgICAgICBtb3N0TGVmdE5vZGUgPSBtb3N0TGVmdE5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIC8vYWZ0ZXIgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IG5vZGUsIHdlIGhhdmUgdGlzIHBhcmVudCBzbyB0aGF0IHdlIGNhbiBkZWxldGUgaXRcclxuICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LmxlZnRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgICB9IFxyXG4gICAgICAgfVxyXG5cclxuICAgICAgIC8vUkVNT1ZFIENBU0VTIEZPUiBSSUdIVCBDSElMRFxyXG4gICAgICAgLy9jaGVjayBpZiByaWdodCBub2RlIGlzbnQgbnVsbFxyXG4gICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Q2hpbGQuZGF0YSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy9DQVNFIDFcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgYm90aCBjaGlsZHJlbiBhcmUgbnVsbFxyXG4gICAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgPT09IG51bGwgJiYgcGFyZW50Tm9kZS5yaWdodENoaWxkLnJpZ2h0Q2hpbGQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvL0NBU0UgMlxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBhIG5vZGUgaGFzIE9OTFkgb25lIGNoaWxkXHJcbiAgICAgICAgICBpZiAoKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgIXJlbW92YWJsZVZhci5yaWdodENoaWxkKSB8fCAoIXJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAvL3dlIGNoZWNrIHdoZXRoZXIgaXQgaGFzIGEgcmlnaHQgb3IgYSBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgc2F2ZWRDaGlsZCA9IHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkID0gc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc2F2ZWRDaGlsZCA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9DQVNFM1xyXG4gICAgICAgICAgLy9pZiBub2RlIGhhcyAyIGNoaWxkcmVuLCB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgY2hpbGQgb2YgaXRzIHJpZ2h0IHN1YnRyZWVcclxuICAgICAgICAgIGxldCBtb3N0TGVmdE5vZGUgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgIGxldCBtb3N0TGVmdFBhcmVudDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy9pZiB0aGUgcmlnaHQgc3VidHJlZSBoYXMgbm8gbGVmdCBjaGlsZFxyXG4gICAgICAgICAgLy93ZSBnZXQgdGhlIHJpZ2h0IHN1YnRyZWVzIHBhcmVudFxyXG4gICAgICAgICAgLy93ZSBzZXQgdGhlIHJlbW92YWJsZSBlbGVtZW50IHRvIHRoYXQgcmlnaHQgc3VidHJlZXMgdmFsdWVcclxuICAgICAgICAgIC8vd2UgZGVsZXRlIHRoYXQgcmlnaHQgc3VidHJlZSBub2RlXHJcbiAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgICAgIC8vaWYgaXQgaGFzIG5vIGxlZnQgYW5kIG5vIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAvL2Vsc2UgaWYgaXQgaGFzIGEgcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQuZGF0YSAgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICByZW1vdmFibGVWYXIucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2hpbGUgKG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSBtb3N0TGVmdE5vZGU7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZSA9IG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy9hZnRlciB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgbm9kZSwgd2UgaGF2ZSB0aXMgcGFyZW50IHNvIHRoYXQgd2UgY2FuIGRlbGV0ZSBpdFxyXG4gICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LmxlZnRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmluZDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSByb290O1xyXG5cclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUuZGF0YSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA+IGN1cnJlbnROb2RlLmRhdGEpIHtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IG51bGwpIHJldHVybiBcIk5vZGUgZG9lc24ndCBleGlzdFwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcclxuICAgICAgfSxcclxuICAgICAgZGlzcGxheU5vZGVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xyXG4gICAgICAgIGZ1bmN0aW9uIGRlZmF1bHRGdW5jKG5vZGUpIHtcclxuICAgICAgICAgIG5vZGUgKz0gMTtcclxuICAgICAgICAgIHZhbHVlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdmFsdWVzLCBkZWZhdWx0RnVuY1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbGV2ZWxPcmRlcjogZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICAgIC8vV3JpdGUgYSBsZXZlbE9yZGVyKGNhbGxiYWNrKSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gYXMgaXRzIHBhcmFtZXRlci5cclxuICAgICAgICAvL1RoZSBtZXRob2Qgc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXHJcblxyXG4gICAgICAgIC8vbGV2ZWxPcmRlciBzaG91bGQgdHJhdmVyc2UgdGhlIHRyZWUgaW4gYnJlYWR0aC1maXJzdCBsZXZlbCBvcmRlciBhbmQgcHJvdmlkZSBlYWNoIG5vZGUgYXMgYW4gYXJndW1lbnQgdG8gdGhlIGNhbGxiYWNrLlxyXG4gICAgICAgIC8vQXMgYSByZXN1bHQsIHRoZSBjYWxsYmFjayB3aWxsIHBlcmZvcm0gYW4gb3BlcmF0aW9uIG9uIGVhY2ggbm9kZSBmb2xsb3dpbmcgdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgYXJlIHRyYXZlcnNlZFxyXG4gICAgICAgIGxldCBkZWZhdWx0QXJyID0gW107XHJcbiAgICAgICAgbGV0IHF1ZXVlID0gW107XHJcblxyXG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuO1xyXG4gICAgICAgIHF1ZXVlLnB1c2gocm9vdCk7XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgbGV0IG5vZGUgPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiB0aGUgY2FsbGJhY2sgaXMgcHJvdmlkZWRcclxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5kZWZhdWx0RnVuYyhub2RlLmRhdGEpXHJcbiAgICAgICAgICAgIC8vaWYgaXQgaXNuJ3QgcHJvdmlkZWQsIHdlIGp1c3QgcHVzaCB0aGUgbm9kZXMgZGF0YSBpbnRvIG91ciBhcnJcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdEFyci5wdXNoKG5vZGUuZGF0YSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkgcXVldWUucHVzaChub2RlLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSBxdWV1ZS5wdXNoKG5vZGUucmlnaHRDaGlsZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pZiB0aGVyZXMgYSBjYWxsYmFjaywgcmV0dXJuIHRoYXQgY2FsbGJhY2tzIGFycmF5LCBpZiBub3QsIHJldHVybiBkZWZhdWx0QXJyXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2sudmFsdWVzO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0QXJyO1xyXG4gICAgICB9LFxyXG4gICAgICBwcmVPcmRlcjogZnVuY3Rpb24oIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRBcnIgPSBbXTtcclxuICAgICAgICBsZXQgc3RhY2sgPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXJvb3QpIHJldHVybjtcclxuICAgICAgICBzdGFjay5wdXNoKHJvb3QpO1xyXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIGxldCBub2RlID0gc3RhY2sucG9wKCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmRlZmF1bHRGdW5jKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCkgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSBzdGFjay5wdXNoKG5vZGUubGVmdENoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgcmV0dXJuIGNhbGxiYWNrLnZhbHVlcztcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEFycjtcclxuICAgICAgfSxcclxuICAgICAgaW5PcmRlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBzdGFjayA9IFtdO1xyXG4gICAgICAgIGlmICghcm9vdCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbm9kZSA9IHJvb3QubGVmdENoaWxkO1xyXG5cclxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc3RhY2sucHVzaChub2RlKTtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB3aGlsZShzdGFjay5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIG5vZGUgPSBzdGFjay5wb3AoKTtcclxuICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZGVmYXVsdEFyci5wdXNoKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5kZWZhdWx0RnVuYyhub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFub2RlLmxlZnRDaGlsZCAmJiAhbm9kZS5yaWdodENoaWxkKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgICAgICAvL3dlIGRvIHRoZXNlIHN0ZXBzIHNvIHRoYXQgc2FtZSB2YWx1ZXMgZG9uJ3QgZ2V0IGFkZGVkIG92ZXIgYW5kIG92ZXIgYWdhaW5cclxuICAgICAgICAgICAgLy9zaW5jZSB3ZSdyZSB3b3JraW5nIHdpdGggYSBzdGFja1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCA9PT0gbnVsbCkgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgc3RhY2sucHVzaChub2RlLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gocm9vdC5kYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMocm9vdC5kYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUgPSByb290LnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHN0YWNrLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghbm9kZS5sZWZ0Q2hpbGQgJiYgIW5vZGUucmlnaHRDaGlsZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgPT09IG51bGwpICBjb250aW51ZTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgcmV0dXJuIGNhbGxiYWNrLnZhbHVlcztcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEFycjtcclxuICAgICAgfSxcclxuICAgICAgcG9zdE9yZGVyOiBmdW5jdGlvbihwYXNzZWROb2RlLCBjYWxsYmFjayl7XHJcbiAgICAgICAgbGV0IG5vZGVcclxuICAgICAgICBpZiAoIXBhc3NlZE5vZGUpIHtcclxuICAgICAgICAgIG5vZGUgPSByb290O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub2RlID0gcGFzc2VkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRlZmF1bHRBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIGRlZmF1bHRBcnIgPSBkZWZhdWx0QXJyLmNvbmNhdCh0aGlzLnBvc3RPcmRlcihub2RlLmxlZnRDaGlsZCkpO1xyXG4gICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIGRlZmF1bHRBcnIgPSBkZWZhdWx0QXJyLmNvbmNhdCh0aGlzLnBvc3RPcmRlcihub2RlLnJpZ2h0Q2hpbGQpKTtcclxuICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGhlaWdodDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgbm9kZTtcclxuICAgICAgICBsZXQgaGVpZ2h0TnVtID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgcm9vdC5kYXRhKSB7XHJcbiAgICAgICAgICBub2RlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vZGUuZGF0YSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGhlaWdodE51bSsrO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKXtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0TnVtKys7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0TnVtKys7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0TnVtO1xyXG4gICAgICB9LFxyXG4gICAgICBkZXB0aDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgZGVwdGhOdW0gPSAwO1xyXG4gICAgICAgIGxldCBub2RlID0gcm9vdDtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG5vZGUuZGF0YSkgcmV0dXJuIGRlcHRoTnVtO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRlcHRoTnVtKys7XHJcblxyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsICYmIHZhbHVlICE9PSBub2RlLmRhdGEpIHtcclxuICAgICAgICAgIGRlcHRoTnVtKys7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGVwdGhOdW07XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG4vL2NvZGUgZm9yIHZpc3VhbGx5IHJlcHJlc2VudGluZyB0aGUgdHJlZSwgdGFrZXMgcm9vdCBub2RlIGFzIGEgcGFyYW1ldGVyXHJcbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcclxuICAgIGlmIChub2RlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodENoaWxkLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcclxuICAgIGlmIChub2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBwcmV0dHlQcmludChub2RlLmxlZnRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxubGV0IG51bWJlcnNBcnIgPSBbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDEwMCwgMjAwLCAzMDAsIDQwMCwgNTAwLCA2MDAsIF07XHJcblxyXG5cclxuZnVuY3Rpb24gbWVyZ2UobGVmdEFycmF5LCByaWdodEFycmF5LCBsZWZ0TGVuZ3RoLCByaWdodExlbmd0aCwga3MsIGFycmF5VG9Tb3J0KSB7XHJcbiAgbGV0IGkgPSAwLCBqID0gMCwgaz1rcztcclxuICAvL2NvbXBhcmUgYW5kIGNvcHlcclxuICB3aGlsZSAoIGk8IGxlZnRMZW5ndGggJiYgaiA8IHJpZ2h0TGVuZ3RoKSB7XHJcbiAgICAgIGlmIChsZWZ0QXJyYXlbaV0gPCByaWdodEFycmF5W2pdKSB7XHJcbiAgICAgICAgICBhcnJheVRvU29ydFtrKytdID0gbGVmdEFycmF5W2krK107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhcnJheVRvU29ydFtrKytdID0gcmlnaHRBcnJheVtqKytdO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy9jaGVjayBpZiBhbGwgdGhlIGVsZW1lbnRzIGFyZSBzb3J0ZWQgaWYgbm90IGFkZCB0aGVtXHJcbiAgZm9yICggOyBpPGxlZnRMZW5ndGg7IGkrKykge1xyXG4gICAgICBhcnJheVRvU29ydFtrKytdID0gbGVmdEFycmF5W2ldO1xyXG4gIH1cclxuICBmb3IgKCA7IGo8cmlnaHRMZW5ndGg7IGorKykge1xyXG4gICAgICBhcnJheVRvU29ydFtrKytdID0gcmlnaHRBcnJheVtqXTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRBcnJheVJhbmdlKGFycmF5LCBzdGFydEluZGV4LCBlbmRJbmRleCkge1xyXG4gIHJldHVybiBhcnJheS5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCArIDEpO1xyXG59XHJcblxyXG4vL3NwbGl0dGluZyB0aGUgYXJyYXkgaW50byB0aGUgbGVmdCBhbmQgcmlnaHQgaGFsZlxyXG5mdW5jdGlvbiBtZXJnZVNvcnQgKHN0YXJ0LCBlbmQsIGFycmF5VG9Tb3J0KSB7XHJcbiAgaWYgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICBcclxuICAgICAgbGV0IG1pZCA9IChzdGFydCArIGVuZCkgLyAyO1xyXG4gICAgICBtaWQgPSBNYXRoLmZsb29yKG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIGxlZnQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgICAgbWVyZ2VTb3J0KHN0YXJ0LCBtaWQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdExlZnQgPSBnZXRBcnJheVJhbmdlKGFycmF5VG9Tb3J0LCBzdGFydCwgbWlkKTtcclxuXHJcbiAgICAgIC8vZ2V0dGluZyB0aGUgcmlnaHQgaGFsZlxyXG4gICAgICBtZXJnZVNvcnQobWlkKzEsIGVuZCwgYXJyYXlUb1NvcnQpO1xyXG4gICAgICBsZXQgcmVzdWx0UmlnaHQgPSBnZXRBcnJheVJhbmdlKGFycmF5VG9Tb3J0LCBtaWQrMSwgZW5kKTtcclxuICAgICAgbWVyZ2UocmVzdWx0TGVmdCwgcmVzdWx0UmlnaHQsIHJlc3VsdExlZnQubGVuZ3RoLCByZXN1bHRSaWdodC5sZW5ndGgsIHN0YXJ0LCBhcnJheVRvU29ydCk7XHJcbiAgfVxyXG59XHJcblxyXG4vL3JlbW92ZXMgZHVwbGljYXRlIHZhbHVlcyBmcm9tIGFuIGFycmF5XHJcbi8vdGhlIGFycmF5IG5lZWRzIHRvIGJlIFNPUlRFRCBpbiBvcmRlciBmb3IgaXQgdG8gd29ya1xyXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVzKGFycil7XHJcbiAgbGV0IHAgPSBudWxsO1xyXG4gIGxldCBmaWx0ZXJlZEFyciA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoYXJyW2ldID09PSBhcnJbcF0pIHtcclxuICAgICAgY29udGludWVcclxuICAgIH1cclxuICAgIGZpbHRlcmVkQXJyLnB1c2goYXJyW2ldKVxyXG4gICAgcCA9IGk7XHJcbiAgfVxyXG4gIHJldHVybiBmaWx0ZXJlZEFycjtcclxufVxyXG5cclxubWVyZ2VTb3J0KDAsIG51bWJlcnNBcnIubGVuZ3RoLTEsIG51bWJlcnNBcnIpXHJcbm51bWJlcnNBcnIgPSByZW1vdmVEdXBsaWNhdGVzKG51bWJlcnNBcnIpXHJcbmNvbnNvbGUubG9nKG51bWJlcnNBcnIpXHJcblxyXG5cclxubGV0IGlkZWsgPSBUcmVlKG51bWJlcnNBcnIpO1xyXG5jb25zb2xlLmxvZyhpZGVrLnJvb3QpXHJcbmNvbnNvbGUubG9nKGlkZWsucG9zdE9yZGVyKCkpXHJcbi8vIGNvbnNvbGUubG9nKGlkZWsuaW5PcmRlcihpZGVrLmRpc3BsYXlOb2RlcygpKSlcclxuY29uc29sZS5sb2coaWRlay5kZXB0aCgzMjQpKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==