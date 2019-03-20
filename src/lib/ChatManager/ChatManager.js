const chatReader = require("./ChatReader/ChatReader");
const chatWriter = require("./ChatWriter/ChatWriter");

/**
 * This function receives two uri applies singleUriGetter
 * 	to create a message array for each onerror
 *	and returns the sorted by date list 
 * @param {String} urla Example: martinlacorrona.solid.community
 * @param {String} urlb Example: javierardura.solid.community
 */
async function read(urla, urlb) {
    return chatReader.read(urla, urlb);
};

/**
* Read pod receives the webid of the chat participants returning and ordered array of messages
* @param userURL the webID of the chat's ownerDocument
* @param friendURL the webID of the chat's contact
* @return the ordered list of the conversation messages
*/
function readPod(userURL, friendURL) {
    return chatReader.readPod(userURL, friendURL);
};

/**
 * Creates a file in the specified inbox with the json data passed as argument
 * @param {String} inboxURL 
 * @param {String} data Promise
 * @return {Promise} file
 */
function writeInbox(friend, message) {
    return chatWriter.sendToInbox(friend, message);
};

/**
 * Creates a folder in user's own pod, containing a json representing chat messages
 * and grants read permissions to partner.
 * @param {String} userID 
 * @param {String} partnerID
 * @param {Array} messages
 */
async function writeOwnPOD(userID, partnerID, messages) {
    chatWriter.sendToOwnPOD(userID, partnerID, messages);
};

module.exports = {
    read,
    readPod,
    writeInbox,
    writeOwnPOD
}