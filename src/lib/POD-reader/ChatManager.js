var podReader = require('./PodReader.js');
var textParser = require('./TextParserage.js');
var sorter = require('./Sorter.js');

/**
 * This function get all messages and return
 * an array with all messages of 2 person
 * sorter by date.
 */
function get(myWebid, hisWebid){
    var myPod = podReader.read(myWebid);
    var hisPod = podReader.read(hisWebid);

    var myMessages = textParser.parseString(myPod);
    var hisMessages = textParser.parseString(hisPod);

    var allMessages = myMessages.concat(hisMessages);

    return sorter.sort(allMessages);
}