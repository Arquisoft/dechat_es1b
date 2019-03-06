var podReader = require('./PodReader.js');
var textParser = require('./TextParser.js');
var sorter = require('./Sorter.js');

/**
 * This function get all messages and return
 * an array with all messages of 2 person
 * sorter by date.
 */
function get(myWebid, hisWebid){
    //Generate url for chat file in pod.
    var myWebidURL = "https://" + myWebid + "/private" + hisWebid + "/chat.json";
    var hisWebidURL = "https://" + hisWebid + "/private" + myWebid + "/chat.json";

    //Read file of two pods.
    var myPod = podReader.readFile(myWebidURL);
    var hisPod = podReader.readFile(hisWebidURL);

    //Parse files to convert json file in an array of messages.
    var myMessages = textParser.parseString(myPod);
    var hisMessages = textParser.parseString(hisPod);

    //Concat all messages
    var allMessages = myMessages.concat(hisMessages);

    //Sort messages and return this.
    return sorter.sort(allMessages);
}