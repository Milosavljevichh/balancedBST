/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function Node(data,leftChild, rightChild){
    return {
        data: data,
        leftChild: leftChild,
        rightChild:rightChild
    }
};

function Tree(root){
    let balancedArr = [];
    return{//root uses the return value of buildTree func
        balancedArr
    }
};

function buildTree(arr, start, end){
    //should return lvl0 root node

    // let start = arr[0];
    // let end = arr[arr.length - 1];
    let mid = Math.floor((start + end) / 2);

    //base case for exiting out of recursion
    if (start > end) return null;

    let root = arr[mid];
    let leftChild = buildTree(arr, start, mid-1);
    let rightChild = buildTree(arr, mid+1, end);
    let node = Node(root, leftChild, rightChild);
    prettyPrint(node)
    console.log(' ')

    return node;
};

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

let numbersArr = [1,7,4,23,8,9,4,3,5,7];
buildTree(numbersArr, 0, numbersArr.length - 1);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTyxFQUFFLHlCQUF5QjtBQUN4RTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsVUFBVTtBQUNqRTtBQUNBLHFDQUFxQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIE5vZGUoZGF0YSxsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGQpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGxlZnRDaGlsZDogbGVmdENoaWxkLFxyXG4gICAgICAgIHJpZ2h0Q2hpbGQ6cmlnaHRDaGlsZFxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVHJlZShyb290KXtcclxuICAgIGxldCBiYWxhbmNlZEFyciA9IFtdO1xyXG4gICAgcmV0dXJuey8vcm9vdCB1c2VzIHRoZSByZXR1cm4gdmFsdWUgb2YgYnVpbGRUcmVlIGZ1bmNcclxuICAgICAgICBiYWxhbmNlZEFyclxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gYnVpbGRUcmVlKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAvL3Nob3VsZCByZXR1cm4gbHZsMCByb290IG5vZGVcclxuXHJcbiAgICAvLyBsZXQgc3RhcnQgPSBhcnJbMF07XHJcbiAgICAvLyBsZXQgZW5kID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcclxuICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcclxuXHJcbiAgICAvL2Jhc2UgY2FzZSBmb3IgZXhpdGluZyBvdXQgb2YgcmVjdXJzaW9uXHJcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgIGxldCByb290ID0gYXJyW21pZF07XHJcbiAgICBsZXQgbGVmdENoaWxkID0gYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZC0xKTtcclxuICAgIGxldCByaWdodENoaWxkID0gYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICBsZXQgbm9kZSA9IE5vZGUocm9vdCwgbGVmdENoaWxkLCByaWdodENoaWxkKTtcclxuICAgIHByZXR0eVByaW50KG5vZGUpXHJcbiAgICBjb25zb2xlLmxvZygnICcpXHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbn07XHJcblxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxubGV0IG51bWJlcnNBcnIgPSBbMSw3LDQsMjMsOCw5LDQsMyw1LDddO1xyXG5idWlsZFRyZWUobnVtYmVyc0FyciwgMCwgbnVtYmVyc0Fyci5sZW5ndGggLSAxKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=