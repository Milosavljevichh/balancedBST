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
  
  let root = buildTree(arr, 0, arr.length - 1)
  
    return{//root uses the return value of buildTree func
      root
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


let idek = Tree(numbersArr);
// idek.buildTree(numbersArr, 0, numbersArr.length - 1);
// console.log(idek.root(numbersArr, 0, numbersArr.length - 1))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTyxFQUFFLHlCQUF5QjtBQUN4RTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUNqRTtBQUNBLHFDQUFxQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIE5vZGUoZGF0YSxsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGxlZnRDaGlsZDogbGVmdENoaWxkLFxyXG4gICAgICAgIHJpZ2h0Q2hpbGQ6cmlnaHRDaGlsZFxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVHJlZShhcnIpe1xyXG4gIGZ1bmN0aW9uIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpe1xyXG4gICAgLy9zaG91bGQgcmV0dXJuIGx2bDAgcm9vdCBub2RlXHJcblxyXG4gICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKHN0YXJ0ICsgZW5kKSAvIDIpO1xyXG5cclxuICAgIC8vYmFzZSBjYXNlIGZvciBleGl0aW5nIG91dCBvZiByZWN1cnNpb25cclxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgLy9zZXRzIHRoZSBtaWRkbGUgZWxlbWVudCBvZiB0aGUgYXJyYXkgYXMgdGhlIHJvb3RcclxuICAgIGxldCByb290ID0gYXJyW21pZF07XHJcblxyXG4gICAgLy9maW5kcyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGxlZnQgaGFsZiBvZiB0aGUgYXJyYXkgYW5kIHNldHMgaXQgYXMgcm9vdFxyXG4gICAgbGV0IGxlZnRDaGlsZCA9IGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBtaWQtMSk7XHJcblxyXG4gICAgLy9kb2VzIHRoZSBzYW1lIGZvciB0aGUgcmlnaHQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgIGxldCByaWdodENoaWxkID0gYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICBsZXQgbm9kZSA9IE5vZGUocm9vdCwgbGVmdENoaWxkLCByaWdodENoaWxkKTtcclxuXHJcbiAgICAvL3ByaW50cyBvdXQgYSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyZWVcclxuICAgIHByZXR0eVByaW50KG5vZGUpXHJcbiAgICBjb25zb2xlLmxvZygnICcpXHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9O1xyXG4gIFxyXG4gIGxldCByb290ID0gYnVpbGRUcmVlKGFyciwgMCwgYXJyLmxlbmd0aCAtIDEpXHJcbiAgXHJcbiAgICByZXR1cm57Ly9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gICAgICByb290XHJcbiAgICB9XHJcbn07XHJcblxyXG4vL2NvZGUgZm9yIHZpc3VhbGx5IHJlcHJlc2VudGluZyB0aGUgdHJlZSwgdGFrZXMgcm9vdCBub2RlIGFzIGEgcGFyYW1ldGVyXHJcbmNvbnN0IHByZXR0eVByaW50ID0gKG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpID0+IHtcclxuICAgIGlmIChub2RlID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChub2RlLnJpZ2h0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5yaWdodENoaWxkLCBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcclxuICAgIGlmIChub2RlLmxlZnRDaGlsZCAhPT0gbnVsbCkge1xyXG4gICAgICBwcmV0dHlQcmludChub2RlLmxlZnRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsIHRydWUpO1xyXG4gICAgfVxyXG4gIH07XHJcbmxldCBudW1iZXJzQXJyID0gWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0XTtcclxuXHJcblxyXG5sZXQgaWRlayA9IFRyZWUobnVtYmVyc0Fycik7XHJcbi8vIGlkZWsuYnVpbGRUcmVlKG51bWJlcnNBcnIsIDAsIG51bWJlcnNBcnIubGVuZ3RoIC0gMSk7XHJcbi8vIGNvbnNvbGUubG9nKGlkZWsucm9vdChudW1iZXJzQXJyLCAwLCBudW1iZXJzQXJyLmxlbmd0aCAtIDEpKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==