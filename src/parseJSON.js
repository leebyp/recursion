// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here

    function nextCharacter(){
        currentCharacter = text.charAt(currentIndex);
        currentIndex += 1;
        return currentCharacter;
    }

    function skipWhitespace(){
        while (currentCharacter === ' '){
            nextCharacter();
        }
    }

    function parseWord(){
        if (currentCharacter === 't'){
            nextCharacter();
            if (currentCharacter === 'r'){
                nextCharacter();
                if (currentCharacter === 'u'){
                    nextCharacter();
                    if (currentCharacter === 'e'){
                        nextCharacter();    
                        return true;
                    }
                }
            }
        }
        else if (currentCharacter === 'f'){
            nextCharacter();
            if (currentCharacter === 'a'){
                nextCharacter();
                if (currentCharacter === 'l'){
                    nextCharacter();
                    if (currentCharacter === 's'){
                        nextCharacter();
                        if (currentCharacter === 'e'){
                            nextCharacter();
                            return false;
                        }
                    }
                }
            }
        }
        else if (currentCharacter === 'n'){
            nextCharacter();
            if (currentCharacter === 'u'){
                nextCharacter();
                if (currentCharacter === 'l'){
                    nextCharacter();
                    if (currentCharacter === 'l'){
                        nextCharacter();
                        return null;
                    }
                }
            }
        }
    }

    function parseNumber(){
        var number, numberstring = '';
        while((currentCharacter>='0' && currentCharacter<='9')||(currentCharacter==='.')||(currentCharacter==='e')||(currentCharacter==='+')||(currentCharacter==='-')){
            numberstring += currentCharacter;
            nextCharacter();
        }
        number = Number(numberstring);
        return number;
    }

    function parseString(){
        var string = '';
        nextCharacter();
        while(currentCharacter!=='"'){
            string += currentCharacter;
            nextCharacter();
        }
        nextCharacter();
        return string;
    }

    function parseArray(){
        var array = [];
        nextCharacter();
        if (currentCharacter === ']') {
            nextCharacter();
            return array;
        }
        while(currentCharacter){
            array.push(value());
            skipWhitespace();
            if (currentCharacter === ']'){
                nextCharacter();
                return array;
            }
            nextCharacter();
        }
    }

    function parseObject(){
        var key, object = {};
        while(currentCharacter!=='}'){
            while(currentCharacter!==','){
                while(currentCharacter!==':'){
                    key = string()
                }
                object[key] = value();
            }
        }
        return object;
    }

    function value(){
        skipWhitespace();
        if (currentCharacter === '{'){
            return parseObject();
        }
        else if (currentCharacter === '['){
            return parseArray();
        }
        else if (currentCharacter === '"'){
            return parseString();
        }
        else if (currentCharacter >= 0 && currentCharacter <=9){
            return parseNumber();
        }
        else if (currentCharacter==='t' || currentCharacter==='f' || currentCharacter==='n'){
            return parseWord();
        }
    }

    var currentCharacter = '', currentIndex, text;
    text = json;
    currentIndex = 0;
    nextCharacter();
    var result = value();

    return result;
};








general format:
    go through string character by character,
    encounter " => return string until next "
    encounter [ => return array until next ]
    encounter { => return object until next }
    encounter 0-9 (including decimals) => return number until not 0-9
    encounter true/false/null => return true/false/null if next characters fit

functions needed:
    nextCharacter (advance in text to check against specialchars)
    skipWhitespace (not useful unless in string)
    parseString
    parseArray
    parseObject
    parseNumber
    parseWord
