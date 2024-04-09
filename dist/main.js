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
          //[step into its right child and then take its most left child]

        //find the requested node
        let subtree;

        //decide if we should go to the left subtree or right subtree
        if (value < root.data) {
          subtree = root.leftChild;
        } else if (value === root.data){
          subtree = root;
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
        if (subtree.leftChild){

          //if it has a left child, it checks if its value is the same as the argument value
          if (value === subtree.leftChild.data) {
            
            //then it checks if that child has any children
            if (!subtree.leftChild.leftChild && !subtree.leftChild.rightChild) {

              //if it has no children, it's deleted
              subtree.leftChild = null;
              return;
            }

            if (subtree.leftChild.leftChild && subtree.leftChild.rightChild) {
              console.log(subtree)
              return;
            }

            //checks if subtree has either child
            if (subtree.leftChild.leftChild || subtree.leftChild.rightChild) {
              if (subtree.leftChild.leftChild) {
                subtree.leftChild = subtree.leftChild.leftChild;
              } else {
                subtree.rightChild = subtree.rightChild.rightChild;
              }
            }
            //if the node we're removing is a direct child of main root
          } else if (value === subtree.data) {

            //we get its rights child most left child
            let rightSubtree = subtree.rightChild; 
            let mostLeftChild;
            while (rightSubtree.leftChild.leftChild != null) {
              rightSubtree = rightSubtree.leftChild;
            }
            //we set the most left child
            mostLeftChild = rightSubtree.leftChild;

            //we replace the value
            subtree.data = mostLeftChild.data;

            //we remove the most left child
            rightSubtree.leftChild = null;
            return;
          }
        }

        //does the same as above, only for right child
         if (subtree.rightChild) {

            if (value === subtree.rightChild.data) {

              if (!subtree.rightChild.leftChild && !subtree.rightChild.rightChild) {
                subtree.rightChild = null;
                return;
              }
              
              if (subtree.rightChild.leftChild && subtree.rightChild.rightChild) {
                return;
              }

              //checks if subtree has either child
              if (subtree.rightChild.leftChild || subtree.rightChild.rightChild) {
                if (subtree.leftChild.leftChild) {
                  subtree.leftChild = subtree.leftChild.leftChild;
                } else {
                  subtree.rightChild = subtree.rightChild.rightChild;
                }
              }
          //if the node we're removing is a direct child of main root
        } else if (value === subtree.data) {

          //we get its rights child most left child
          let rightSubtree = subtree.rightChild; // 500
          let mostLeftChild = rightSubtree;

          while (mostLeftChild.leftChild != null) {
            mostLeftChild = mostLeftChild.leftChild;
          }
          
          subtree.data = mostLeftChild.data;
          rightSubtree.leftChild = null;
          return;
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
// idek.delete(23)
idek.delete(67)
idek.delete(6345)
idek.delete(9)
console.log(idek.root)
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gTm9kZShkYXRhLGxlZnRDaGlsZCwgcmlnaHRDaGlsZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgbGVmdENoaWxkOiBsZWZ0Q2hpbGQsXHJcbiAgICAgICAgcmlnaHRDaGlsZDpyaWdodENoaWxkXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUcmVlKGFycil7XHJcbiAgZnVuY3Rpb24gYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAvL3Nob3VsZCByZXR1cm4gbHZsMCByb290IG5vZGVcclxuXHJcbiAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcblxyXG4gICAgLy9iYXNlIGNhc2UgZm9yIGV4aXRpbmcgb3V0IG9mIHJlY3Vyc2lvblxyXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAvL3NldHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBhcnJheSBhcyB0aGUgcm9vdFxyXG4gICAgbGV0IHJvb3QgPSBhcnJbbWlkXTtcclxuXHJcbiAgICAvL2ZpbmRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheSBhbmQgc2V0cyBpdCBhcyByb290XHJcbiAgICBsZXQgbGVmdENoaWxkID0gYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZC0xKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGxlZnRDaGlsZClcclxuICAgIC8vIGlmIChsZWZ0Q2hpbGQgIT09IG51bGwgJiYgbGVmdENoaWxkLmRhdGEgPT09IHJvb3QpIHtcclxuICAgIC8vICAgLy8gbGV0IHRlbXBOb2RlID0gbGVmdENoaWxkLnJpZ2h0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZCA9IGxlZnRDaGlsZC5sZWZ0Q2hpbGQ7XHJcbiAgICAvLyAgIC8vIGxlZnRDaGlsZC5yaWdodENoaWxkID0gdGVtcE5vZGU7XHJcblxyXG4gICAgLy8gfTtcclxuICAgIC8vZG9lcyB0aGUgc2FtZSBmb3IgdGhlIHJpZ2h0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICBsZXQgcmlnaHRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIG1pZCsxLCBlbmQpO1xyXG4gICAgLy8gaWYgKHJpZ2h0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge3JpZ2h0Q2hpbGQgPSByaWdodENoaWxkLmxlZnRDaGlsZH07XHJcbiAgICBsZXQgbm9kZSA9IE5vZGUocm9vdCwgbGVmdENoaWxkLCByaWdodENoaWxkKTtcclxuXHJcbiAgICAvL3ByaW50cyBvdXQgYSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyZWVcclxuICAgIHByZXR0eVByaW50KG5vZGUpXHJcbiAgICBjb25zb2xlLmxvZygnICcpXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9O1xyXG4gIFxyXG4gIC8vcm9vdCB1c2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYnVpbGRUcmVlIGZ1bmNcclxuICBsZXQgcm9vdCA9IGJ1aWxkVHJlZShhcnIsIDAsIGFyci5sZW5ndGggLSAxKVxyXG4gIFxyXG4gICAgcmV0dXJue1xyXG4gICAgICByb290LFxyXG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgLy93ZSBvbmx5IGluc2VydCBhcyBhICdsZWFmJyBvZiB0aGUgdHJlZSBcclxuICAgICAgICAvL1dFIE5FVkVSIFJFLUFSUkFOR0VcclxuXHJcbiAgICAgICAgbGV0IHN1YnRyZWU7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSByb290LmRhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAvL3dlIGNoZWNrIHdoaWNoIHN1YnRyZWUgd2UnbGwgZ28gdG8gZmlyc3RcclxuICAgICAgICBpZiAodmFsdWUgPCByb290LmRhdGEpIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vbG9vcHMgdW50aWwgb25lIG9mIHRoZSBzdWJ0cmVlcyBpcyBudWxsXHJcbiAgICAgICAgd2hpbGUgKHN1YnRyZWUubGVmdENoaWxkICE9IG51bGwgJiYgc3VidHJlZS5yaWdodENoaWxkICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAvL3JldHVybiBpZiB2YWx1ZSBpcyBhIGR1cGxpY2F0ZVxyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhIHx8IHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgLy9kZXRlcm1pbmUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgbGVmdCBzdWJ0cmVlXHJcbiAgICAgICAgLy9vciByaWdodCBzdWJ0cmVlIFxyXG4gICAgICAgIGxldCBub2RlID0gTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL211bHRpcGxlIGNhc2VzOlxyXG4gICAgICAgIC8vMSkgd2hlbiB0aGUgbGVhZiBkb2Vzbid0IGhhdmUgYW55IGNoaWxkcmVuIChzdWJ0cmVlcylcclxuICAgICAgICAgIC8vW2Fzc2lnbiBpdCB0byBudWxsXVxyXG4gICAgICAgIC8vMikgZGVsZXRlIGEgbGVhZiB3aXRoIHNpbmdsZSBjaGlsZFxyXG4gICAgICAgICAgLy9bY29weSB0aGUgY2hpbGQgYW5kIHJlcGxhY2UgdGhlIHJvb3Qgd2l0aCBpdF1cclxuICAgICAgICAvLzMpIHdoZW4gYSBsZWFmIGhhcyBib3RoIGNoaWxkcmVuXHJcbiAgICAgICAgICAvL1tzdGVwIGludG8gaXRzIHJpZ2h0IGNoaWxkIGFuZCB0aGVuIHRha2UgaXRzIG1vc3QgbGVmdCBjaGlsZF1cclxuXHJcbiAgICAgICAgLy9maW5kIHRoZSByZXF1ZXN0ZWQgbm9kZVxyXG4gICAgICAgIGxldCBzdWJ0cmVlO1xyXG5cclxuICAgICAgICAvL2RlY2lkZSBpZiB3ZSBzaG91bGQgZ28gdG8gdGhlIGxlZnQgc3VidHJlZSBvciByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgaWYgKHZhbHVlIDwgcm9vdC5kYXRhKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gcm9vdC5kYXRhKXtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vbW92ZSB0aHJvdWdoIHRoZSB0cmVlIHVudGlsIHRoZSBjdXJyZW50IG5vZGUgaXMgdGhlXHJcbiAgICAgICAgLy9ub2RlIHdlJ3JlIHNlYXJjaCBmb3JcclxuICAgICAgICB3aGlsZSAodmFsdWUgIT09IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkICYmIHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3VidHJlZS5yaWdodENoaWxkICYmIHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NoZWNrcyBpZiBhIHN1YnRyZWUgaGFzIGEgbGVmdENoaWxkXHJcbiAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkKXtcclxuXHJcbiAgICAgICAgICAvL2lmIGl0IGhhcyBhIGxlZnQgY2hpbGQsIGl0IGNoZWNrcyBpZiBpdHMgdmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIGFyZ3VtZW50IHZhbHVlXHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHN1YnRyZWUubGVmdENoaWxkLmRhdGEpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhlbiBpdCBjaGVja3MgaWYgdGhhdCBjaGlsZCBoYXMgYW55IGNoaWxkcmVuXHJcbiAgICAgICAgICAgIGlmICghc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkICYmICFzdWJ0cmVlLmxlZnRDaGlsZC5yaWdodENoaWxkKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vaWYgaXQgaGFzIG5vIGNoaWxkcmVuLCBpdCdzIGRlbGV0ZWRcclxuICAgICAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkICYmIHN1YnRyZWUubGVmdENoaWxkLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdWJ0cmVlKVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jaGVja3MgaWYgc3VidHJlZSBoYXMgZWl0aGVyIGNoaWxkXHJcbiAgICAgICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZC5sZWZ0Q2hpbGQgfHwgc3VidHJlZS5sZWZ0Q2hpbGQucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZC5sZWZ0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIHN1YnRyZWUubGVmdENoaWxkID0gc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlLnJpZ2h0Q2hpbGQgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiB0aGUgbm9kZSB3ZSdyZSByZW1vdmluZyBpcyBhIGRpcmVjdCBjaGlsZCBvZiBtYWluIHJvb3RcclxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IHN1YnRyZWUuZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgLy93ZSBnZXQgaXRzIHJpZ2h0cyBjaGlsZCBtb3N0IGxlZnQgY2hpbGRcclxuICAgICAgICAgICAgbGV0IHJpZ2h0U3VidHJlZSA9IHN1YnRyZWUucmlnaHRDaGlsZDsgXHJcbiAgICAgICAgICAgIGxldCBtb3N0TGVmdENoaWxkO1xyXG4gICAgICAgICAgICB3aGlsZSAocmlnaHRTdWJ0cmVlLmxlZnRDaGlsZC5sZWZ0Q2hpbGQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJpZ2h0U3VidHJlZSA9IHJpZ2h0U3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy93ZSBzZXQgdGhlIG1vc3QgbGVmdCBjaGlsZFxyXG4gICAgICAgICAgICBtb3N0TGVmdENoaWxkID0gcmlnaHRTdWJ0cmVlLmxlZnRDaGlsZDtcclxuXHJcbiAgICAgICAgICAgIC8vd2UgcmVwbGFjZSB0aGUgdmFsdWVcclxuICAgICAgICAgICAgc3VidHJlZS5kYXRhID0gbW9zdExlZnRDaGlsZC5kYXRhO1xyXG5cclxuICAgICAgICAgICAgLy93ZSByZW1vdmUgdGhlIG1vc3QgbGVmdCBjaGlsZFxyXG4gICAgICAgICAgICByaWdodFN1YnRyZWUubGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9kb2VzIHRoZSBzYW1lIGFzIGFib3ZlLCBvbmx5IGZvciByaWdodCBjaGlsZFxyXG4gICAgICAgICBpZiAoc3VidHJlZS5yaWdodENoaWxkKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHN1YnRyZWUucmlnaHRDaGlsZC5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgIGlmICghc3VidHJlZS5yaWdodENoaWxkLmxlZnRDaGlsZCAmJiAhc3VidHJlZS5yaWdodENoaWxkLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGlmIChzdWJ0cmVlLnJpZ2h0Q2hpbGQubGVmdENoaWxkICYmIHN1YnRyZWUucmlnaHRDaGlsZC5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvL2NoZWNrcyBpZiBzdWJ0cmVlIGhhcyBlaXRoZXIgY2hpbGRcclxuICAgICAgICAgICAgICBpZiAoc3VidHJlZS5yaWdodENoaWxkLmxlZnRDaGlsZCB8fCBzdWJ0cmVlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IHN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IHN1YnRyZWUucmlnaHRDaGlsZC5yaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIC8vaWYgdGhlIG5vZGUgd2UncmUgcmVtb3ZpbmcgaXMgYSBkaXJlY3QgY2hpbGQgb2YgbWFpbiByb290XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gc3VidHJlZS5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgLy93ZSBnZXQgaXRzIHJpZ2h0cyBjaGlsZCBtb3N0IGxlZnQgY2hpbGRcclxuICAgICAgICAgIGxldCByaWdodFN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7IC8vIDUwMFxyXG4gICAgICAgICAgbGV0IG1vc3RMZWZ0Q2hpbGQgPSByaWdodFN1YnRyZWU7XHJcblxyXG4gICAgICAgICAgd2hpbGUgKG1vc3RMZWZ0Q2hpbGQubGVmdENoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbW9zdExlZnRDaGlsZCA9IG1vc3RMZWZ0Q2hpbGQubGVmdENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBzdWJ0cmVlLmRhdGEgPSBtb3N0TGVmdENoaWxkLmRhdGE7XHJcbiAgICAgICAgICByaWdodFN1YnRyZWUubGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0LCAxMDAsIDIwMCwgMzAwLCA0MDAsIDUwMCwgNjAwLCBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbm1lcmdlU29ydCgwLCBudW1iZXJzQXJyLmxlbmd0aC0xLCBudW1iZXJzQXJyKVxyXG5udW1iZXJzQXJyID0gcmVtb3ZlRHVwbGljYXRlcyhudW1iZXJzQXJyKVxyXG5jb25zb2xlLmxvZyhudW1iZXJzQXJyKVxyXG5cclxuXHJcbmxldCBpZGVrID0gVHJlZShudW1iZXJzQXJyKTtcclxuLy8gaWRlay5kZWxldGUoMjMpXHJcbmlkZWsuZGVsZXRlKDY3KVxyXG5pZGVrLmRlbGV0ZSg2MzQ1KVxyXG5pZGVrLmRlbGV0ZSg5KVxyXG5jb25zb2xlLmxvZyhpZGVrLnJvb3QpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9