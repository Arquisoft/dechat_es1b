const fileClient = require("solid-file-client");
const folderManager = require("./FolderManager");
const MESSAGE_FILE = "messages.txt";
const txtFileBuilder = require("./TextFileBuilder");
const query = require("../../ldflex-queries")
const dechatFolder = "dechates1b";

/**
 * Creates a file in the specified inbox with the json data passed as argument
 * @param {String} inboxURL 
 * @param {String} data Promise
 * @return {Promise} file
 */
function sendToInbox(friend, message) {
	var friendRoute = friend.inbox + "/dechat.txt"
	//Login since it looks like its required 
	fileClient.popupLogin();
	return fileClient.createFile(friendRoute, message).then(200);
};

/**
 * Creates a file in the inbox of all participants with the json data passed as argument
 * @param {String} inboxURL 
 * @param {String} userID
 */
async function sendToInboxGroupal(groupID, userID ,message) {
	var gRoute = "https://"+ userID + "/"+dechatFolder+"/"+groupID+"//info.txt";
	var info = await fileClient.readFile(groupUri);
	var infoJSON = await JSON.parse(info);
	//Login since it looks like its required 
	
	fileClient.popupLogin();
	for(i in infoJSON.participants){
		var friendRoute = "https://"+ infoJSON.participants[i]+"inbox/dechat.txt"
		await fileClient.createFile(friendRoute, message).then(200);
	}
};

/**
 * Creates a folder in user's own pod, containing a json representing chat messages
 * and grants read permissions to partner.
 * @param {String} userID 
 * @param {String} partnerID
 * @param {Array} messages
 */
async function sendToOwnPOD(userID, partnerID, messages) {
	//Obtaining a string representing contact's webID
	//To do this, we will isolate the variable part of the WebID 
	//(example: https://jhon.solid.community will turn into jhon.solid)
	var friendIdentifier = partnerID.replace("https://", "");
	var partes = friendIdentifier.split(".");
	friendIdentifier = partes[0] + "." + partes[1];
	var folderRoute = userID.replace("/profile/card#me", "/"+dechatFolder+"/" + friendIdentifier + "/");
	var podFileRoute = folderRoute + MESSAGE_FILE;
	await fileClient.popupLogin().then(200);

	folderExists = await fileClient.readFolder(folderRoute).then(
		success => 200, 
		err => undefined);
	console.log(folderExists)
	if (typeof folderExists === 'undefined')
		await fileClient.createFolder(folderRoute).then(200);
	var messagesJSON = txtFileBuilder.buildJSONmessages(userID, partnerID, messages);
	await fileClient.updateFile(podFileRoute, messagesJSON).then(success => {
	}, err => fileClient.createFile(podFileRoute, messagesJSON).then(404));
	folderManager.grantReadPermissionsToFile(podFileRoute, partnerID);
};

/**
 * Writes a json representing chat messages
 * in a groupal context
 * @param {String} userID 
 * @param {String} groupID
 * @param {Array} messages
 */
async function sendToOwnPODForGroups(userID, groupID, messages) {
	//Obtaining a string representing contact's webID
	//To do this, we will isolate the variable part of the WebID 
	//(example: https://jhon.solid.community will turn into jhon.solid)
	var folderRoute = userID.replace("/profile/card#me", "/"+dechatFolder+"/" + groupID + "/");
	var podFileRoute = folderRoute + MESSAGE_FILE;
	await fileClient.popupLogin().then(200);
	var messagesJSON = txtFileBuilder.buildJSONmessages(userID, groupID, messages);
	await fileClient.updateFile(podFileRoute, messagesJSON).then(success => {
	}, err => fileClient.createFile(podFileRoute, messagesJSON).then(404));
};


module.exports = {
	sendToInbox,
	sendToOwnPOD,
	sendToOwnPODForGroups,
	sendToInboxGroupal
}
