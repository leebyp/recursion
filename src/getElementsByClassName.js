// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here

	function addToResult(node){
		if (node === document.body){
//			var resultArray = [];
			for (var i=1; i<node.childNodes.length; i++){
				addToResult(node.childNodes[i]);
			}
			return resultArray;
		}
		else {
			if (node.classList !== undefined){
				for (var i=0; i<node.classList.length; i++){
					if (node.classList[i] === className){
						resultArray.push(node);
					}
				}
			}
			if (node.childNodes.length !== 0){
				for (var i=0; i<node.childNodes.length; i++){
					addToResult(node.childNodes[i]);
				}
			}
		}
	}

	var resultArray = [];
	return addToResult(document.body);

};


function hasClass (className, node) {
   var classArray = node.className.split(/\s+/);
   return classArray.indexOf(className) !== -1 ? true : false;
}
 

var getElementsByClassName = function (className, node) {
  node = node || document.body;
 
  var results = [];
 
  if (hasClass(className, node)){
    results.push(node);
  }
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      results = results.concat( getElementsByClassName(className, node.children[i]) );
    }
  }

  return results;
};