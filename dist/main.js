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
            let rightSubtree = subtree.rightChild; // 500
            let mostLeftChild;
            while (rightSubtree.leftChild.leftChild != null) {
              rightSubtree = rightSubtree.leftChild;
            }
            mostLeftChild = rightSubtree.leftChild;
            subtree.data = mostLeftChild.data;
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
          let mostLeftChild;
          while (rightSubtree.leftChild.leftChild != null) {
            rightSubtree = rightSubtree.leftChild;
          }
          mostLeftChild = rightSubtree.leftChild;
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
idek.delete(324)
idek.delete(6345)
idek.delete(9)
console.log(idek.root)
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTyxFQUFFLHlCQUF5QjtBQUN4RTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUNqRTtBQUNBLHFDQUFxQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQTtBQUNBLFVBQVUsZUFBZTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBOb2RlKGRhdGEsbGVmdENoaWxkLCByaWdodENoaWxkKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBsZWZ0Q2hpbGQ6IGxlZnRDaGlsZCxcclxuICAgICAgICByaWdodENoaWxkOnJpZ2h0Q2hpbGRcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFRyZWUoYXJyKXtcclxuICBmdW5jdGlvbiBidWlsZFRyZWUoYXJyLCBzdGFydCwgZW5kKXtcclxuICAgIC8vc2hvdWxkIHJldHVybiBsdmwwIHJvb3Qgbm9kZVxyXG5cclxuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcclxuXHJcbiAgICAvL2Jhc2UgY2FzZSBmb3IgZXhpdGluZyBvdXQgb2YgcmVjdXJzaW9uXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgIC8vc2V0cyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGFycmF5IGFzIHRoZSByb290XHJcbiAgICBsZXQgcm9vdCA9IGFyclttaWRdO1xyXG5cclxuICAgIC8vZmluZHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5IGFuZCBzZXRzIGl0IGFzIHJvb3RcclxuICAgIGxldCBsZWZ0Q2hpbGQgPSBidWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkLTEpO1xyXG4gICAgLy8gY29uc29sZS5sb2cobGVmdENoaWxkKVxyXG4gICAgLy8gaWYgKGxlZnRDaGlsZCAhPT0gbnVsbCAmJiBsZWZ0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge1xyXG4gICAgLy8gICAvLyBsZXQgdGVtcE5vZGUgPSBsZWZ0Q2hpbGQucmlnaHRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkID0gbGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkLnJpZ2h0Q2hpbGQgPSB0ZW1wTm9kZTtcclxuXHJcbiAgICAvLyB9O1xyXG4gICAgLy9kb2VzIHRoZSBzYW1lIGZvciB0aGUgcmlnaHQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgIGxldCByaWdodENoaWxkID0gYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICAvLyBpZiAocmlnaHRDaGlsZC5kYXRhID09PSByb290KSB7cmlnaHRDaGlsZCA9IHJpZ2h0Q2hpbGQubGVmdENoaWxkfTtcclxuICAgIGxldCBub2RlID0gTm9kZShyb290LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpO1xyXG5cclxuICAgIC8vcHJpbnRzIG91dCBhIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHJlZVxyXG4gICAgcHJldHR5UHJpbnQobm9kZSlcclxuICAgIGNvbnNvbGUubG9nKCcgJylcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH07XHJcbiAgXHJcbiAgLy9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gIGxldCByb290ID0gYnVpbGRUcmVlKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpXHJcbiAgXHJcbiAgICByZXR1cm57XHJcbiAgICAgIHJvb3QsXHJcbiAgICAgIGluc2VydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL3dlIG9ubHkgaW5zZXJ0IGFzIGEgJ2xlYWYnIG9mIHRoZSB0cmVlIFxyXG4gICAgICAgIC8vV0UgTkVWRVIgUkUtQVJSQU5HRVxyXG5cclxuICAgICAgICBsZXQgc3VidHJlZTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gaWYgdmFsdWUgaXMgYSBkdXBsaWNhdGVcclxuICAgICAgICBpZiAodmFsdWUgPT09IHJvb3QuZGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIC8vd2UgY2hlY2sgd2hpY2ggc3VidHJlZSB3ZSdsbCBnbyB0byBmaXJzdFxyXG4gICAgICAgIGlmICh2YWx1ZSA8IHJvb3QuZGF0YSkge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QubGVmdENoaWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5yaWdodENoaWxkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9sb29wcyB1bnRpbCBvbmUgb2YgdGhlIHN1YnRyZWVzIGlzIG51bGxcclxuICAgICAgICB3aGlsZSAoc3VidHJlZS5sZWZ0Q2hpbGQgIT0gbnVsbCAmJiBzdWJ0cmVlLnJpZ2h0Q2hpbGQgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgIC8vcmV0dXJuIGlmIHZhbHVlIGlzIGEgZHVwbGljYXRlXHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHN1YnRyZWUubGVmdENoaWxkLmRhdGEgfHwgdmFsdWUgPT09IHN1YnRyZWUucmlnaHRDaGlsZC5kYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICAvL2RldGVybWluZSBpZiB0aGUgdmFsdWUgc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBsZWZ0IHN1YnRyZWVcclxuICAgICAgICAvL29yIHJpZ2h0IHN1YnRyZWUgXHJcbiAgICAgICAgbGV0IG5vZGUgPSBOb2RlKHZhbHVlLCBudWxsLCBudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgZGVsZXRlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIC8vbXVsdGlwbGUgY2FzZXM6XHJcbiAgICAgICAgLy8xKSB3aGVuIHRoZSBsZWFmIGRvZXNuJ3QgaGF2ZSBhbnkgY2hpbGRyZW4gKHN1YnRyZWVzKVxyXG4gICAgICAgICAgLy9bYXNzaWduIGl0IHRvIG51bGxdXHJcbiAgICAgICAgLy8yKSBkZWxldGUgYSBsZWFmIHdpdGggc2luZ2xlIGNoaWxkXHJcbiAgICAgICAgICAvL1tjb3B5IHRoZSBjaGlsZCBhbmQgcmVwbGFjZSB0aGUgcm9vdCB3aXRoIGl0XVxyXG4gICAgICAgIC8vMykgd2hlbiBhIGxlYWYgaGFzIGJvdGggY2hpbGRyZW5cclxuICAgICAgICAgIC8vW3N0ZXAgaW50byBpdHMgcmlnaHQgY2hpbGQgYW5kIHRoZW4gdGFrZSBpdHMgbW9zdCBsZWZ0IGNoaWxkXVxyXG5cclxuICAgICAgICAvL2ZpbmQgdGhlIHJlcXVlc3RlZCBub2RlXHJcbiAgICAgICAgbGV0IHN1YnRyZWU7XHJcblxyXG4gICAgICAgIC8vZGVjaWRlIGlmIHdlIHNob3VsZCBnbyB0byB0aGUgbGVmdCBzdWJ0cmVlIG9yIHJpZ2h0IHN1YnRyZWVcclxuICAgICAgICBpZiAodmFsdWUgPCByb290LmRhdGEpIHtcclxuICAgICAgICAgIHN1YnRyZWUgPSByb290LmxlZnRDaGlsZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VidHJlZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL21vdmUgdGhyb3VnaCB0aGUgdHJlZSB1bnRpbCB0aGUgY3VycmVudCBub2RlIGlzIHRoZVxyXG4gICAgICAgIC8vbm9kZSB3ZSdyZSBzZWFyY2ggZm9yXHJcbiAgICAgICAgd2hpbGUgKHZhbHVlICE9PSBzdWJ0cmVlLmRhdGEpIHtcclxuICAgICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCAmJiB2YWx1ZSA9PT0gc3VidHJlZS5sZWZ0Q2hpbGQuZGF0YSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9IGVsc2UgaWYgKHN1YnRyZWUucmlnaHRDaGlsZCAmJiB2YWx1ZSA9PT0gc3VidHJlZS5yaWdodENoaWxkLmRhdGEpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5yaWdodENoaWxkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jaGVja3MgaWYgYSBzdWJ0cmVlIGhhcyBhIGxlZnRDaGlsZFxyXG4gICAgICAgIGlmIChzdWJ0cmVlLmxlZnRDaGlsZCl7XHJcblxyXG4gICAgICAgICAgLy9pZiBpdCBoYXMgYSBsZWZ0IGNoaWxkLCBpdCBjaGVja3MgaWYgaXRzIHZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBhcmd1bWVudCB2YWx1ZVxyXG4gICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoZW4gaXQgY2hlY2tzIGlmIHRoYXQgY2hpbGQgaGFzIGFueSBjaGlsZHJlblxyXG4gICAgICAgICAgICBpZiAoIXN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZCAmJiAhc3VidHJlZS5sZWZ0Q2hpbGQucmlnaHRDaGlsZCkge1xyXG5cclxuICAgICAgICAgICAgICAvL2lmIGl0IGhhcyBubyBjaGlsZHJlbiwgaXQncyBkZWxldGVkXHJcbiAgICAgICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZCAmJiBzdWJ0cmVlLmxlZnRDaGlsZC5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coc3VidHJlZSlcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY2hlY2tzIGlmIHN1YnRyZWUgaGFzIGVpdGhlciBjaGlsZFxyXG4gICAgICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkIHx8IHN1YnRyZWUubGVmdENoaWxkLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlLmxlZnRDaGlsZCA9IHN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VidHJlZS5yaWdodENoaWxkID0gc3VidHJlZS5yaWdodENoaWxkLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaWYgdGhlIG5vZGUgd2UncmUgcmVtb3ZpbmcgaXMgYSBkaXJlY3QgY2hpbGQgb2YgbWFpbiByb290XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIC8vd2UgZ2V0IGl0cyByaWdodHMgY2hpbGQgbW9zdCBsZWZ0IGNoaWxkXHJcbiAgICAgICAgICAgIGxldCByaWdodFN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGQ7IC8vIDUwMFxyXG4gICAgICAgICAgICBsZXQgbW9zdExlZnRDaGlsZDtcclxuICAgICAgICAgICAgd2hpbGUgKHJpZ2h0U3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICByaWdodFN1YnRyZWUgPSByaWdodFN1YnRyZWUubGVmdENoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vc3RMZWZ0Q2hpbGQgPSByaWdodFN1YnRyZWUubGVmdENoaWxkO1xyXG4gICAgICAgICAgICBzdWJ0cmVlLmRhdGEgPSBtb3N0TGVmdENoaWxkLmRhdGE7XHJcbiAgICAgICAgICAgIHJpZ2h0U3VidHJlZS5sZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2RvZXMgdGhlIHNhbWUgYXMgYWJvdmUsIG9ubHkgZm9yIHJpZ2h0IGNoaWxkXHJcbiAgICAgICAgIGlmIChzdWJ0cmVlLnJpZ2h0Q2hpbGQpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3VidHJlZS5yaWdodENoaWxkLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFzdWJ0cmVlLnJpZ2h0Q2hpbGQubGVmdENoaWxkICYmICFzdWJ0cmVlLnJpZ2h0Q2hpbGQucmlnaHRDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgc3VidHJlZS5yaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgaWYgKHN1YnRyZWUucmlnaHRDaGlsZC5sZWZ0Q2hpbGQgJiYgc3VidHJlZS5yaWdodENoaWxkLnJpZ2h0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIC8vY2hlY2tzIGlmIHN1YnRyZWUgaGFzIGVpdGhlciBjaGlsZFxyXG4gICAgICAgICAgICAgIGlmIChzdWJ0cmVlLnJpZ2h0Q2hpbGQubGVmdENoaWxkIHx8IHN1YnRyZWUucmlnaHRDaGlsZC5yaWdodENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyZWUubGVmdENoaWxkID0gc3VidHJlZS5sZWZ0Q2hpbGQubGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3VidHJlZS5yaWdodENoaWxkID0gc3VidHJlZS5yaWdodENoaWxkLnJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgLy9pZiB0aGUgbm9kZSB3ZSdyZSByZW1vdmluZyBpcyBhIGRpcmVjdCBjaGlsZCBvZiBtYWluIHJvb3RcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAvL3dlIGdldCBpdHMgcmlnaHRzIGNoaWxkIG1vc3QgbGVmdCBjaGlsZFxyXG4gICAgICAgICAgbGV0IHJpZ2h0U3VidHJlZSA9IHN1YnRyZWUucmlnaHRDaGlsZDsgLy8gNTAwXHJcbiAgICAgICAgICBsZXQgbW9zdExlZnRDaGlsZDtcclxuICAgICAgICAgIHdoaWxlIChyaWdodFN1YnRyZWUubGVmdENoaWxkLmxlZnRDaGlsZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJpZ2h0U3VidHJlZSA9IHJpZ2h0U3VidHJlZS5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBtb3N0TGVmdENoaWxkID0gcmlnaHRTdWJ0cmVlLmxlZnRDaGlsZDtcclxuICAgICAgICAgIHN1YnRyZWUuZGF0YSA9IG1vc3RMZWZ0Q2hpbGQuZGF0YTtcclxuICAgICAgICAgIHJpZ2h0U3VidHJlZS5sZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL2NvZGUgZm9yIHZpc3VhbGx5IHJlcHJlc2VudGluZyB0aGUgdHJlZSwgdGFrZXMgcm9vdCBub2RlIGFzIGEgcGFyYW1ldGVyXHJcbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcclxuICAgIGlmIChub2RlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodENoaWxkLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcclxuICAgIGlmIChub2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBwcmV0dHlQcmludChub2RlLmxlZnRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxubGV0IG51bWJlcnNBcnIgPSBbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDEwMCwgMjAwLCAzMDAsIDQwMCwgNTAwLCA2MDAsIF07XHJcblxyXG5cclxuZnVuY3Rpb24gbWVyZ2UobGVmdEFycmF5LCByaWdodEFycmF5LCBsZWZ0TGVuZ3RoLCByaWdodExlbmd0aCwga3MsIGFycmF5VG9Tb3J0KSB7XHJcbiAgbGV0IGkgPSAwLCBqID0gMCwgaz1rcztcclxuICAvL2NvbXBhcmUgYW5kIGNvcHlcclxuICB3aGlsZSAoIGk8IGxlZnRMZW5ndGggJiYgaiA8IHJpZ2h0TGVuZ3RoKSB7XHJcbiAgICAgIGlmIChsZWZ0QXJyYXlbaV0gPCByaWdodEFycmF5W2pdKSB7XHJcbiAgICAgICAgICBhcnJheVRvU29ydFtrKytdID0gbGVmdEFycmF5W2krK107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhcnJheVRvU29ydFtrKytdID0gcmlnaHRBcnJheVtqKytdO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy9jaGVjayBpZiBhbGwgdGhlIGVsZW1lbnRzIGFyZSBzb3J0ZWQgaWYgbm90IGFkZCB0aGVtXHJcbiAgZm9yICggOyBpPGxlZnRMZW5ndGg7IGkrKykge1xyXG4gICAgICBhcnJheVRvU29ydFtrKytdID0gbGVmdEFycmF5W2ldO1xyXG4gIH1cclxuICBmb3IgKCA7IGo8cmlnaHRMZW5ndGg7IGorKykge1xyXG4gICAgICBhcnJheVRvU29ydFtrKytdID0gcmlnaHRBcnJheVtqXTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRBcnJheVJhbmdlKGFycmF5LCBzdGFydEluZGV4LCBlbmRJbmRleCkge1xyXG4gIHJldHVybiBhcnJheS5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCArIDEpO1xyXG59XHJcblxyXG4vL3NwbGl0dGluZyB0aGUgYXJyYXkgaW50byB0aGUgbGVmdCBhbmQgcmlnaHQgaGFsZlxyXG5mdW5jdGlvbiBtZXJnZVNvcnQgKHN0YXJ0LCBlbmQsIGFycmF5VG9Tb3J0KSB7XHJcbiAgaWYgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICBcclxuICAgICAgbGV0IG1pZCA9IChzdGFydCArIGVuZCkgLyAyO1xyXG4gICAgICBtaWQgPSBNYXRoLmZsb29yKG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIGxlZnQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgICAgbWVyZ2VTb3J0KHN0YXJ0LCBtaWQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdExlZnQgPSBnZXRBcnJheVJhbmdlKGFycmF5VG9Tb3J0LCBzdGFydCwgbWlkKTtcclxuXHJcbiAgICAgIC8vZ2V0dGluZyB0aGUgcmlnaHQgaGFsZlxyXG4gICAgICBtZXJnZVNvcnQobWlkKzEsIGVuZCwgYXJyYXlUb1NvcnQpO1xyXG4gICAgICBsZXQgcmVzdWx0UmlnaHQgPSBnZXRBcnJheVJhbmdlKGFycmF5VG9Tb3J0LCBtaWQrMSwgZW5kKTtcclxuICAgICAgbWVyZ2UocmVzdWx0TGVmdCwgcmVzdWx0UmlnaHQsIHJlc3VsdExlZnQubGVuZ3RoLCByZXN1bHRSaWdodC5sZW5ndGgsIHN0YXJ0LCBhcnJheVRvU29ydCk7XHJcbiAgfVxyXG59XHJcblxyXG4vL3JlbW92ZXMgZHVwbGljYXRlIHZhbHVlcyBmcm9tIGFuIGFycmF5XHJcbi8vdGhlIGFycmF5IG5lZWRzIHRvIGJlIFNPUlRFRCBpbiBvcmRlciBmb3IgaXQgdG8gd29ya1xyXG5mdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVzKGFycil7XHJcbiAgbGV0IHAgPSBudWxsO1xyXG4gIGxldCBmaWx0ZXJlZEFyciA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoYXJyW2ldID09PSBhcnJbcF0pIHtcclxuICAgICAgY29udGludWVcclxuICAgIH1cclxuICAgIGZpbHRlcmVkQXJyLnB1c2goYXJyW2ldKVxyXG4gICAgcCA9IGk7XHJcbiAgfVxyXG4gIHJldHVybiBmaWx0ZXJlZEFycjtcclxufVxyXG5cclxubWVyZ2VTb3J0KDAsIG51bWJlcnNBcnIubGVuZ3RoLTEsIG51bWJlcnNBcnIpXHJcbm51bWJlcnNBcnIgPSByZW1vdmVEdXBsaWNhdGVzKG51bWJlcnNBcnIpXHJcbmNvbnNvbGUubG9nKG51bWJlcnNBcnIpXHJcblxyXG5cclxubGV0IGlkZWsgPSBUcmVlKG51bWJlcnNBcnIpO1xyXG4vLyBpZGVrLmRlbGV0ZSgyMylcclxuaWRlay5kZWxldGUoMzI0KVxyXG5pZGVrLmRlbGV0ZSg2MzQ1KVxyXG5pZGVrLmRlbGV0ZSg5KVxyXG5jb25zb2xlLmxvZyhpZGVrLnJvb3QpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9