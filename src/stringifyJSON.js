// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
    function addToResult(target){
        if (Array.isArray(target)){
            var individualResult = '[';
            var individualArray = [];
            for (var i=0; i<target.length; i++){
                if (target[i] !== undefined && typeof target[i] !== 'function'){
                    individualArray.push(addToResult(target[i]));
                }
            }
            individualResult += individualArray.join(',')
            individualResult += ']';
            return individualResult;
        }
        else if (typeof target === 'object'){
            if (target === null){
                return 'null';
            }
            var individualResult = '{';
            var individualArray = [];
            for (var x in target){
                if (target[x] !== undefined && typeof target[x] !== 'function'){
                    individualArray.push('"'+ x + '"' + ':' + addToResult(target[x]));
                }
            }
            individualResult += individualArray.join(',')
            individualResult += '}';
            return individualResult;        
        }
        else if (typeof target === 'string'){
            return '"' + target + '"';
        }
        else {
            return ''+target;
        }
    }

    return addToResult(obj);
};


var stringifyJSON = function (obj) {
// your code goes here
    var results = '';

    if (Array.isArray(obj)){
        results += '[' + obj.map(stringifyJSON).join(',') + ']';
    }
    else if (typeof(obj) === 'object' && obj !== null) {
        var tempArray = [];
        for (var prop in obj){
            if (typeof obj[prop] !== 'function' && obj[prop] !== undefined){
                console.log(typeof obj[prop]);
                tempArray.push('"' + prop + '":' + stringifyJSON(obj[prop]));
            }
        }
        results += '{' + tempArray.join(',') + '}';
    }
    else if (typeof(obj) === 'string') {
        results += '"' + obj + '"';
    }
    else {
        results += String(obj);
    }
    return results;
};