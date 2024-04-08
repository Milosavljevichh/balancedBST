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
            subtree = root.leftChild;

            //loops until one of the subtrees is null
            while (subtree.leftChild != null && subtree.rightChild != null) {

                if (value < subtree.data) {
                  subtree = subtree.leftChild
                } else {
                  subtree = subtree.rightChild
                }

            }
            console.log(subtree)
          //determine if the value should be added to the left subtree
          //or right subtree
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


let numbersArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


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
// idek.insert(3)
// idek.insert(100)
// idek.insert(200)
// idek.insert(300)
// idek.insert(4)
console.log(idek)
console.log(idek.root)
// idek.buildTree(numbersArr, 0, numbersArr.length - 1);
// console.log(idek.root(numbersArr, 0, numbersArr.length - 1))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU8sRUFBRSx5QkFBeUI7QUFDeEU7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDakU7QUFDQSxxQ0FBcUMsT0FBTyxFQUFFLHlCQUF5QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQSxVQUFVLGVBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBOb2RlKGRhdGEsbGVmdENoaWxkLCByaWdodENoaWxkKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBsZWZ0Q2hpbGQ6IGxlZnRDaGlsZCxcclxuICAgICAgICByaWdodENoaWxkOnJpZ2h0Q2hpbGRcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFRyZWUoYXJyKXtcclxuICBmdW5jdGlvbiBidWlsZFRyZWUoYXJyLCBzdGFydCwgZW5kKXtcclxuICAgIC8vc2hvdWxkIHJldHVybiBsdmwwIHJvb3Qgbm9kZVxyXG5cclxuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcclxuXHJcbiAgICAvL2Jhc2UgY2FzZSBmb3IgZXhpdGluZyBvdXQgb2YgcmVjdXJzaW9uXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgIC8vc2V0cyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGFycmF5IGFzIHRoZSByb290XHJcbiAgICBsZXQgcm9vdCA9IGFyclttaWRdO1xyXG5cclxuICAgIC8vZmluZHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5IGFuZCBzZXRzIGl0IGFzIHJvb3RcclxuICAgIGxldCBsZWZ0Q2hpbGQgPSBidWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkLTEpO1xyXG4gICAgLy8gY29uc29sZS5sb2cobGVmdENoaWxkKVxyXG4gICAgLy8gaWYgKGxlZnRDaGlsZCAhPT0gbnVsbCAmJiBsZWZ0Q2hpbGQuZGF0YSA9PT0gcm9vdCkge1xyXG4gICAgLy8gICAvLyBsZXQgdGVtcE5vZGUgPSBsZWZ0Q2hpbGQucmlnaHRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkID0gbGVmdENoaWxkLmxlZnRDaGlsZDtcclxuICAgIC8vICAgLy8gbGVmdENoaWxkLnJpZ2h0Q2hpbGQgPSB0ZW1wTm9kZTtcclxuXHJcbiAgICAvLyB9O1xyXG4gICAgLy9kb2VzIHRoZSBzYW1lIGZvciB0aGUgcmlnaHQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgIGxldCByaWdodENoaWxkID0gYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICAvLyBpZiAocmlnaHRDaGlsZC5kYXRhID09PSByb290KSB7cmlnaHRDaGlsZCA9IHJpZ2h0Q2hpbGQubGVmdENoaWxkfTtcclxuICAgIGxldCBub2RlID0gTm9kZShyb290LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpO1xyXG5cclxuICAgIC8vcHJpbnRzIG91dCBhIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHJlZVxyXG4gICAgcHJldHR5UHJpbnQobm9kZSlcclxuICAgIGNvbnNvbGUubG9nKCcgJylcclxuICAgIHJldHVybiBub2RlO1xyXG4gIH07XHJcbiAgXHJcbiAgLy9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gIGxldCByb290ID0gYnVpbGRUcmVlKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpXHJcbiAgXHJcbiAgICByZXR1cm57XHJcbiAgICAgIHJvb3QsXHJcbiAgICAgIGluc2VydDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvL3dlIG9ubHkgaW5zZXJ0IGFzIGEgJ2xlYWYnIG9mIHRoZSB0cmVlIFxyXG5cclxuICAgICAgICAvL1dFIE5FVkVSIFJFLUFSUkFOR0VcclxuXHJcbiAgICAgICAgLy9jb21wYXJlIG5ldyB2YWx1ZSB0byB0aGUgcm9vdCAoJ2RhdGEnIHByb3BlcnR5IG9mIE5vZGUpXHJcbiAgICAgICAgLy9yZXBlYXQgc3RlcHMgcmVjdXJpc2V2bHk6XHJcbiAgICAgICAgLy9pZiBpdCdzIHNtYWxsZXIsIGl0IGdvZXMgdG8gdGhlIGxlZnQgc3ViLXRyZWVcclxuICAgICAgICAvL2lmIHRoZXJlIGlzIG5vIGxlZnQgc3ViLXRyZWUsIG1ha2UgbmV3IHZhbHVlIHRoZSBuZXcgcm9vdFxyXG4gICAgICAgIC8vaWYgaXQncyBiaWdnZXIgdGhhbiB0aGUgcm9vdCwgaXQgZ29lcyB0byB0aGUgcmlnaHQgc3ViLXRyZWVcclxuICAgICAgICAvL3JlcGVhdCBhYm92ZSBzdGVwcyBmb3IgcmlnaHQgc2lkZVxyXG4gICAgICAgIGlmIChyb290LmRhdGEgIT09IG51bGwpIHtcclxuICAgICAgICAgIGxldCBzdWJ0cmVlO1xyXG4gICAgICAgICAgICBzdWJ0cmVlID0gcm9vdC5sZWZ0Q2hpbGQ7XHJcblxyXG4gICAgICAgICAgICAvL2xvb3BzIHVudGlsIG9uZSBvZiB0aGUgc3VidHJlZXMgaXMgbnVsbFxyXG4gICAgICAgICAgICB3aGlsZSAoc3VidHJlZS5sZWZ0Q2hpbGQgIT0gbnVsbCAmJiBzdWJ0cmVlLnJpZ2h0Q2hpbGQgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IHN1YnRyZWUuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmVlID0gc3VidHJlZS5sZWZ0Q2hpbGRcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyZWUgPSBzdWJ0cmVlLnJpZ2h0Q2hpbGRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3VidHJlZSlcclxuICAgICAgICAgIC8vZGV0ZXJtaW5lIGlmIHRoZSB2YWx1ZSBzaG91bGQgYmUgYWRkZWQgdG8gdGhlIGxlZnQgc3VidHJlZVxyXG4gICAgICAgICAgLy9vciByaWdodCBzdWJ0cmVlXHJcbiAgICAgICAgICBsZXQgbm9kZSA9IE5vZGUodmFsdWUsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgaWYgKHN1YnRyZWUubGVmdENoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUubGVmdENoaWxkID0gbm9kZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YnRyZWUucmlnaHRDaGlsZCA9IG5vZGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0XTtcclxuXHJcblxyXG5mdW5jdGlvbiBtZXJnZShsZWZ0QXJyYXksIHJpZ2h0QXJyYXksIGxlZnRMZW5ndGgsIHJpZ2h0TGVuZ3RoLCBrcywgYXJyYXlUb1NvcnQpIHtcclxuICBsZXQgaSA9IDAsIGogPSAwLCBrPWtzO1xyXG4gIC8vY29tcGFyZSBhbmQgY29weVxyXG4gIHdoaWxlICggaTwgbGVmdExlbmd0aCAmJiBqIDwgcmlnaHRMZW5ndGgpIHtcclxuICAgICAgaWYgKGxlZnRBcnJheVtpXSA8IHJpZ2h0QXJyYXlbal0pIHtcclxuICAgICAgICAgIGFycmF5VG9Tb3J0W2srK10gPSBsZWZ0QXJyYXlbaSsrXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFycmF5VG9Tb3J0W2srK10gPSByaWdodEFycmF5W2orK107XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuICAvL2NoZWNrIGlmIGFsbCB0aGUgZWxlbWVudHMgYXJlIHNvcnRlZCBpZiBub3QgYWRkIHRoZW1cclxuICBmb3IgKCA7IGk8bGVmdExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGFycmF5VG9Tb3J0W2srK10gPSBsZWZ0QXJyYXlbaV07XHJcbiAgfVxyXG4gIGZvciAoIDsgajxyaWdodExlbmd0aDsgaisrKSB7XHJcbiAgICAgIGFycmF5VG9Tb3J0W2srK10gPSByaWdodEFycmF5W2pdO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEFycmF5UmFuZ2UoYXJyYXksIHN0YXJ0SW5kZXgsIGVuZEluZGV4KSB7XHJcbiAgcmV0dXJuIGFycmF5LnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4ICsgMSk7XHJcbn1cclxuXHJcbi8vc3BsaXR0aW5nIHRoZSBhcnJheSBpbnRvIHRoZSBsZWZ0IGFuZCByaWdodCBoYWxmXHJcbmZ1bmN0aW9uIG1lcmdlU29ydCAoc3RhcnQsIGVuZCwgYXJyYXlUb1NvcnQpIHtcclxuICBpZiAoc3RhcnQgPCBlbmQpIHtcclxuICAgIFxyXG4gICAgICBsZXQgbWlkID0gKHN0YXJ0ICsgZW5kKSAvIDI7XHJcbiAgICAgIG1pZCA9IE1hdGguZmxvb3IobWlkKTtcclxuXHJcbiAgICAgIC8vZ2V0dGluZyB0aGUgbGVmdCBoYWxmIG9mIHRoZSBhcnJheVxyXG4gICAgICBtZXJnZVNvcnQoc3RhcnQsIG1pZCwgYXJyYXlUb1NvcnQpO1xyXG4gICAgICBsZXQgcmVzdWx0TGVmdCA9IGdldEFycmF5UmFuZ2UoYXJyYXlUb1NvcnQsIHN0YXJ0LCBtaWQpO1xyXG5cclxuICAgICAgLy9nZXR0aW5nIHRoZSByaWdodCBoYWxmXHJcbiAgICAgIG1lcmdlU29ydChtaWQrMSwgZW5kLCBhcnJheVRvU29ydCk7XHJcbiAgICAgIGxldCByZXN1bHRSaWdodCA9IGdldEFycmF5UmFuZ2UoYXJyYXlUb1NvcnQsIG1pZCsxLCBlbmQpO1xyXG4gICAgICBtZXJnZShyZXN1bHRMZWZ0LCByZXN1bHRSaWdodCwgcmVzdWx0TGVmdC5sZW5ndGgsIHJlc3VsdFJpZ2h0Lmxlbmd0aCwgc3RhcnQsIGFycmF5VG9Tb3J0KTtcclxuICB9XHJcbn1cclxuXHJcbi8vcmVtb3ZlcyBkdXBsaWNhdGUgdmFsdWVzIGZyb20gYW4gYXJyYXlcclxuLy90aGUgYXJyYXkgbmVlZHMgdG8gYmUgU09SVEVEIGluIG9yZGVyIGZvciBpdCB0byB3b3JrXHJcbmZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZXMoYXJyKXtcclxuICBsZXQgcCA9IG51bGw7XHJcbiAgbGV0IGZpbHRlcmVkQXJyID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChhcnJbaV0gPT09IGFycltwXSkge1xyXG4gICAgICBjb250aW51ZVxyXG4gICAgfVxyXG4gICAgZmlsdGVyZWRBcnIucHVzaChhcnJbaV0pXHJcbiAgICBwID0gaTtcclxuICB9XHJcbiAgcmV0dXJuIGZpbHRlcmVkQXJyO1xyXG59XHJcblxyXG5tZXJnZVNvcnQoMCwgbnVtYmVyc0Fyci5sZW5ndGgtMSwgbnVtYmVyc0FycilcclxubnVtYmVyc0FyciA9IHJlbW92ZUR1cGxpY2F0ZXMobnVtYmVyc0FycilcclxuY29uc29sZS5sb2cobnVtYmVyc0FycilcclxuXHJcblxyXG5sZXQgaWRlayA9IFRyZWUobnVtYmVyc0Fycik7XHJcbi8vIGlkZWsuaW5zZXJ0KDMpXHJcbi8vIGlkZWsuaW5zZXJ0KDEwMClcclxuLy8gaWRlay5pbnNlcnQoMjAwKVxyXG4vLyBpZGVrLmluc2VydCgzMDApXHJcbi8vIGlkZWsuaW5zZXJ0KDQpXHJcbmNvbnNvbGUubG9nKGlkZWspXHJcbmNvbnNvbGUubG9nKGlkZWsucm9vdClcclxuLy8gaWRlay5idWlsZFRyZWUobnVtYmVyc0FyciwgMCwgbnVtYmVyc0Fyci5sZW5ndGggLSAxKTtcclxuLy8gY29uc29sZS5sb2coaWRlay5yb290KG51bWJlcnNBcnIsIDAsIG51bWJlcnNBcnIubGVuZ3RoIC0gMSkpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9