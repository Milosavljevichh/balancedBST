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

        //compare new value to the root ('data' property of Node)
        //repeat steps recurisevly:
        //if it's smaller, it goes to the left sub-tree
        //if there is no left sub-tree, make new value the new root
        //if it's bigger than the root, it goes to the right sub-tree
        //repeat above steps for right side
        if (root.data !== null) {
          let subtree;

          //we check which subtree we'll go to first
            if (value === root.data) return;
            if (value < root.data) {
              subtree = root.leftChild;
            } else {
              subtree = root.rightChild;
            }

            //loops until one of the subtrees is null
            //since this is a balanced BST
            while (subtree.leftChild != null && subtree.rightChild != null) {

                if (value === subtree.leftChild.data || value === subtree.rightChild.data) return;
                if (value < subtree.data) {
                  subtree = subtree.leftChild
                } else {
                  subtree = subtree.rightChild
                }

            }
          //determine if the value should be added to the left subtree
          //or right subtree if no subtree exists
          let node = Node(value, null, null);
          if (subtree.leftChild === null) {
            subtree.leftChild = node;
          } else {
            subtree.rightChild = node;
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
idek.insert(2)
idek.insert(100)
idek.insert(200)
// idek.insert(300)
// idek.insert(4)
console.log(idek)
console.log(idek.root)
// idek.buildTree(numbersArr, 0, numbersArr.length - 1);
// console.log(idek.root(numbersArr, 0, numbersArr.length - 1))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBOb2RlKGRhdGEsbGVmdENoaWxkLCByaWdodENoaWxkKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBsZWZ0Q2hpbGQ6IGxlZnRDaGlsZCxcclxuICAgICAgICByaWdodENoaWxkOnJpZ2h0Q2hpbGRcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFRyZWUoYXJyKXtcclxuICBmdW5jdGlvbiBidWlsZFRyZWUoYXJyLCBzdGFydCwgZW5kKXtcclxuICAgIC8vc2hvdWxkIHJldHVybiBsdmwwIHJvb3Qgbm9kZVxyXG5cclxuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcclxuXHJcbiAgICAvL2Jhc2UgY2FzZSBmb3IgZXhpdGluZyBvdXQgb2YgcmVjdXJzaW9uXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgIC8vc2V0cyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGFycmF5IGFzIHRoZSByb290XHJcbiAgICBsZXQgcm9vdCA9IGFyclttaWRdO1xyXG5cclxuICAgIC8vZmluZHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5IGFuZCBzZXRzIGl0IGFzIHJvb3RcclxuICAgIGxldCBsZWZ0Q2hpbGQgPSBidWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkLTEpO1xyXG4gICAgLy8gY29uc29sZS5sb2cobGVmdENoaWxkKVxyXG4gICAgLy8gaWYgKGxlZnRDaGlsZCAhPT0gbnVsbCAmJiBsZWZ0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge1xyXG4gICAgLy8gICAvLyBsZXQgdGVtcE5vZGUgPSBsZWZ0Q2hpbGQucmlnaHRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkID0gbGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkLnJpZ2h0Q2hpbGQgPSB0ZW1wTm9kZTtcclxuXHJcbiAgICAvLyB9O1xyXG4gICAgLy9kb2VzIHRoZSBzYW1lIGZvciB0aGUgcmlnaHQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgIGxldCByaWdodENoaWxkID0gYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICAvLyBpZiAocmlnaHRDaGlsZC5kYXRhID09PSByb290KSB7cmlnaHRDaGlsZCA9IHJpZ2h0Q2hpbGQubGVmdENoaWxkfTtcclxuICAgIGxldCBub2RlID0gTm9kZShyb290LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpO1xyXG5cclxuICAgIC8vcHJpbnRzIG91dCBhIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHJlZVxyXG4gICAgcHJldHR5UHJpbnQobm9kZSlcclxuICAgIGNvbnNvbGUubG9nKCcgJylcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH07XHJcbiAgXHJcbiAgLy9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gIGxldCByb290ID0gYnVpbGRUcmVlKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpXHJcbiAgXHJcbiAgICByZXR1cm57XHJcbiAgICAgIHJvb3QsXHJcbiAgICAgIGluc2VydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL3dlIG9ubHkgaW5zZXJ0IGFzIGEgJ2xlYWYnIG9mIHRoZSB0cmVlIFxyXG5cclxuICAgICAgICAvL1dFIE5FVkVSIFJFLUFSUkFOR0VcclxuXHJcbiAgICAgICAgLy9jb21wYXJlIG5ldyB2YWx1ZSB0byB0aGUgcm9vdCAoJ2RhdGEnIHByb3BlcnR5IG9mIE5vZGUpXHJcbiAgICAgICAgLy9yZXBlYXQgc3RlcHMgcmVjdXJpc2V2bHk6XHJcbiAgICAgICAgLy9pZiBpdCdzIHNtYWxsZXIsIGl0IGdvZXMgdG8gdGhlIGxlZnQgc3ViLXRyZWVcclxuICAgICAgICAvL2lmIHRoZXJlIGlzIG5vIGxlZnQgc3ViLXRyZWUsIG1ha2UgbmV3IHZhbHVlIHRoZSBuZXcgcm9vdFxyXG4gICAgICAgIC8vaWYgaXQncyBiaWdnZXIgdGhhbiB0aGUgcm9vdCwgaXQgZ29lcyB0byB0aGUgcmlnaHQgc3ViLXRyZWVcclxuICAgICAgICAvL3JlcGVhdCBhYm92ZSBzdGVwcyBmb3IgcmlnaHQgc2lkZVxyXG4gICAgICAgIGlmIChyb290LmRhdGEgIT09IG51bGwpIHtcclxuICAgICAgICAgIGxldCBzdWJ0cmVlO1xyXG5cclxuICAgICAgICAgIC8vd2UgY2hlY2sgd2hpY2ggc3VidHJlZSB3ZSdsbCBnbyB0byBmaXJzdFxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHJvb3QuZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPCByb290LmRhdGEpIHtcclxuICAgICAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3VidHJlZSA9IHJvb3QucmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9sb29wcyB1bnRpbCBvbmUgb2YgdGhlIHN1YnRyZWVzIGlzIG51bGxcclxuICAgICAgICAgICAgLy9zaW5jZSB0aGlzIGlzIGEgYmFsYW5jZWQgQlNUXHJcbiAgICAgICAgICAgIHdoaWxlIChzdWJ0cmVlLmxlZnRDaGlsZCAhPSBudWxsICYmIHN1YnRyZWUucmlnaHRDaGlsZCAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzdWJ0cmVlLmxlZnRDaGlsZC5kYXRhIHx8IHZhbHVlID09PSBzdWJ0cmVlLnJpZ2h0Q2hpbGQuZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgc3VidHJlZS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLmxlZnRDaGlsZFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3VidHJlZSA9IHN1YnRyZWUucmlnaHRDaGlsZFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgLy9kZXRlcm1pbmUgaWYgdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZCB0byB0aGUgbGVmdCBzdWJ0cmVlXHJcbiAgICAgICAgICAvL29yIHJpZ2h0IHN1YnRyZWUgaWYgbm8gc3VidHJlZSBleGlzdHNcclxuICAgICAgICAgIGxldCBub2RlID0gTm9kZSh2YWx1ZSwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICBpZiAoc3VidHJlZS5sZWZ0Q2hpbGQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3VidHJlZS5sZWZ0Q2hpbGQgPSBub2RlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3VidHJlZS5yaWdodENoaWxkID0gbm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL2NvZGUgZm9yIHZpc3VhbGx5IHJlcHJlc2VudGluZyB0aGUgdHJlZSwgdGFrZXMgcm9vdCBub2RlIGFzIGEgcGFyYW1ldGVyXHJcbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcclxuICAgIGlmIChub2RlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodENoaWxkLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcclxuICAgIGlmIChub2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBwcmV0dHlQcmludChub2RlLmxlZnRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxubGV0IG51bWJlcnNBcnIgPSBbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjQsIDEwMCwgMjAwLCAzMDAsIDQwMCwgNTAwLCA2MDBdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlKGxlZnRBcnJheSwgcmlnaHRBcnJheSwgbGVmdExlbmd0aCwgcmlnaHRMZW5ndGgsIGtzLCBhcnJheVRvU29ydCkge1xyXG4gIGxldCBpID0gMCwgaiA9IDAsIGs9a3M7XHJcbiAgLy9jb21wYXJlIGFuZCBjb3B5XHJcbiAgd2hpbGUgKCBpPCBsZWZ0TGVuZ3RoICYmIGogPCByaWdodExlbmd0aCkge1xyXG4gICAgICBpZiAobGVmdEFycmF5W2ldIDwgcmlnaHRBcnJheVtqXSkge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpKytdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbaisrXTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY2hlY2sgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgc29ydGVkIGlmIG5vdCBhZGQgdGhlbVxyXG4gIGZvciAoIDsgaTxsZWZ0TGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IGxlZnRBcnJheVtpXTtcclxuICB9XHJcbiAgZm9yICggOyBqPHJpZ2h0TGVuZ3RoOyBqKyspIHtcclxuICAgICAgYXJyYXlUb1NvcnRbaysrXSA9IHJpZ2h0QXJyYXlbal07XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlSYW5nZShhcnJheSwgc3RhcnRJbmRleCwgZW5kSW5kZXgpIHtcclxuICByZXR1cm4gYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9zcGxpdHRpbmcgdGhlIGFycmF5IGludG8gdGhlIGxlZnQgYW5kIHJpZ2h0IGhhbGZcclxuZnVuY3Rpb24gbWVyZ2VTb3J0IChzdGFydCwgZW5kLCBhcnJheVRvU29ydCkge1xyXG4gIGlmIChzdGFydCA8IGVuZCkge1xyXG4gICAgXHJcbiAgICAgIGxldCBtaWQgPSAoc3RhcnQgKyBlbmQpIC8gMjtcclxuICAgICAgbWlkID0gTWF0aC5mbG9vcihtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5XHJcbiAgICAgIG1lcmdlU29ydChzdGFydCwgbWlkLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRMZWZ0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgc3RhcnQsIG1pZCk7XHJcblxyXG4gICAgICAvL2dldHRpbmcgdGhlIHJpZ2h0IGhhbGZcclxuICAgICAgbWVyZ2VTb3J0KG1pZCsxLCBlbmQsIGFycmF5VG9Tb3J0KTtcclxuICAgICAgbGV0IHJlc3VsdFJpZ2h0ID0gZ2V0QXJyYXlSYW5nZShhcnJheVRvU29ydCwgbWlkKzEsIGVuZCk7XHJcbiAgICAgIG1lcmdlKHJlc3VsdExlZnQsIHJlc3VsdFJpZ2h0LCByZXN1bHRMZWZ0Lmxlbmd0aCwgcmVzdWx0UmlnaHQubGVuZ3RoLCBzdGFydCwgYXJyYXlUb1NvcnQpO1xyXG4gIH1cclxufVxyXG5cclxuLy9yZW1vdmVzIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG4vL3RoZSBhcnJheSBuZWVkcyB0byBiZSBTT1JURUQgaW4gb3JkZXIgZm9yIGl0IHRvIHdvcmtcclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlcyhhcnIpe1xyXG4gIGxldCBwID0gbnVsbDtcclxuICBsZXQgZmlsdGVyZWRBcnIgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXSA9PT0gYXJyW3BdKSB7XHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBmaWx0ZXJlZEFyci5wdXNoKGFycltpXSlcclxuICAgIHAgPSBpO1xyXG4gIH1cclxuICByZXR1cm4gZmlsdGVyZWRBcnI7XHJcbn1cclxuXHJcbm1lcmdlU29ydCgwLCBudW1iZXJzQXJyLmxlbmd0aC0xLCBudW1iZXJzQXJyKVxyXG5udW1iZXJzQXJyID0gcmVtb3ZlRHVwbGljYXRlcyhudW1iZXJzQXJyKVxyXG5jb25zb2xlLmxvZyhudW1iZXJzQXJyKVxyXG5cclxuXHJcbmxldCBpZGVrID0gVHJlZShudW1iZXJzQXJyKTtcclxuaWRlay5pbnNlcnQoMilcclxuaWRlay5pbnNlcnQoMTAwKVxyXG5pZGVrLmluc2VydCgyMDApXHJcbi8vIGlkZWsuaW5zZXJ0KDMwMClcclxuLy8gaWRlay5pbnNlcnQoNClcclxuY29uc29sZS5sb2coaWRlaylcclxuY29uc29sZS5sb2coaWRlay5yb290KVxyXG4vLyBpZGVrLmJ1aWxkVHJlZShudW1iZXJzQXJyLCAwLCBudW1iZXJzQXJyLmxlbmd0aCAtIDEpO1xyXG4vLyBjb25zb2xlLmxvZyhpZGVrLnJvb3QobnVtYmVyc0FyciwgMCwgbnVtYmVyc0Fyci5sZW5ndGggLSAxKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=