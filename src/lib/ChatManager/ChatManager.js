const chatReader = require("./ChatReader/ChatReader");
const chatWriter = require("./ChatWriter/ChatWriter");

/**
 * Name of dechat folder in pods.
 * This is the global variable.
 */
const folderNameDechat = "dechat_es1b";

/**
* Read pod receives the webid of the chat participants returning and ordered array of messages
* @param userURL the webID of the chat's ownerDocument
* @param friendURL the webID of the chat's contact
* @return the ordered list of the conversation messages
*/
async function readPod(userURL, friendURL) {
    return await chatReader.readPod(userURL, friendURL);
}

/**
 * Creates a file in the specified inbox with the json data passed as argument
 * @param {String} inboxURL 
 * @param {String} data Promise
 * @return {Promise} file
 */
function writeInbox(friend, message) {
    return chatWriter.sendToInbox(friend, message);
}

/**
 * Creates a folder in user's own pod, containing a json representing chat messages
 * and grants read permissions to partner.
 * @param {String} userID 
 * @param {String} partnerID
 * @param {Array} messages
 */
async function writeOwnPOD(userID, partnerID, messages) {
    chatWriter.sendToOwnPOD(userID, partnerID, messages);
}

/**
 * Creates a folder in user's own pod, containing a json representing chat messages
 * and grants read permissions to partner.
 * @param {String} userID 
 * @param {String} partnerID
 * @param {Array} messages
 */
async function uploadFileToOwnPOD(file, userID, partnerID) {
    chatWriter.uploadFileToOwnPOD(file, userID, partnerID);
}

module.exports = {
    readPod,
    writeInbox,
    writeOwnPOD,
    uploadFileToOwnPOD,
    folderNameDechat
}
