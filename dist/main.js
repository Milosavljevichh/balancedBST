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
        defaultArr.push(root.data);

        node = root.rightChild;
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
console.log(idek.preOrder())
console.log(idek.preOrder(idek.displayNodes()))
console.log(idek.inOrder())
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBOb2RlKGRhdGEsbGVmdENoaWxkLCByaWdodENoaWxkKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBsZWZ0Q2hpbGQ6IGxlZnRDaGlsZCxcclxuICAgICAgICByaWdodENoaWxkOnJpZ2h0Q2hpbGRcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFRyZWUoYXJyKXtcclxuICBmdW5jdGlvbiBidWlsZFRyZWUoYXJyLCBzdGFydCwgZW5kKXtcclxuICAgIC8vc2hvdWxkIHJldHVybiBsdmwwIHJvb3Qgbm9kZVxyXG5cclxuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcclxuXHJcbiAgICAvL2Jhc2UgY2FzZSBmb3IgZXhpdGluZyBvdXQgb2YgcmVjdXJzaW9uXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgIC8vc2V0cyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGFycmF5IGFzIHRoZSByb290XHJcbiAgICBsZXQgcm9vdCA9IGFyclttaWRdO1xyXG5cclxuICAgIC8vZmluZHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5IGFuZCBzZXRzIGl0IGFzIHJvb3RcclxuICAgIGxldCBsZWZ0Q2hpbGQgPSBidWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkLTEpO1xyXG4gICAgLy8gY29uc29sZS5sb2cobGVmdENoaWxkKVxyXG4gICAgLy8gaWYgKGxlZnRDaGlsZCAhPT0gbnVsbCAmJiBsZWZ0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge1xyXG4gICAgLy8gICAvLyBsZXQgdGVtcE5vZGUgPSBsZWZ0Q2hpbGQucmlnaHRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkID0gbGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkLnJpZ2h0Q2hpbGQgPSB0ZW1wTm9kZTtcclxuXHJcbiAgICAvLyB9O1xyXG4gICAgLy9kb2VzIHRoZSBzYW1lIGZvciB0aGUgcmlnaHQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgIGxldCByaWdodENoaWxkID0gYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICAvLyBpZiAocmlnaHRDaGlsZC5kYXRhID09PSByb290KSB7cmlnaHRDaGlsZCA9IHJpZ2h0Q2hpbGQubGVmdENoaWxkfTtcclxuICAgIGxldCBub2RlID0gTm9kZShyb290LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpO1xyXG5cclxuICAgIC8vcHJpbnRzIG91dCBhIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHJlZVxyXG4gICAgcHJldHR5UHJpbnQobm9kZSlcclxuICAgIGNvbnNvbGUubG9nKCcgJylcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH07XHJcbiAgXHJcbiAgLy9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gIGxldCByb290ID0gYnVpbGRUcmVlKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpXHJcbiAgXHJcbiAgICByZXR1cm57XHJcbiAgICAgIHJvb3QsXHJcbiAgICAgIGluc2VydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL3dlIG9ubHkgaW5zZXJ0IGFzIGEgJ2xlYWYnIG9mIHRoZSB0cmVlIFxyXG4gICAgICAgIC8vV0UgTkVWRVIgUkUtQVJSQU5HRVxyXG5cclxuICAgICAgICBsZXQgc3VidHJlZTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gaWYgdmFsdWUgaXMgYSBkdXBsaWNhdGVcclxuICAgICAgICBpZiAodmFsdWUgPT09IHJvb3QuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIC8vd2UgY2hlY2sgd2hpY2ggc3VidHJlZSB3ZSdsbCBnbyB0byBmaXJzdFxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9sb29wcyB1bnRpbCBvbmUgb2YgdGhlIHN1YnRyZWVzIGlzIG51bGxcclxuICAgICAgICB3aGlsZSAoc3VidHJlZS5sZWZ0Q2hpbGQgIT0gbnVsbCAmJiBzdWJ0cmVlLnJpZ2h0Q2hpbGQgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHN1YnRyZWUubGVmdENoaWxkLmRhdGEgfHwgdmFsdWUgPT09IHN1YnRyZWUucmlnaHRDaGlsZC5kYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICAvL2RldGVybWluZSBpZiB0aGUgdmFsdWUgc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IHN1YnRyZWVcclxuICAgICAgICAvL29yIHJpZ2h0IHN1YnRyZWUgXHJcbiAgICAgICAgbGV0IG5vZGUgPSBOb2RlKHZhbHVlLCBudWxsLCBudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgZGVsZXRlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgbGV0IHJlbW92YWJsZVZhciA9IHJvb3Q7XHJcbiAgICAgICBsZXQgcGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAvL3dlIGxvb3AgdGhyb3VnaCB0aGUgdHJlZSB1bnRpbCB3ZSBmaW5kIG91ciB2YWx1ZVxyXG4gICAgICAgd2hpbGUgKHJlbW92YWJsZVZhci5kYXRhICE9PSB2YWx1ZSkge1xyXG5cclxuICAgICAgICAvL0xPT1AgVEhST1VHSCBUSEUgVFJFRSBVTlRJTCBXRSBGSU5EIFRIRSBWQUxVRVxyXG4gICAgICAgIC8vd2Uga2VlcCB0aGUgcGFyZW50IHN0b3JlZCwgc28gdGhhdCBsYXRlciB3ZSBjYW4gcmVtb3ZlIHRoZSBub2RlXHJcbiAgICAgICAgcGFyZW50Tm9kZSA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAvL2lmIG5vZGVzIHZhbHVlIGlzIHNtYWxsZXIgdGhhbiBzZWFyY2hlZCB2YWx1ZSwgZ28gbGVmdFxyXG4gICAgICAgIGlmIChyZW1vdmFibGVWYXIuZGF0YSA+IHZhbHVlKSB7XHJcbiAgICAgICAgICByZW1vdmFibGVWYXIgPSByZW1vdmFibGVWYXIubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2Vsc2UsIGdvIHJpZ2h0XHJcbiAgICAgICAgICByZW1vdmFibGVWYXIgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgfTtcclxuXHJcbiAgICAgICAvL1JFTU9WRSBDQVNFUyBGT1IgTEVGVCBDSElMRFxyXG4gICAgICAgLy9jaGVjayBpZiBsZWZ0IG5vZGUgaXNudCBudWxsXHJcbiAgICAgICBpZiAocGFyZW50Tm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgaWYgKHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgLy9DQVNFIDFcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgYm90aCBjaGlsZHJlbiBhcmUgbnVsbFxyXG4gICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgPT09IG51bGwgJiYgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vQ0FTRSAyXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGEgbm9kZSBoYXMgT05MWSBvbmUgY2hpbGRcclxuICAgICAgICAgIGlmICgocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiAhcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpIHx8ICghcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiByZW1vdmFibGVWYXIucmlnaHRDaGlsZCkpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgIC8vd2UgY2hlY2sgd2hldGhlciBpdCBoYXMgYSByaWdodCBvciBhIGxlZnQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy9DQVNFM1xyXG4gICAgICAgICAgLy9pZiBub2RlIGhhcyAyIGNoaWxkcmVuLCB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgY2hpbGQgb2YgaXRzIHJpZ2h0IHN1YnRyZWVcclxuICAgICAgICAgIGxldCBtb3N0TGVmdE5vZGUgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgIGxldCBtb3N0TGVmdFBhcmVudDtcclxuXHJcbiAgICAgICAgICAvL2lmIHRoZSByaWdodCBzdWJ0cmVlIGhhcyBubyBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAvL3dlIGdldCB0aGUgcmlnaHQgc3VidHJlZXMgcGFyZW50XHJcbiAgICAgICAgICAvL3dlIHNldCB0aGUgcmVtb3ZhYmxlIGVsZW1lbnQgdG8gdGhhdCByaWdodCBzdWJ0cmVlcyB2YWx1ZVxyXG4gICAgICAgICAgLy93ZSBkZWxldGUgdGhhdCByaWdodCBzdWJ0cmVlIG5vZGVcclxuICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAgICAgLy9pZiBpdCBoYXMgbm8gbGVmdCBhbmQgbm8gcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdFBhcmVudC5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgLy9lbHNlIGlmIGl0IGhhcyBhIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSAgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3aGlsZSAobW9zdExlZnROb2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IG1vc3RMZWZ0Tm9kZTtcclxuICAgICAgICAgICAgbW9zdExlZnROb2RlID0gbW9zdExlZnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvL2FmdGVyIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBub2RlLCB3ZSBoYXZlIHRpcyBwYXJlbnQgc28gdGhhdCB3ZSBjYW4gZGVsZXRlIGl0XHJcbiAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICBtb3N0TGVmdFBhcmVudC5sZWZ0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICAgfSBcclxuICAgICAgIH1cclxuXHJcbiAgICAgICAvL1JFTU9WRSBDQVNFUyBGT1IgUklHSFQgQ0hJTERcclxuICAgICAgIC8vY2hlY2sgaWYgcmlnaHQgbm9kZSBpc250IG51bGxcclxuICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vQ0FTRSAxXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGJvdGggY2hpbGRyZW4gYXJlIG51bGxcclxuICAgICAgICAgIGlmIChwYXJlbnROb2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkID09PSBudWxsICYmIHBhcmVudE5vZGUucmlnaHRDaGlsZC5yaWdodENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9DQVNFIDJcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgYSBub2RlIGhhcyBPTkxZIG9uZSBjaGlsZFxyXG4gICAgICAgICAgaWYgKChyZW1vdmFibGVWYXIubGVmdENoaWxkICYmICFyZW1vdmFibGVWYXIucmlnaHRDaGlsZCkgfHwgKCFyZW1vdmFibGVWYXIubGVmdENoaWxkICYmIHJlbW92YWJsZVZhci5yaWdodENoaWxkKSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgLy93ZSBjaGVjayB3aGV0aGVyIGl0IGhhcyBhIHJpZ2h0IG9yIGEgbGVmdCBjaGlsZFxyXG4gICAgICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIubGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZCA9IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNhdmVkQ2hpbGQgPSByZW1vdmFibGVWYXIucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vQ0FTRTNcclxuICAgICAgICAgIC8vaWYgbm9kZSBoYXMgMiBjaGlsZHJlbiwgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IGNoaWxkIG9mIGl0cyByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgICBsZXQgbW9zdExlZnROb2RlID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICBsZXQgbW9zdExlZnRQYXJlbnQ7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vaWYgdGhlIHJpZ2h0IHN1YnRyZWUgaGFzIG5vIGxlZnQgY2hpbGRcclxuICAgICAgICAgIC8vd2UgZ2V0IHRoZSByaWdodCBzdWJ0cmVlcyBwYXJlbnRcclxuICAgICAgICAgIC8vd2Ugc2V0IHRoZSByZW1vdmFibGUgZWxlbWVudCB0byB0aGF0IHJpZ2h0IHN1YnRyZWVzIHZhbHVlXHJcbiAgICAgICAgICAvL3dlIGRlbGV0ZSB0aGF0IHJpZ2h0IHN1YnRyZWUgbm9kZVxyXG4gICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50ID0gcmVtb3ZhYmxlVmFyO1xyXG4gICAgICAgICAgICAvL2lmIGl0IGhhcyBubyBsZWZ0IGFuZCBubyByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUuZGF0YTtcclxuICAgICAgICAgICAgICBtb3N0TGVmdFBhcmVudC5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgLy9lbHNlIGlmIGl0IGhhcyBhIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkLmRhdGEgID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHdoaWxlIChtb3N0TGVmdE5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50ID0gbW9zdExlZnROb2RlO1xyXG4gICAgICAgICAgICBtb3N0TGVmdE5vZGUgPSBtb3N0TGVmdE5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIC8vYWZ0ZXIgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IG5vZGUsIHdlIGhhdmUgdGlzIHBhcmVudCBzbyB0aGF0IHdlIGNhbiBkZWxldGUgaXRcclxuICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICBtb3N0TGVmdFBhcmVudC5sZWZ0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZpbmQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gcm9vdDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLmRhdGEgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPiBjdXJyZW50Tm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSBudWxsKSByZXR1cm4gXCJOb2RlIGRvZXNuJ3QgZXhpc3RcIjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudE5vZGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc3BsYXlOb2RlczogZnVuY3Rpb24oKXtcclxuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcclxuICAgICAgICBmdW5jdGlvbiBkZWZhdWx0RnVuYyhub2RlKSB7XHJcbiAgICAgICAgICBub2RlICs9IDE7XHJcbiAgICAgICAgICB2YWx1ZXMucHVzaChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHZhbHVlcywgZGVmYXVsdEZ1bmNcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGxldmVsT3JkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICAvL1dyaXRlIGEgbGV2ZWxPcmRlcihjYWxsYmFjaykgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFzIGl0cyBwYXJhbWV0ZXIuXHJcbiAgICAgICAgLy9UaGUgbWV0aG9kIHNob3VsZCByZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIGdpdmVuIGFzIGFuIGFyZ3VtZW50LlxyXG5cclxuICAgICAgICAvL2xldmVsT3JkZXIgc2hvdWxkIHRyYXZlcnNlIHRoZSB0cmVlIGluIGJyZWFkdGgtZmlyc3QgbGV2ZWwgb3JkZXIgYW5kIHByb3ZpZGUgZWFjaCBub2RlIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBjYWxsYmFjay5cclxuICAgICAgICAvL0FzIGEgcmVzdWx0LCB0aGUgY2FsbGJhY2sgd2lsbCBwZXJmb3JtIGFuIG9wZXJhdGlvbiBvbiBlYWNoIG5vZGUgZm9sbG93aW5nIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IGFyZSB0cmF2ZXJzZWRcclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBxdWV1ZSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXJvb3QpIHJldHVybjtcclxuICAgICAgICBxdWV1ZS5wdXNoKHJvb3QpO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgIGxldCBub2RlID0gcXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgIC8vd2UgY2hlY2sgaWYgdGhlIGNhbGxiYWNrIGlzIHByb3ZpZGVkXHJcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suZGVmYXVsdEZ1bmMobm9kZS5kYXRhKVxyXG4gICAgICAgICAgICAvL2lmIGl0IGlzbid0IHByb3ZpZGVkLCB3ZSBqdXN0IHB1c2ggdGhlIG5vZGVzIGRhdGEgaW50byBvdXIgYXJyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGRlZmF1bHRBcnIucHVzaChub2RlLmRhdGEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHF1ZXVlLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZCAhPT0gbnVsbCkgcXVldWUucHVzaChub2RlLnJpZ2h0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaWYgdGhlcmVzIGEgY2FsbGJhY2ssIHJldHVybiB0aGF0IGNhbGxiYWNrcyBhcnJheSwgaWYgbm90LCByZXR1cm4gZGVmYXVsdEFyclxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgcmV0dXJuIGNhbGxiYWNrLnZhbHVlcztcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEFycjtcclxuICAgICAgfSxcclxuICAgICAgcHJlT3JkZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBkZWZhdWx0QXJyID0gW107XHJcbiAgICAgICAgbGV0IHN0YWNrID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFyb290KSByZXR1cm47XHJcbiAgICAgICAgc3RhY2sucHVzaChyb290KTtcclxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBsZXQgbm9kZSA9IHN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZGVmYXVsdEFyci5wdXNoKG5vZGUuZGF0YSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5kZWZhdWx0RnVuYyhub2RlLmRhdGEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgIGlmIChub2RlLmxlZnRDaGlsZCkgc3RhY2sucHVzaChub2RlLmxlZnRDaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjay52YWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRBcnI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3JkZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRBcnIgPSBbXTtcclxuICAgICAgICBsZXQgc3RhY2sgPSBbXTtcclxuICAgICAgICBpZiAoIXJvb3QpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSByb290LmxlZnRDaGlsZDtcclxuXHJcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHN0YWNrLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2hpbGUoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuICAgICAgICAgIGlmICghbm9kZS5sZWZ0Q2hpbGQgJiYgIW5vZGUucmlnaHRDaGlsZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgPT09IG51bGwpICBjb250aW51ZTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVmYXVsdEFyci5wdXNoKHJvb3QuZGF0YSk7XHJcblxyXG4gICAgICAgIG5vZGUgPSByb290LnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHN0YWNrLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2hpbGUoc3RhY2subGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICBkZWZhdWx0QXJyLnB1c2gobm9kZS5kYXRhKTtcclxuICAgICAgICAgIGlmICghbm9kZS5sZWZ0Q2hpbGQgJiYgIW5vZGUucmlnaHRDaGlsZCkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAobm9kZS5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodENoaWxkKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgPT09IG51bGwpICBjb250aW51ZTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLnJpZ2h0Q2hpbGQubGVmdENoaWxkKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobm9kZS5sZWZ0Q2hpbGQpIHN0YWNrLnB1c2gobm9kZS5sZWZ0Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgcmV0dXJuIGNhbGxiYWNrLnZhbHVlcztcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEFycjtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxufTtcclxuXHJcbi8vY29kZSBmb3IgdmlzdWFsbHkgcmVwcmVzZW50aW5nIHRoZSB0cmVlLCB0YWtlcyByb290IG5vZGUgYXMgYSBwYXJhbWV0ZXJcclxuY29uc3QgcHJldHR5UHJpbnQgPSAobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xyXG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUucmlnaHRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBwcmV0dHlQcmludChub2RlLnJpZ2h0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUlOKUgOKUgCBcIiA6IFwi4pSM4pSA4pSAIFwifSR7bm9kZS5kYXRhfWApO1xyXG4gICAgaWYgKG5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUubGVmdENoaWxkLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG5sZXQgbnVtYmVyc0FyciA9IFsxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNCwgMTAwLCAyMDAsIDMwMCwgNDAwLCA1MDAsIDYwMCwgXTtcclxuXHJcblxyXG5mdW5jdGlvbiBtZXJnZShsZWZ0QXJyYXksIHJpZ2h0QXJyYXksIGxlZnRMZW5ndGgsIHJpZ2h0TGVuZ3RoLCBrcywgYXJyYXlUb1NvcnQpIHtcclxuICBsZXQgaSA9IDAsIGogPSAwLCBrPWtzO1xyXG4gIC8vY29tcGFyZSBhbmQgY29weVxyXG4gIHdoaWxlICggaTwgbGVmdExlbmd0aCAmJiBqIDwgcmlnaHRMZW5ndGgpIHtcclxuICAgICAgaWYgKGxlZnRBcnJheVtpXSA8IHJpZ2h0QXJyYXlbal0pIHtcclxuICAgICAgICAgIGFycmF5VG9Tb3J0W2srK10gPSBsZWZ0QXJyYXlbaSsrXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFycmF5VG9Tb3J0W2srK10gPSByaWdodEFycmF5W2orK107XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuICAvL2NoZWNrIGlmIGFsbCB0aGUgZWxlbWVudHMgYXJlIHNvcnRlZCBpZiBub3QgYWRkIHRoZW1cclxuICBmb3IgKCA7IGk8bGVmdExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGFycmF5VG9Tb3J0W2srK10gPSBsZWZ0QXJyYXlbaV07XHJcbiAgfVxyXG4gIGZvciAoIDsgajxyaWdodExlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFycmF5VG9Tb3J0W2srK10gPSByaWdodEFycmF5W2pdO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEFycmF5UmFuZ2UoYXJyYXksIHN0YXJ0SW5kZXgsIGVuZEluZGV4KSB7XHJcbiAgcmV0dXJuIGFycmF5LnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4ICsgMSk7XHJcbn1cclxuXHJcbi8vc3BsaXR0aW5nIHRoZSBhcnJheSBpbnRvIHRoZSBsZWZ0IGFuZCByaWdodCBoYWxmXHJcbmZ1bmN0aW9uIG1lcmdlU29ydCAoc3RhcnQsIGVuZCwgYXJyYXlUb1NvcnQpIHtcclxuICBpZiAoc3RhcnQgPCBlbmQpIHtcclxuICAgIFxyXG4gICAgICBsZXQgbWlkID0gKHN0YXJ0ICsgZW5kKSAvIDI7XHJcbiAgICAgIG1pZCA9IE1hdGguZmxvb3IobWlkKTtcclxuXHJcbiAgICAgIC8vZ2V0dGluZyB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheVxyXG4gICAgICBtZXJnZVNvcnQoc3RhcnQsIG1pZCwgYXJyYXlUb1NvcnQpO1xyXG4gICAgICBsZXQgcmVzdWx0TGVmdCA9IGdldEFycmF5UmFuZ2UoYXJyYXlUb1NvcnQsIHN0YXJ0LCBtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSByaWdodCBoYWxmXHJcbiAgICAgIG1lcmdlU29ydChtaWQrMSwgZW5kLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRSaWdodCA9IGdldEFycmF5UmFuZ2UoYXJyYXlUb1NvcnQsIG1pZCsxLCBlbmQpO1xyXG4gICAgICBtZXJnZShyZXN1bHRMZWZ0LCByZXN1bHRSaWdodCwgcmVzdWx0TGVmdC5sZW5ndGgsIHJlc3VsdFJpZ2h0Lmxlbmd0aCwgc3RhcnQsIGFycmF5VG9Tb3J0KTtcclxuICB9XHJcbn1cclxuXHJcbi8vcmVtb3ZlcyBkdXBsaWNhdGUgdmFsdWVzIGZyb20gYW4gYXJyYXlcclxuLy90aGUgYXJyYXkgbmVlZHMgdG8gYmUgU09SVEVEIGluIG9yZGVyIGZvciBpdCB0byB3b3JrXHJcbmZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZXMoYXJyKXtcclxuICBsZXQgcCA9IG51bGw7XHJcbiAgbGV0IGZpbHRlcmVkQXJyID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChhcnJbaV0gPT09IGFycltwXSkge1xyXG4gICAgICBjb250aW51ZVxyXG4gICAgfVxyXG4gICAgZmlsdGVyZWRBcnIucHVzaChhcnJbaV0pXHJcbiAgICBwID0gaTtcclxuICB9XHJcbiAgcmV0dXJuIGZpbHRlcmVkQXJyO1xyXG59XHJcblxyXG5tZXJnZVNvcnQoMCwgbnVtYmVyc0Fyci5sZW5ndGgtMSwgbnVtYmVyc0FycilcclxubnVtYmVyc0FyciA9IHJlbW92ZUR1cGxpY2F0ZXMobnVtYmVyc0FycilcclxuY29uc29sZS5sb2cobnVtYmVyc0FycilcclxuXHJcblxyXG5sZXQgaWRlayA9IFRyZWUobnVtYmVyc0Fycik7XHJcbmNvbnNvbGUubG9nKGlkZWsucm9vdClcclxuY29uc29sZS5sb2coaWRlay5wcmVPcmRlcigpKVxyXG5jb25zb2xlLmxvZyhpZGVrLnByZU9yZGVyKGlkZWsuZGlzcGxheU5vZGVzKCkpKVxyXG5jb25zb2xlLmxvZyhpZGVrLmluT3JkZXIoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=