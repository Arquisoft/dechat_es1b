const fileClient = require("solid-file-client");
const folderManager = require("./FolderManager");
const MESSAGE_FILE = "messages.txt";
const txtFileBuilder = require("./TextFileBuilder");
const query = require("../../ldflex-queries")

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
	var folderRoute = userID.replace("/profile/card#me", folderManager.CHAT_FOLDER +
									"/" + friendIdentifier + "/");
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
	folderManager.grantReadPermissionsToFileWithMessages(podFileRoute, partnerID);
};

/**
 * Function to upload file to own pod and grant permissions to partner.
 * @param {*} file 
 * @param {*} userID 
 * @param {*} partnerID 
 */
async function uploadFileToOwnPOD(file, userID, partnerID) {
	var friendIdentifier = partnerID.replace("https://", "");
	var partes = friendIdentifier.split(".");
	friendIdentifier = partes[0] + "." + partes[1];
    var folderRoute = userID.replace("/profile/card#me", "/dechat/" + friendIdentifier + "/files");

	 //If folder don't exist create.
	let checkFilesFolder = await folderManager.readFolder(folderRoute);
        if(typeof checkFilesFolder === 'undefined'){
            await folderManager.createFolder(folderRoute);
        }
	var URI = folderRoute + "/" + file.name;
    folderManager.grantReadPermissionsToFile(URI, partnerID,file.name);
    var content = file;
    fileClient.updateFile(URI, content).then( res=> {
        console.log(res);
    }, err=>{console.log("upload error : "+err)});
}

module.exports = {
	sendToInbox,
	sendToOwnPOD,
	uploadFileToOwnPOD
}
