/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function Node(data,leftChild, rightChild){
    return {
        data: data,
        leftChild: leftChild,
        rightChild:rightChild
    }
};

function Tree(){
    return{//root uses the return value of buildTree func
      buildTree: function(arr, start, end){
        //should return lvl0 root node
    
        let mid = Math.floor((start + end) / 2);
    
        //base case for exiting out of recursion
        if (start > end) return null;
    
        //sets the middle element of the array as the root
        let root = arr[mid];
    
        //finds the middle element of the left half of the array and sets it as root
        let leftChild = this.buildTree(arr, start, mid-1);
    
        //does the same for the right half of the array
        let rightChild = this.buildTree(arr, mid+1, end);
        let node = Node(root, leftChild, rightChild);
    
        //prints out a visual representation of the tree
        prettyPrint(node)
        console.log(' ')
        return node;
      },
      root: function(arr, st, en){
        let root = this.buildTree(arr, st, en);
        return root;
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


let idek = Tree();
// idek.buildTree(numbersArr, 0, numbersArr.length - 1);
console.log(idek.root(numbersArr, 0, numbersArr.length - 1))
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPLEVBQUUseUJBQXlCO0FBQ3hFO0FBQ0EsbUJBQW1CLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQ2pFO0FBQ0EscUNBQXFDLE9BQU8sRUFBRSx5QkFBeUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RCIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gTm9kZShkYXRhLGxlZnRDaGlsZCwgcmlnaHRDaGlsZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgbGVmdENoaWxkOiBsZWZ0Q2hpbGQsXHJcbiAgICAgICAgcmlnaHRDaGlsZDpyaWdodENoaWxkXHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBUcmVlKCl7XHJcbiAgICByZXR1cm57Ly9yb290IHVzZXMgdGhlIHJldHVybiB2YWx1ZSBvZiBidWlsZFRyZWUgZnVuY1xyXG4gICAgICBidWlsZFRyZWU6IGZ1bmN0aW9uKGFyciwgc3RhcnQsIGVuZCl7XHJcbiAgICAgICAgLy9zaG91bGQgcmV0dXJuIGx2bDAgcm9vdCBub2RlXHJcbiAgICBcclxuICAgICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XHJcbiAgICBcclxuICAgICAgICAvL2Jhc2UgY2FzZSBmb3IgZXhpdGluZyBvdXQgb2YgcmVjdXJzaW9uXHJcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gbnVsbDtcclxuICAgIFxyXG4gICAgICAgIC8vc2V0cyB0aGUgbWlkZGxlIGVsZW1lbnQgb2YgdGhlIGFycmF5IGFzIHRoZSByb290XHJcbiAgICAgICAgbGV0IHJvb3QgPSBhcnJbbWlkXTtcclxuICAgIFxyXG4gICAgICAgIC8vZmluZHMgdGhlIG1pZGRsZSBlbGVtZW50IG9mIHRoZSBsZWZ0IGhhbGYgb2YgdGhlIGFycmF5IGFuZCBzZXRzIGl0IGFzIHJvb3RcclxuICAgICAgICBsZXQgbGVmdENoaWxkID0gdGhpcy5idWlsZFRyZWUoYXJyLCBzdGFydCwgbWlkLTEpO1xyXG4gICAgXHJcbiAgICAgICAgLy9kb2VzIHRoZSBzYW1lIGZvciB0aGUgcmlnaHQgaGFsZiBvZiB0aGUgYXJyYXlcclxuICAgICAgICBsZXQgcmlnaHRDaGlsZCA9IHRoaXMuYnVpbGRUcmVlKGFyciwgbWlkKzEsIGVuZCk7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBOb2RlKHJvb3QsIGxlZnRDaGlsZCwgcmlnaHRDaGlsZCk7XHJcbiAgICBcclxuICAgICAgICAvL3ByaW50cyBvdXQgYSB2aXN1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyZWVcclxuICAgICAgICBwcmV0dHlQcmludChub2RlKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgJylcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSxcclxuICAgICAgcm9vdDogZnVuY3Rpb24oYXJyLCBzdCwgZW4pe1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5idWlsZFRyZWUoYXJyLCBzdCwgZW4pO1xyXG4gICAgICAgIHJldHVybiByb290O1xyXG4gICAgICB9IFxyXG4gICAgfVxyXG59O1xyXG5cclxuLy9jb2RlIGZvciB2aXN1YWxseSByZXByZXNlbnRpbmcgdGhlIHRyZWUsIHRha2VzIHJvb3Qgbm9kZSBhcyBhIHBhcmFtZXRlclxyXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZS5yaWdodENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgIHByZXR0eVByaW50KG5vZGUucmlnaHRDaGlsZCwgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XHJcbiAgICBpZiAobm9kZS5sZWZ0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgcHJldHR5UHJpbnQobm9kZS5sZWZ0Q2hpbGQsIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLCB0cnVlKTtcclxuICAgIH1cclxuICB9O1xyXG5sZXQgbnVtYmVyc0FyciA9IFsxLCA3LCA0LCAyMywgOCwgOSwgNCwgMywgNSwgNywgOSwgNjcsIDYzNDUsIDMyNF07XHJcblxyXG5cclxubGV0IGlkZWsgPSBUcmVlKCk7XHJcbi8vIGlkZWsuYnVpbGRUcmVlKG51bWJlcnNBcnIsIDAsIG51bWJlcnNBcnIubGVuZ3RoIC0gMSk7XHJcbmNvbnNvbGUubG9nKGlkZWsucm9vdChudW1iZXJzQXJyLCAwLCBudW1iZXJzQXJyLmxlbmd0aCAtIDEpKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==