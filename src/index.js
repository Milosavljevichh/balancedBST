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