// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
    function error(errormessage){
        throw {
            name:       'SyntaxError',
            message:    errormessage,
            atIndex:         currentIndex,
            text:       text
        };
    }

    function nextCharacter(expectedChar){
        if (expectedChar && currentCharacter !== expectedChar) {
            error('Expected "' + expectedChar + '" instead of "' + currentCharacter + '"');
        }
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
            nextCharacter('t');
            nextCharacter('r');
            nextCharacter('u');
            nextCharacter('e');    
            return true;
        }
        else if (currentCharacter === 'f'){
            nextCharacter('f');
            nextCharacter('a');
            nextCharacter('l');
            nextCharacter('s');
            nextCharacter('e');
            return false;
        }
        else if (currentCharacter === 'n'){
            nextCharacter('n');
            nextCharacter('u');
            nextCharacter('l');
            nextCharacter('l');
            return null;
        }
    }

    function parseNumber(){
        var number, numberstring = '';
        while((currentCharacter>='0' && currentCharacter<='9')||(currentCharacter==='.')||(currentCharacter==='e')||(currentCharacter==='+')||(currentCharacter==='-')){
            numberstring += currentCharacter;
            nextCharacter();
        }
        number = Number(numberstring);
        if (isNaN(number)){
            error("Bad number")
        }
        else {
            return number;
        }
    }

    function parseString(){
        var string = '';
        nextCharacter('"');
        while(currentCharacter){
            while(currentCharacter!=='"'){
                string += currentCharacter;
                nextCharacter();
            }
            nextCharacter('"');
            return string;
        }
        error('Bad string');
    }

    function parseArray(){
        var array = [];
        nextCharacter('[');
        skipWhitespace();
        if (currentCharacter === ']') {
            nextCharacter(']');
            return array;
        }
        while(currentCharacter){
            array.push(value());
            skipWhitespace();
            if (currentCharacter === ']'){
                nextCharacter(']');
                return array;
            }
            nextCharacter(',');
        }
        error('Bad array');
    }

    function parseObject(){
        var key, object = {};
        nextCharacter();
        skipWhitespace();
        if (currentCharacter === '}'){
            nextCharacter();
            return object;
        }
        while(currentCharacter){
            key = value();
            skipWhitespace();
            nextCharacter();
            object[key] = value();
            skipWhitespace();
            if (currentCharacter === '}'){
                nextCharacter();
                return object;
            }
            nextCharacter();
        }
        error('Bad object');
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
        else if ((currentCharacter>='0' && currentCharacter<='9')||(currentCharacter==='.')||(currentCharacter==='e')||(currentCharacter==='+')||(currentCharacter==='-')) {
            return parseNumber();
        }
        else if (currentCharacter==='t' || currentCharacter==='f' || currentCharacter==='n'){
            return parseWord();
        }
        else {
            error('Unexpected "' + currentCharacter + '"');
        }
    }

    var currentCharacter = '', currentIndex, text;
    text = json;
    currentIndex = 0;
    nextCharacter();
    var result = value();

    return result;
};







/*
general format:
    go through string character by character,
    encounter " => return string until next "
    encounter [ => push/return array at next ,/]
    encounter { => insertprop/return object at next ,/}
    encounter 0-9 (including decimals) => return number until not 0-9
    encounter true/false/null => return true/false/null if characters fit

functions needed:
    nextCharacter (advance in text to check against specialchars)
    skipWhitespace (not useful unless in string)
    parseString
    parseArray
    parseObject
    parseNumber
    parseWord
*/