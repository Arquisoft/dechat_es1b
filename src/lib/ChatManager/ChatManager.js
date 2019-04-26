const chatReader = require("./ChatReader/ChatReader");
const chatWriter = require("./ChatWriter/ChatWriter");
const groupCreator = require("./GroupHandle/groupCreation/groupCreator");
const groupList = require("./GroupHandle/groupList");
const permissionService = require("./GroupHandle/permissionsService/permissions.js");

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
};
/**
* CALLABLE ON INIT
* Creates the file groups.txt on Dechat Folder of a user
* this file represents a index of groups
* @param {String} userID
*/
async function createFileOnInit(userID) {
	userID = userID.replace("https://", "");
	groupCreator.createFileOnInit(userID);
};

/**
* Creates the group per se with all necesary files and folders in own pod
* @param {String} groupName
* @param {Array} participantsList
* @param {String] userID
*/
async function createGroup(groupName, participantsList, userID){
	for(i in participantsList){
		participantsList[i] = participantsList[i].replace("https://", "");
	}
	userID = userID.replace("https://", "");
	return await groupCreator.createGroup(groupName, participantsList, userID);
}

/**
* CALLABLE ON INIT
* Creates all group folder and files that does not exist
* @param userID
*/
async function createUncreatedGroups(userID){
	userID = userID.replace("https://", "");
	groupCreator.checkAllGroupsOKOnInit(userID);
}

/**
* Read the group and returns the ordered list of messages
* @param {String} userID
* @param {String} groupId
*/
async function readGroup(userID, groupId){
	userID = userID.replace("https://", "");
	return await chatReader.readGroup(userID, groupId);
}

/**
* Write the message in all participants inbox
* @param {String} groupId
* @param {String} userID
* @param {String} message
*/
async function writeInboxGroupal(groupID, userID ,message){
	userID = userID.replace("https://", "");
	chatWriter.sendToInboxGroupal(groupID, userID, message);
}

/**
* Writes the list of messages in the own pod of the user
* @param {String} userID
* @param {String} groupID
* @param {String} messages
*/

async function writeGroupal(userID, groupID, messages){
	
	chatWriter.sendToOwnPODForGroups(userID, groupID, messages);
}
/**
* CALLABLE ON INIT
* Give permisions of read/write on folder to all friends of
* @param {String} userID
* to create groups because file-client update method remove and cretate again the file
*/
async function givePermissionsToFriends(userID){
	userID = userID.replace("https://","");
	permissionService.givePermisionsToFriends(userID);

}

/**
* CALLABLE ON INIT
* Gives a detailed list of groups 
*/
async function listGroupsOnInit(userID){
	userID = userID.replace("https://","");
	return await groupList.listGroupsOnInit(userID);
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
    createFileOnInit,
    createGroup,
    createUncreatedGroups, 
    readGroup,
    writeInboxGroupal,
    writeGroupal,
    givePermissionsToFriends,
    listGroupsOnInit,
    uploadFileToOwnPOD
}
