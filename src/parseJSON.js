// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
};








general format:
    go through string character by character,
    encounter " => return string until next "
    encounter [ => return array until next ]
    encounter { => return object until next }
    encounter 0-9 (including decimals) => return number until not 0-9
    encounter true/false/null => return true/false/null if next characters fit

functions needed:
    nextCharacter (advance in text and check against specialchars)
    skipWhitespace (not useful unless in string)
    parseString
    parseArray
    parseObject
    parseNumber
    parseWord
