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
      find(value) {
        let currentNode = root;

        while (currentNode.data !== value) {
          if (value > currentNode.data) {
            currentNode = currentNode.rightChild;
          } else {
            currentNode = currentNode.leftChild;
          }
        };

        return currentNode;
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
idek.delete(500)
console.log(idek.find(400))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gTm9kZShkYXRhLGxlZnRDaGlsZCwgcmlnaHRDaGlsZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgbGVmdENoaWxkOiBsZWZ0Q2hpbGQsXHJcbiAgICAgICAgcmlnaHRDaGlsZDpyaWdodENoaWxkXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUcmVlKGFycil7XHJcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAvL3Nob3VsZCByZXR1cm4gbHZsMCByb290IG5vZGVcclxuXHJcbiAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcblxyXG4gICAgLy9iYXNlIGNhc2UgZm9yIGV4aXRpbmcgb3V0IG9mIHJlY3Vyc2lvblxyXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAvL3NldHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBhcnJheSBhcyB0aGUgcm9vdFxyXG4gICAgbGV0IHJvb3QgPSBhcnJbbWlkXTtcclxuXHJcbiAgICAvL2ZpbmRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheSBhbmQgc2V0cyBpdCBhcyByb290XHJcbiAgICBsZXQgbGVmdENoaWxkID0gYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZC0xKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGxlZnRDaGlsZClcclxuICAgIC8vIGlmIChsZWZ0Q2hpbGQgIT09IG51bGwgJiYgbGVmdENoaWxkLmRhdGEgPT09IHJvb3QpIHtcclxuICAgIC8vICAgLy8gbGV0IHRlbXBOb2RlID0gbGVmdENoaWxkLnJpZ2h0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZCA9IGxlZnRDaGlsZC5sZWZ0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZC5yaWdodENoaWxkID0gdGVtcE5vZGU7XHJcblxyXG4gICAgLy8gfTtcclxuICAgIC8vZG9lcyB0aGUgc2FtZSBmb3IgdGhlIHJpZ2h0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgcmlnaHRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIG1pZCsxLCBlbmQpO1xyXG4gICAgLy8gaWYgKHJpZ2h0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge3JpZ2h0Q2hpbGQgPSByaWdodENoaWxkLmxlZnRDaGlsZH07XHJcbiAgICBsZXQgbm9kZSA9IE5vZGUocm9vdCwgbGVmdENoaWxkLCByaWdodENoaWxkKTtcclxuXHJcbiAgICAvL3ByaW50cyBvdXQgYSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyZWVcclxuICAgIHByZXR0eVByaW50KG5vZGUpXHJcbiAgICBjb25zb2xlLmxvZygnICcpXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9O1xyXG4gIFxyXG4gIC8vcm9vdCB1c2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYnVpbGRUcmVlIGZ1bmNcclxuICBsZXQgcm9vdCA9IGJ1aWxkVHJlZShhcnIsIDAsIGFyci5sZW5ndGggLSAxKVxyXG4gIFxyXG4gICAgcmV0dXJue1xyXG4gICAgICByb290LFxyXG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLy93ZSBvbmx5IGluc2VydCBhcyBhICdsZWFmJyBvZiB0aGUgdHJlZSBcclxuICAgICAgICAvL1dFIE5FVkVSIFJFLUFSUkFOR0VcclxuXHJcbiAgICAgICAgbGV0IHN1YnRyZWU7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSByb290LmRhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIHdoaWNoIHN1YnRyZWUgd2UnbGwgZ28gdG8gZmlyc3RcclxuICAgICAgICBpZiAodmFsdWUgPCByb290LmRhdGEpIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vbG9vcHMgdW50aWwgb25lIG9mIHRoZSBzdWJ0cmVlcyBpcyBudWxsXHJcbiAgICAgICAgd2hpbGUgKHN1YnRyZWUubGVmdENoaWxkICE9IG51bGwgJiYgc3VidHJlZS5yaWdodENoaWxkICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAvL3JldHVybiBpZiB2YWx1ZSBpcyBhIGR1cGxpY2F0ZVxyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhIHx8IHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLy9kZXRlcm1pbmUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgbGVmdCBzdWJ0cmVlXHJcbiAgICAgICAgLy9vciByaWdodCBzdWJ0cmVlIFxyXG4gICAgICAgIGxldCBub2RlID0gTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgIGxldCByZW1vdmFibGVWYXIgPSByb290O1xyXG4gICAgICAgbGV0IHBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgLy93ZSBsb29wIHRocm91Z2ggdGhlIHRyZWUgdW50aWwgd2UgZmluZCBvdXIgdmFsdWVcclxuICAgICAgIHdoaWxlIChyZW1vdmFibGVWYXIuZGF0YSAhPT0gdmFsdWUpIHtcclxuXHJcbiAgICAgICAgLy9MT09QIFRIUk9VR0ggVEhFIFRSRUUgVU5USUwgV0UgRklORCBUSEUgVkFMVUVcclxuICAgICAgICAvL3dlIGtlZXAgdGhlIHBhcmVudCBzdG9yZWQsIHNvIHRoYXQgbGF0ZXIgd2UgY2FuIHJlbW92ZSB0aGUgbm9kZVxyXG4gICAgICAgIHBhcmVudE5vZGUgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgLy9pZiBub2RlcyB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gc2VhcmNoZWQgdmFsdWUsIGdvIGxlZnRcclxuICAgICAgICBpZiAocmVtb3ZhYmxlVmFyLmRhdGEgPiB2YWx1ZSkge1xyXG4gICAgICAgICAgcmVtb3ZhYmxlVmFyID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9lbHNlLCBnbyByaWdodFxyXG4gICAgICAgICAgcmVtb3ZhYmxlVmFyID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgIH07XHJcblxyXG4gICAgICAgLy9SRU1PVkUgQ0FTRVMgRk9SIExFRlQgQ0hJTERcclxuICAgICAgIC8vY2hlY2sgaWYgbGVmdCBub2RlIGlzbnQgbnVsbFxyXG4gICAgICAgaWYgKHBhcmVudE5vZGUubGVmdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgIGlmIChwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID09PSB2YWx1ZSkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgIC8vQ0FTRSAxXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGJvdGggY2hpbGRyZW4gYXJlIG51bGxcclxuICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkID09PSBudWxsICYmIHJlbW92YWJsZVZhci5yaWdodENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAvL0NBU0UgMlxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBhIG5vZGUgaGFzIE9OTFkgb25lIGNoaWxkXHJcbiAgICAgICAgICBpZiAoKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgIXJlbW92YWJsZVZhci5yaWdodENoaWxkKSB8fCAoIXJlbW92YWJsZVZhci5sZWZ0Q2hpbGQgJiYgcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAvL3dlIGNoZWNrIHdoZXRoZXIgaXQgaGFzIGEgcmlnaHQgb3IgYSBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmIChyZW1vdmFibGVWYXIubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgc2F2ZWRDaGlsZCA9IHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vQ0FTRTNcclxuICAgICAgICAgIC8vaWYgbm9kZSBoYXMgMiBjaGlsZHJlbiwgd2UgZmluZCB0aGUgbW9zdCBsZWZ0IGNoaWxkIG9mIGl0cyByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgICBsZXQgbW9zdExlZnROb2RlID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICBsZXQgbW9zdExlZnRQYXJlbnQ7XHJcblxyXG4gICAgICAgICAgLy9pZiB0aGUgcmlnaHQgc3VidHJlZSBoYXMgbm8gbGVmdCBjaGlsZFxyXG4gICAgICAgICAgLy93ZSBnZXQgdGhlIHJpZ2h0IHN1YnRyZWVzIHBhcmVudFxyXG4gICAgICAgICAgLy93ZSBzZXQgdGhlIHJlbW92YWJsZSBlbGVtZW50IHRvIHRoYXQgcmlnaHQgc3VidHJlZXMgdmFsdWVcclxuICAgICAgICAgIC8vd2UgZGVsZXRlIHRoYXQgcmlnaHQgc3VidHJlZSBub2RlXHJcbiAgICAgICAgICBpZiAoIW1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSByZW1vdmFibGVWYXI7XHJcbiAgICAgICAgICAgIC8vaWYgaXQgaGFzIG5vIGxlZnQgYW5kIG5vIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmxlZnRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIC8vZWxzZSBpZiBpdCBoYXMgYSByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0UGFyZW50LnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUubGVmdENoaWxkLmRhdGEgID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2hpbGUgKG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQgPSBtb3N0TGVmdE5vZGU7XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZSA9IG1vc3RMZWZ0Tm9kZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy9hZnRlciB3ZSBmaW5kIHRoZSBtb3N0IGxlZnQgbm9kZSwgd2UgaGF2ZSB0aXMgcGFyZW50IHNvIHRoYXQgd2UgY2FuIGRlbGV0ZSBpdFxyXG4gICAgICAgICAgcGFyZW50Tm9kZS5sZWZ0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgbW9zdExlZnRQYXJlbnQubGVmdENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgIH0gXHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgLy9SRU1PVkUgQ0FTRVMgRk9SIFJJR0hUIENISUxEXHJcbiAgICAgICAvL2NoZWNrIGlmIHJpZ2h0IG5vZGUgaXNudCBudWxsXHJcbiAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL0NBU0UgMVxyXG4gICAgICAgICAgLy93ZSBjaGVjayBpZiBib3RoIGNoaWxkcmVuIGFyZSBudWxsXHJcbiAgICAgICAgICBpZiAocGFyZW50Tm9kZS5yaWdodENoaWxkLmxlZnRDaGlsZCA9PT0gbnVsbCAmJiBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vQ0FTRSAyXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIGlmIGEgbm9kZSBoYXMgT05MWSBvbmUgY2hpbGRcclxuICAgICAgICAgIGlmICgocmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiAhcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQpIHx8ICghcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZCAmJiByZW1vdmFibGVWYXIucmlnaHRDaGlsZCkpe1xyXG5cclxuICAgICAgICAgICAgbGV0IHNhdmVkQ2hpbGQ7XHJcbiAgICAgICAgICAgIC8vd2UgY2hlY2sgd2hldGhlciBpdCBoYXMgYSByaWdodCBvciBhIGxlZnQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKHJlbW92YWJsZVZhci5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQgPSBzYXZlZENoaWxkO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzYXZlZENoaWxkID0gcmVtb3ZhYmxlVmFyLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yaWdodENoaWxkID0gc2F2ZWRDaGlsZDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0NBU0UzXHJcbiAgICAgICAgICAvL2lmIG5vZGUgaGFzIDIgY2hpbGRyZW4sIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBjaGlsZCBvZiBpdHMgcmlnaHQgc3VidHJlZVxyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0Tm9kZSA9IHJlbW92YWJsZVZhci5yaWdodENoaWxkO1xyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0UGFyZW50O1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL2lmIHRoZSByaWdodCBzdWJ0cmVlIGhhcyBubyBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAvL3dlIGdldCB0aGUgcmlnaHQgc3VidHJlZXMgcGFyZW50XHJcbiAgICAgICAgICAvL3dlIHNldCB0aGUgcmVtb3ZhYmxlIGVsZW1lbnQgdG8gdGhhdCByaWdodCBzdWJ0cmVlcyB2YWx1ZVxyXG4gICAgICAgICAgLy93ZSBkZWxldGUgdGhhdCByaWdodCBzdWJ0cmVlIG5vZGVcclxuICAgICAgICAgIGlmICghbW9zdExlZnROb2RlLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IHJlbW92YWJsZVZhcjtcclxuICAgICAgICAgICAgLy9pZiBpdCBoYXMgbm8gbGVmdCBhbmQgbm8gcmlnaHQgY2hpbGRcclxuICAgICAgICAgICAgaWYgKCFtb3N0TGVmdE5vZGUucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhID0gbW9zdExlZnROb2RlLmRhdGE7XHJcbiAgICAgICAgICAgICAgbW9zdExlZnRQYXJlbnQucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIC8vZWxzZSBpZiBpdCBoYXMgYSByaWdodCBjaGlsZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUucmlnaHRDaGlsZC5kYXRhICA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgICAgIHJlbW92YWJsZVZhci5yaWdodENoaWxkLmRhdGEgPSBtb3N0TGVmdE5vZGUucmlnaHRDaGlsZC5kYXRhO1xyXG4gICAgICAgICAgICAgIG1vc3RMZWZ0Tm9kZS5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3aGlsZSAobW9zdExlZnROb2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtb3N0TGVmdFBhcmVudCA9IG1vc3RMZWZ0Tm9kZTtcclxuICAgICAgICAgICAgbW9zdExlZnROb2RlID0gbW9zdExlZnROb2RlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICAvL2FmdGVyIHdlIGZpbmQgdGhlIG1vc3QgbGVmdCBub2RlLCB3ZSBoYXZlIHRpcyBwYXJlbnQgc28gdGhhdCB3ZSBjYW4gZGVsZXRlIGl0XHJcbiAgICAgICAgICBwYXJlbnROb2RlLnJpZ2h0Q2hpbGQuZGF0YSA9IG1vc3RMZWZ0Tm9kZS5kYXRhO1xyXG4gICAgICAgICAgbW9zdExlZnRQYXJlbnQubGVmdENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBmaW5kKHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gcm9vdDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLmRhdGEgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPiBjdXJyZW50Tm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucmlnaHRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubGVmdENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0LCAxMDAsIDIwMCwgMzAwLCA0MDAsIDUwMCwgNjAwLCBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbm1lcmdlU29ydCgwLCBudW1iZXJzQXJyLmxlbmd0aC0xLCBudW1iZXJzQXJyKVxyXG5udW1iZXJzQXJyID0gcmVtb3ZlRHVwbGljYXRlcyhudW1iZXJzQXJyKVxyXG5jb25zb2xlLmxvZyhudW1iZXJzQXJyKVxyXG5cclxuXHJcbmxldCBpZGVrID0gVHJlZShudW1iZXJzQXJyKTtcclxuY29uc29sZS5sb2coaWRlay5yb290KVxyXG5pZGVrLmRlbGV0ZSg1MDApXHJcbmNvbnNvbGUubG9nKGlkZWsuZmluZCg0MDApKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==