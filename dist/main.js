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
        //multiple cases:
        //1) when the leaf doesn't have any children (subtrees)
          //[assign it to null]
        //2) delete a leaf with single child
          //[copy the child and replace the root with it]
        //3) when a leaf has both children
          //[replace it with the left one and delete it, the tree will be rebalanced with the rebalance function]

        //find the requested node
        let subtree;

        //decide if we should go to the left subtree or right subtree
        if (value < root.data) {
          subtree = root.leftChild;
        } else {
          subtree = root.rightChild;
        };

        //move through the tree until the current node is the
        //node we're search for
        while (value !== subtree.data) {
          if (subtree.leftChild && value === subtree.leftChild.data) {
            break;
        } else if (subtree.rightChild && value === subtree.rightChild.data) {
            break;
        }

          if (value < subtree.data) {
            subtree = subtree.leftChild;
          } else {
            subtree = subtree.rightChild;
          }
        };
        
        //checks if a subtree has a leftChild
        //if it has a left child, it checks if its value is the same as the argument value
        //then it checks if that child has any children
        //if it has no children, it's deleted
        if (subtree.leftChild &&(value === subtree.leftChild.data && (!subtree.leftChild.leftChild && !subtree.leftChild.rightChild))) {
          subtree.leftChild = null;

        //does the same as above, only for right child
        } else if (subtree.rightChild) {

            if (value === subtree.rightChild.data) {

              if (!subtree.rightChild.leftChild && !subtree.rightChild.rightChild) {
                subtree.rightChild = null;
                return;
              }
              
              if (subtree.rightChild.leftChild || subtree.rightChild.rightChild) {
                if (subtree.leftChild.leftChild) {
                  subtree.leftChild = subtree.leftChild.leftChild;
                } else {
                  subtree.rightChild = subtree.rightChild.rightChild;
                }
              }
          }

        }
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


let numbersArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 100, 200, 300, 400, 500, 600];


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
// idek.delete(23)
idek.delete(200)
idek.delete(6345)
idek.delete(9)
console.log(idek.root)
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gTm9kZShkYXRhLGxlZnRDaGlsZCwgcmlnaHRDaGlsZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgbGVmdENoaWxkOiBsZWZ0Q2hpbGQsXHJcbiAgICAgICAgcmlnaHRDaGlsZDpyaWdodENoaWxkXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUcmVlKGFycil7XHJcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAvL3Nob3VsZCByZXR1cm4gbHZsMCByb290IG5vZGVcclxuXHJcbiAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcblxyXG4gICAgLy9iYXNlIGNhc2UgZm9yIGV4aXRpbmcgb3V0IG9mIHJlY3Vyc2lvblxyXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAvL3NldHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBhcnJheSBhcyB0aGUgcm9vdFxyXG4gICAgbGV0IHJvb3QgPSBhcnJbbWlkXTtcclxuXHJcbiAgICAvL2ZpbmRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheSBhbmQgc2V0cyBpdCBhcyByb290XHJcbiAgICBsZXQgbGVmdENoaWxkID0gYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZC0xKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGxlZnRDaGlsZClcclxuICAgIC8vIGlmIChsZWZ0Q2hpbGQgIT09IG51bGwgJiYgbGVmdENoaWxkLmRhdGEgPT09IHJvb3QpIHtcclxuICAgIC8vICAgLy8gbGV0IHRlbXBOb2RlID0gbGVmdENoaWxkLnJpZ2h0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZCA9IGxlZnRDaGlsZC5sZWZ0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZC5yaWdodENoaWxkID0gdGVtcE5vZGU7XHJcblxyXG4gICAgLy8gfTtcclxuICAgIC8vZG9lcyB0aGUgc2FtZSBmb3IgdGhlIHJpZ2h0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgcmlnaHRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIG1pZCsxLCBlbmQpO1xyXG4gICAgLy8gaWYgKHJpZ2h0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge3JpZ2h0Q2hpbGQgPSByaWdodENoaWxkLmxlZnRDaGlsZH07XHJcbiAgICBsZXQgbm9kZSA9IE5vZGUocm9vdCwgbGVmdENoaWxkLCByaWdodENoaWxkKTtcclxuXHJcbiAgICAvL3ByaW50cyBvdXQgYSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyZWVcclxuICAgIHByZXR0eVByaW50KG5vZGUpXHJcbiAgICBjb25zb2xlLmxvZygnICcpXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9O1xyXG4gIFxyXG4gIC8vcm9vdCB1c2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYnVpbGRUcmVlIGZ1bmNcclxuICBsZXQgcm9vdCA9IGJ1aWxkVHJlZShhcnIsIDAsIGFyci5sZW5ndGggLSAxKVxyXG4gIFxyXG4gICAgcmV0dXJue1xyXG4gICAgICByb290LFxyXG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLy93ZSBvbmx5IGluc2VydCBhcyBhICdsZWFmJyBvZiB0aGUgdHJlZSBcclxuICAgICAgICAvL1dFIE5FVkVSIFJFLUFSUkFOR0VcclxuXHJcbiAgICAgICAgbGV0IHN1YnRyZWU7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSByb290LmRhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIHdoaWNoIHN1YnRyZWUgd2UnbGwgZ28gdG8gZmlyc3RcclxuICAgICAgICBpZiAodmFsdWUgPCByb290LmRhdGEpIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vbG9vcHMgdW50aWwgb25lIG9mIHRoZSBzdWJ0cmVlcyBpcyBudWxsXHJcbiAgICAgICAgd2hpbGUgKHN1YnRyZWUubGVmdENoaWxkICE9IG51bGwgJiYgc3VidHJlZS5yaWdodENoaWxkICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAvL3JldHVybiBpZiB2YWx1ZSBpcyBhIGR1cGxpY2F0ZVxyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhIHx8IHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLy9kZXRlcm1pbmUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgbGVmdCBzdWJ0cmVlXHJcbiAgICAgICAgLy9vciByaWdodCBzdWJ0cmVlIFxyXG4gICAgICAgIGxldCBub2RlID0gTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL211bHRpcGxlIGNhc2VzOlxyXG4gICAgICAgIC8vMSkgd2hlbiB0aGUgbGVhZiBkb2Vzbid0IGhhdmUgYW55IGNoaWxkcmVuIChzdWJ0cmVlcylcclxuICAgICAgICAgIC8vW2Fzc2lnbiBpdCB0byBudWxsXVxyXG4gICAgICAgIC8vMikgZGVsZXRlIGEgbGVhZiB3aXRoIHNpbmdsZSBjaGlsZFxyXG4gICAgICAgICAgLy9bY29weSB0aGUgY2hpbGQgYW5kIHJlcGxhY2UgdGhlIHJvb3Qgd2l0aCBpdF1cclxuICAgICAgICAvLzMpIHdoZW4gYSBsZWFmIGhhcyBib3RoIGNoaWxkcmVuXHJcbiAgICAgICAgICAvL1tyZXBsYWNlIGl0IHdpdGggdGhlIGxlZnQgb25lIGFuZCBkZWxldGUgaXQsIHRoZSB0cmVlIHdpbGwgYmUgcmViYWxhbmNlZCB3aXRoIHRoZSByZWJhbGFuY2UgZnVuY3Rpb25dXHJcblxyXG4gICAgICAgIC8vZmluZCB0aGUgcmVxdWVzdGVkIG5vZGVcclxuICAgICAgICBsZXQgc3VidHJlZTtcclxuXHJcbiAgICAgICAgLy9kZWNpZGUgaWYgd2Ugc2hvdWxkIGdvIHRvIHRoZSBsZWZ0IHN1YnRyZWUgb3IgcmlnaHQgc3VidHJlZVxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vbW92ZSB0aHJvdWdoIHRoZSB0cmVlIHVudGlsIHRoZSBjdXJyZW50IG5vZGUgaXMgdGhlXHJcbiAgICAgICAgLy9ub2RlIHdlJ3JlIHNlYXJjaCBmb3JcclxuICAgICAgICB3aGlsZSAodmFsdWUgIT09IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkICYmIHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3VidHJlZS5yaWdodENoaWxkICYmIHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NoZWNrcyBpZiBhIHN1YnRyZWUgaGFzIGEgbGVmdENoaWxkXHJcbiAgICAgICAgLy9pZiBpdCBoYXMgYSBsZWZ0IGNoaWxkLCBpdCBjaGVja3MgaWYgaXRzIHZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBhcmd1bWVudCB2YWx1ZVxyXG4gICAgICAgIC8vdGhlbiBpdCBjaGVja3MgaWYgdGhhdCBjaGlsZCBoYXMgYW55IGNoaWxkcmVuXHJcbiAgICAgICAgLy9pZiBpdCBoYXMgbm8gY2hpbGRyZW4sIGl0J3MgZGVsZXRlZFxyXG4gICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCAmJih2YWx1ZSA9PT0gc3VidHJlZS5sZWZ0Q2hpbGQuZGF0YSAmJiAoIXN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZCAmJiAhc3VidHJlZS5sZWZ0Q2hpbGQucmlnaHRDaGlsZCkpKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vZG9lcyB0aGUgc2FtZSBhcyBhYm92ZSwgb25seSBmb3IgcmlnaHQgY2hpbGRcclxuICAgICAgICB9IGVsc2UgaWYgKHN1YnRyZWUucmlnaHRDaGlsZCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICBpZiAoIXN1YnRyZWUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgJiYgIXN1YnRyZWUucmlnaHRDaGlsZC5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBpZiAoc3VidHJlZS5yaWdodENoaWxkLmxlZnRDaGlsZCB8fCBzdWJ0cmVlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IHN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IHN1YnRyZWUucmlnaHRDaGlsZC5yaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL2NvZGUgZm9yIHZpc3VhbGx5IHJlcHJlc2VudGluZyB0aGUgdHJlZSwgdGFrZXMgcm9vdCBub2RlIGFzIGEgcGFyYW1ldGVyXHJcbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcclxuICAgIGlmIChub2RlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodENoaWxkLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcclxuICAgIGlmIChub2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBwcmV0dHlQcmludChub2RlLmxlZnRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxubGV0IG51bWJlcnNBcnIgPSBbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDEwMCwgMjAwLCAzMDAsIDQwMCwgNTAwLCA2MDBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbm1lcmdlU29ydCgwLCBudW1iZXJzQXJyLmxlbmd0aC0xLCBudW1iZXJzQXJyKVxyXG5udW1iZXJzQXJyID0gcmVtb3ZlRHVwbGljYXRlcyhudW1iZXJzQXJyKVxyXG5jb25zb2xlLmxvZyhudW1iZXJzQXJyKVxyXG5cclxuXHJcbmxldCBpZGVrID0gVHJlZShudW1iZXJzQXJyKTtcclxuLy8gaWRlay5kZWxldGUoMjMpXHJcbmlkZWsuZGVsZXRlKDIwMClcclxuaWRlay5kZWxldGUoNjM0NSlcclxuaWRlay5kZWxldGUoOSlcclxuY29uc29sZS5sb2coaWRlay5yb290KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==