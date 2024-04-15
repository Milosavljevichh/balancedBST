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
        while (subtree.leftChild != null || subtree.rightChild != null) {

          //return if value is a duplicate
          if (value === subtree.data) return;

          if (value < subtree.data) {
            subtree = subtree.leftChild;
          } else {
            subtree = subtree.rightChild;
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
      isBalanced: function(node) {
        //is balanced if height of left subtree and right subtree is not more than 1
        //the leaf nodes dont have any children

        let balanced = true;
        let h1 = 0;
        let h2 = 0;

        if (node === null) return balanced;

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

        balanced = this.isBalanced(node.leftChild);
        if (balanced === false) return balanced;
        balanced = this.isBalanced(node.rightChild);
        if (balanced === false) return balanced;

        return balanced;
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
console.log(idek.postOrder())
console.log(idek.inOrder())
idek.delete(200)
idek.delete(100)
console.log(idek.root)
console.log(idek.isBalanced(idek.root))

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZnVuY3Rpb24gTm9kZShkYXRhLGxlZnRDaGlsZCwgcmlnaHRDaGlsZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgbGVmdENoaWxkOiBsZWZ0Q2hpbGQsXHJcbiAgICAgICAgcmlnaHRDaGlsZDpyaWdodENoaWxkXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUcmVlKGFycil7XHJcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAvL3Nob3VsZCByZXR1cm4gbHZsMCByb290IG5vZGVcclxuXHJcbiAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcblxyXG4gICAgLy9iYXNlIGNhc2UgZm9yIGV4aXRpbmcgb3V0IG9mIHJlY3Vyc2lvblxyXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAvL3NldHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBhcnJheSBhcyB0aGUgcm9vdFxyXG4gICAgbGV0IHJvb3QgPSBhcnJbbWlkXTtcclxuXHJcbiAgICAvL2ZpbmRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheSBhbmQgc2V0cyBpdCBhcyByb290XHJcbiAgICBsZXQgbGVmdENoaWxkID0gYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZC0xKTtcclxuICAgIC8vZG9lcyB0aGUgc2FtZSBmb3IgdGhlIHJpZ2h0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgcmlnaHRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIG1pZCsxLCBlbmQpO1xyXG4gICAgbGV0IG5vZGUgPSBOb2RlKHJvb3QsIGxlZnRDaGlsZCwgcmlnaHRDaGlsZCk7XHJcblxyXG4gICAgLy9wcmludHMgb3V0IGEgdmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0cmVlXHJcbiAgICBwcmV0dHlQcmludChub2RlKVxyXG4gICAgY29uc29sZS5sb2coJyAnKVxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfTtcclxuICBcclxuICAvL3Jvb3QgdXNlcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGJ1aWxkVHJlZSBmdW5jXHJcbiAgbGV0IHJvb3QgPSBidWlsZFRyZWUoYXJyLCAwLCBhcnIubGVuZ3RoIC0gMSlcclxuICBcclxuICAgIHJldHVybntcclxuICAgICAgcm9vdCxcclxuICAgICAgaW5zZXJ0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIC8vd2Ugb25seSBpbnNlcnQgYXMgYSAnbGVhZicgb2YgdGhlIHRyZWUgXHJcbiAgICAgICAgLy9XRSBORVZFUiBSRS1BUlJBTkdFXHJcblxyXG4gICAgICAgIGxldCBzdWJ0cmVlO1xyXG5cclxuICAgICAgICAvL3JldHVybiBpZiB2YWx1ZSBpcyBhIGR1cGxpY2F0ZVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gcm9vdC5kYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgLy93ZSBjaGVjayB3aGljaCBzdWJ0cmVlIHdlJ2xsIGdvIHRvIGZpcnN0XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgcm9vdC5kYXRhKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvL2xvb3BzIHVudGlsIG9uZSBvZiB0aGUgc3VidHJlZXMgaXMgbnVsbFxyXG4gICAgICAgIHdoaWxlIChzdWJ0cmVlLmxlZnRDaGlsZCAhPSBudWxsIHx8IHN1YnRyZWUucmlnaHRDaGlsZCAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgLy9yZXR1cm4gaWYgdmFsdWUgaXMgYSBkdXBsaWNhdGVcclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3VidHJlZS5kYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICAvL2RldGVybWluZSBpZiB0aGUgdmFsdWUgc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IHN1YnRyZWVcclxuICAgICAgICAvL29yIHJpZ2h0IHN1YnRyZWUgXHJcbiAgICAgICAgbGV0IG5vZGUgPSBOb2RlKHZhbHVlLCBudWxsLCBudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgZGVsZXRlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgbGV0IHJlbW92YWJsZVZhciA9IHJvb3Q7XHJcbiAgICAgICBsZXQgcGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAvL3dlIGxvb3AgdGhyb3VnaCB0aGUgdHJlZSB1bnRpbCB3ZSBmaW5kIG91ciB2YWx1ZVxyXG4gICAgICAgd2hpbGUgKHJlbW92YWJsZVZhci5kYXRhICE9PSB2YWx1ZSkge1xyXG5cclxuICAgICAgICAvL0xPT1AgVEhST1VHSCBUSEUgVFJFRSBVTlRJTCBXRSBGSU5EIFRIRSBWQUxVRVxyXG4gICAgICAgIC8vd2Uga2VlcCB0aGUgcGFyZW50IHN0b3JlZCwgc28gdGhhdCBsYXRlciB3ZSBjYW4gcmVtb3ZlIHRoZSBub2RlXHJcbiAgICAgICAgcGFyZW50Tm9kZSA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAvL2lmIG5vZGVzIHZhbHVlIGlzIHNtYWxsZXIgdGhhbiBzZWFyY2hlZCB2YWx1ZSwgZ28gbGVmdFxyXG4gICAgICAgIGlmIChyZW1vdmFibGVWYXIuZGF0YSA+IHZhbHVlKSB7XHJcbiAgICAgICAgICByZW1vdmFibGVWYXIgPSByZW1vdmFibGVWYXIubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2Vsc2UsIGdvIHJpZ2h0XHJcbiAgICAgICAgICByZW1vdmFibGVWYXIgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgfTtcclxuXHJcbiAgICAgICAvL1JFTU9WRSBDQVNFUyBGT1IgTEVGVCBDSElMRFxyXG4gICAgICAgLy9jaGVjayBpZiBsZWZ0IG5vZGUgaXNudCBudWxsXHJcbiAgICAgICBpZiAocGFyZW50Tm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgaWYgKHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgLy9DQVNFIDFcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgYm90aCBjaGlsZHJlbiBhcmUgbnVsbFxyXG4gICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgPT09IG51bGwgJiYgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vQ0FTRSAyXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGEgbm9kZSBoYXMgT05MWSBvbmUgY2hpbGRcclxuICAgICAgICAgIGlmICgocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiAhcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpIHx8ICghcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiByZW1vdmFibGVWYXIucmlnaHRDaGlsZCkpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgIC8vd2UgY2hlY2sgd2hldGhlciBpdCBoYXMgYSByaWdodCBvciBhIGxlZnQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9DQVNFM1xyXG4gICAgICAgICAgLy9pZiBub2RlIGhhcyAyIGNoaWxkcmVuLCB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgY2hpbGQgb2YgaXRzIHJpZ2h0IHN1YnRyZWVcclxuICAgICAgICAgIGxldCBtb3N0TGVmdE5vZGUgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgIGxldCBtb3N0TGVmdFBhcmVudDtcclxuXHJcbiAgICAgICAgICAvL2lmIHRoZSByaWdodCBzdWJ0cmVlIGhhcyBubyBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAvL3dlIGdldCB0aGUgcmlnaHQgc3VidHJlZXMgcGFyZW50XHJcbiAgICAgICAgICAvL3dlIHNldCB0aGUgcmVtb3ZhYmxlIGVsZW1lbnQgdG8gdGhhdCByaWdodCBzdWJ0cmVlcyB2YWx1ZVxyXG4gICAgICAgICAgLy93ZSBkZWxldGUgdGhhdCByaWdodCBzdWJ0cmVlIG5vZGVcclxuICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAgICAgLy9pZiBpdCBoYXMgbm8gbGVmdCBhbmQgbm8gcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdFBhcmVudC5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgLy9lbHNlIGlmIGl0IGhhcyBhIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSAgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3aGlsZSAobW9zdExlZnROb2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IG1vc3RMZWZ0Tm9kZTtcclxuICAgICAgICAgICAgbW9zdExlZnROb2RlID0gbW9zdExlZnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvL2FmdGVyIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBub2RlLCB3ZSBoYXZlIHRpcyBwYXJlbnQgc28gdGhhdCB3ZSBjYW4gZGVsZXRlIGl0XHJcbiAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICBtb3N0TGVmdFBhcmVudC5sZWZ0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICAgfSBcclxuICAgICAgIH1cclxuXHJcbiAgICAgICAvL1JFTU9WRSBDQVNFUyBGT1IgUklHSFQgQ0hJTERcclxuICAgICAgIC8vY2hlY2sgaWYgcmlnaHQgbm9kZSBpc250IG51bGxcclxuICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vQ0FTRSAxXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGJvdGggY2hpbGRyZW4gYXJlIG51bGxcclxuICAgICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkID09PSBudWxsICYmIHBhcmVudE5vZGUucmlnaHRDaGlsZC5yaWdodENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9DQVNFIDJcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgYSBub2RlIGhhcyBPTkxZIG9uZSBjaGlsZFxyXG4gICAgICAgICAgaWYgKChyZW1vdmFibGVWYXIubGVmdENoaWxkICYmICFyZW1vdmFibGVWYXIucmlnaHRDaGlsZCkgfHwgKCFyZW1vdmFibGVWYXIubGVmdENoaWxkICYmIHJlbW92YWJsZVZhci5yaWdodENoaWxkKSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgLy93ZSBjaGVjayB3aGV0aGVyIGl0IGhhcyBhIHJpZ2h0IG9yIGEgbGVmdCBjaGlsZFxyXG4gICAgICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIubGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vQ0FTRTNcclxuICAgICAgICAgIC8vaWYgbm9kZSBoYXMgMiBjaGlsZHJlbiwgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IGNoaWxkIG9mIGl0cyByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgICBsZXQgbW9zdExlZnROb2RlID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICBsZXQgbW9zdExlZnRQYXJlbnQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vaWYgdGhlIHJpZ2h0IHN1YnRyZWUgaGFzIG5vIGxlZnQgY2hpbGRcclxuICAgICAgICAgIC8vd2UgZ2V0IHRoZSByaWdodCBzdWJ0cmVlcyBwYXJlbnRcclxuICAgICAgICAgIC8vd2Ugc2V0IHRoZSByZW1vdmFibGUgZWxlbWVudCB0byB0aGF0IHJpZ2h0IHN1YnRyZWVzIHZhbHVlXHJcbiAgICAgICAgICAvL3dlIGRlbGV0ZSB0aGF0IHJpZ2h0IHN1YnRyZWUgbm9kZVxyXG4gICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50ID0gcmVtb3ZhYmxlVmFyO1xyXG4gICAgICAgICAgICAvL2lmIGl0IGhhcyBubyBsZWZ0IGFuZCBubyByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdFBhcmVudC5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgLy9lbHNlIGlmIGl0IGhhcyBhIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHdoaWxlIChtb3N0TGVmdE5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50ID0gbW9zdExlZnROb2RlO1xyXG4gICAgICAgICAgICBtb3N0TGVmdE5vZGUgPSBtb3N0TGVmdE5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIC8vYWZ0ZXIgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IG5vZGUsIHdlIGhhdmUgdGlzIHBhcmVudCBzbyB0aGF0IHdlIGNhbiBkZWxldGUgaXRcclxuICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICBtb3N0TGVmdFBhcmVudC5sZWZ0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZpbmQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gcm9vdDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLmRhdGEgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPiBjdXJyZW50Tm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSBudWxsKSByZXR1cm4gXCJOb2RlIGRvZXNuJ3QgZXhpc3RcIjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudE5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc3BsYXlOb2RlczogZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcclxuICAgICAgICBmdW5jdGlvbiBkZWZhdWx0RnVuYyhub2RlKSB7XHJcbiAgICAgICAgICBub2RlICs9IDE7XHJcbiAgICAgICAgICB2YWx1ZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHZhbHVlcywgZGVmYXVsdEZ1bmNcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGxldmVsT3JkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICAvL1dyaXRlIGEgbGV2ZWxPcmRlcihjYWxsYmFjaykgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFzIGl0cyBwYXJhbWV0ZXIuXHJcbiAgICAgICAgLy9UaGUgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxyXG5cclxuICAgICAgICAvL2xldmVsT3JkZXIgc2hvdWxkIHRyYXZlcnNlIHRoZSB0cmVlIGluIGJyZWFkdGgtZmlyc3QgbGV2ZWwgb3JkZXIgYW5kIHByb3ZpZGUgZWFjaCBub2RlIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBjYWxsYmFjay5cclxuICAgICAgICAvL0FzIGEgcmVzdWx0LCB0aGUgY2FsbGJhY2sgd2lsbCBwZXJmb3JtIGFuIG9wZXJhdGlvbiBvbiBlYWNoIG5vZGUgZm9sbG93aW5nIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IGFyZSB0cmF2ZXJzZWRcclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBxdWV1ZSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJvb3QpIHJldHVybjtcclxuICAgICAgICBxdWV1ZS5wdXNoKHJvb3QpO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIGxldCBub2RlID0gcXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgdGhlIGNhbGxiYWNrIGlzIHByb3ZpZGVkXHJcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKVxyXG4gICAgICAgICAgICAvL2lmIGl0IGlzbid0IHByb3ZpZGVkLCB3ZSBqdXN0IHB1c2ggdGhlIG5vZGVzIGRhdGEgaW50byBvdXIgYXJyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHF1ZXVlLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCAhPT0gbnVsbCkgcXVldWUucHVzaChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaWYgdGhlcmVzIGEgY2FsbGJhY2ssIHJldHVybiB0aGF0IGNhbGxiYWNrcyBhcnJheSwgaWYgbm90LCByZXR1cm4gZGVmYXVsdEFyclxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgcmV0dXJuIGNhbGxiYWNrLnZhbHVlcztcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEFycjtcclxuICAgICAgfSxcclxuICAgICAgcHJlT3JkZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBkZWZhdWx0QXJyID0gW107XHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFyb290KSByZXR1cm47XHJcbiAgICAgICAgc3RhY2sucHVzaChyb290KTtcclxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IHN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZGVmYXVsdEFyci5wdXNoKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5kZWZhdWx0RnVuYyhub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgc3RhY2sucHVzaChub2RlLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjay52YWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3JkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRBcnIgPSBbXTtcclxuICAgICAgICBsZXQgc3RhY2sgPSBbXTtcclxuICAgICAgICBpZiAoIXJvb3QpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSByb290LmxlZnRDaGlsZDtcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHN0YWNrLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghbm9kZS5sZWZ0Q2hpbGQgJiYgIW5vZGUucmlnaHRDaGlsZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgICAgLy93ZSBkbyB0aGVzZSBzdGVwcyBzbyB0aGF0IHNhbWUgdmFsdWVzIGRvbid0IGdldCBhZGRlZCBvdmVyIGFuZCBvdmVyIGFnYWluXHJcbiAgICAgICAgICAgIC8vc2luY2Ugd2UncmUgd29ya2luZyB3aXRoIGEgc3RhY2tcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgPT09IG51bGwpICBjb250aW51ZTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgZGVmYXVsdEFyci5wdXNoKHJvb3QuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNhbGxiYWNrLmRlZmF1bHRGdW5jKHJvb3QuZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlID0gcm9vdC5yaWdodENoaWxkO1xyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBzdGFjay5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHdoaWxlKHN0YWNrLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgbm9kZSA9IHN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmRlZmF1bHRGdW5jKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIW5vZGUubGVmdENoaWxkICYmICFub2RlLnJpZ2h0Q2hpbGQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHRDaGlsZCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkID09PSBudWxsKSAgY29udGludWU7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSBzdGFjay5wdXNoKG5vZGUubGVmdENoaWxkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjay52YWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBvc3RPcmRlcjogZnVuY3Rpb24ocGFzc2VkTm9kZSwgY2FsbGJhY2spe1xyXG4gICAgICAgIGxldCBub2RlXHJcbiAgICAgICAgaWYgKCFwYXNzZWROb2RlKSB7XHJcbiAgICAgICAgICBub2RlID0gcm9vdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9kZSA9IHBhc3NlZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkZWZhdWx0QXJyID0gW107XHJcblxyXG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSBkZWZhdWx0QXJyID0gZGVmYXVsdEFyci5jb25jYXQodGhpcy5wb3N0T3JkZXIobm9kZS5sZWZ0Q2hpbGQsIGNhbGxiYWNrKSk7XHJcbiAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCkgZGVmYXVsdEFyciA9IGRlZmF1bHRBcnIuY29uY2F0KHRoaXMucG9zdE9yZGVyKG5vZGUucmlnaHRDaGlsZCwgY2FsbGJhY2spKTtcclxuXHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge2RlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpO31cclxuICAgICAgICBlbHNlIHtjYWxsYmFjay5kZWZhdWx0RnVuYyhub2RlLmRhdGEpfVxyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjay52YWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGhlaWdodDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgbm9kZTtcclxuICAgICAgICBsZXQgaGVpZ2h0TnVtID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgcm9vdC5kYXRhKSB7XHJcbiAgICAgICAgICBub2RlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbm9kZSA9IHJvb3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vZGUuZGF0YSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8IG5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdoaWxlICh0cnVlKXtcclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0TnVtKys7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0TnVtKys7XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0TnVtO1xyXG4gICAgICB9LFxyXG4gICAgICBkZXB0aDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBsZXQgZGVwdGhOdW0gPSAwO1xyXG4gICAgICAgIGxldCBub2RlID0gcm9vdDtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG5vZGUuZGF0YSkgcmV0dXJuIGRlcHRoTnVtO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcclxuICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaGlsZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGRlcHRoTnVtKys7XHJcblxyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsICYmIHZhbHVlICE9PSBub2RlLmRhdGEpIHtcclxuICAgICAgICAgIGRlcHRoTnVtKys7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPCBub2RlLmRhdGEpIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoaWxkXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGVwdGhOdW07XHJcbiAgICAgIH0sIFxyXG4gICAgICBpc0JhbGFuY2VkOiBmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgLy9pcyBiYWxhbmNlZCBpZiBoZWlnaHQgb2YgbGVmdCBzdWJ0cmVlIGFuZCByaWdodCBzdWJ0cmVlIGlzIG5vdCBtb3JlIHRoYW4gMVxyXG4gICAgICAgIC8vdGhlIGxlYWYgbm9kZXMgZG9udCBoYXZlIGFueSBjaGlsZHJlblxyXG5cclxuICAgICAgICBsZXQgYmFsYW5jZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBoMSA9IDA7XHJcbiAgICAgICAgbGV0IGgyID0gMDtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiBiYWxhbmNlZDtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICBoMSA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdENoaWxkLmRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgIGgyID0gdGhpcy5oZWlnaHQobm9kZS5yaWdodENoaWxkLmRhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICgoaDItaDE+MSkgfHwgKGgxLWgyPjEpKSB7XHJcbiAgICAgICAgICBiYWxhbmNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgcmV0dXJuIGJhbGFuY2VkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmFsYW5jZWQgPSB0aGlzLmlzQmFsYW5jZWQobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIGlmIChiYWxhbmNlZCA9PT0gZmFsc2UpIHJldHVybiBiYWxhbmNlZDtcclxuICAgICAgICBiYWxhbmNlZCA9IHRoaXMuaXNCYWxhbmNlZChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgIGlmIChiYWxhbmNlZCA9PT0gZmFsc2UpIHJldHVybiBiYWxhbmNlZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhbGFuY2VkO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0LCAxMDAsIDIwMCwgMzAwLCA0MDAsIDUwMCwgNjAwLCBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbm1lcmdlU29ydCgwLCBudW1iZXJzQXJyLmxlbmd0aC0xLCBudW1iZXJzQXJyKVxyXG5udW1iZXJzQXJyID0gcmVtb3ZlRHVwbGljYXRlcyhudW1iZXJzQXJyKVxyXG5jb25zb2xlLmxvZyhudW1iZXJzQXJyKVxyXG5cclxuXHJcbmxldCBpZGVrID0gVHJlZShudW1iZXJzQXJyKTtcclxuY29uc29sZS5sb2coaWRlay5wb3N0T3JkZXIoKSlcclxuY29uc29sZS5sb2coaWRlay5pbk9yZGVyKCkpXHJcbmlkZWsuZGVsZXRlKDIwMClcclxuaWRlay5kZWxldGUoMTAwKVxyXG5jb25zb2xlLmxvZyhpZGVrLnJvb3QpXHJcbmNvbnNvbGUubG9nKGlkZWsuaXNCYWxhbmNlZChpZGVrLnJvb3QpKVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=