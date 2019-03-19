const fileClient = require("solid-file-client");
const folderManager = require("./FolderManager");
const MESSAGE_FILE = "messages.txt";
const txtFileBuilder = require("./TextFileBuilder");

/**
* Class with all the methods necessaries to manage a POD and write in the chat
*/
class ChatWriter {
    
    /**
     * Creates a file in the specified inbox with the json data passed as argument
     * @param {String} inboxURL 
     * @param {String} data Promise
     * @return {Promise} file
     */
    sendToInbox(friend, message){
        var friendRoute = friend.inbox + "/dechat.txt"
	    //Login since it looks like its required 
	    fileClient.popupLogin();
	    return fileClient.createFile(friendRoute, message).then(200);
    }
	
	/**
     * Creates a folder in user's own pod, containing a json representing chat messages
	 * and grants read permissions to partner.
     * @param {String} userID 
     * @param {String} partnerID
	 * @param {Array} messages
     */
	async sendToOwnPOD(userID, partnerID, messages) {
		//Obtaining a string representing contact's webID
		//To do this, we will isolate the variable part of the WebID 
		//(example: https://jhon.solid.community will turn into jhon.solid)
		var friendIdentifier = partnerID.replace("https://", "");
		var partes = friendIdentifier.split(".");
		friendIdentifier = partes[0]+"."+partes[1];
		var folderRoute = userID.replace("/profile/card#me", "/dechat/"+friendIdentifier+"/");
		var podFileRoute = folderRoute+MESSAGE_FILE;
		await fileClient.popupLogin().then(200);
		await fileClient.createFolder(folderRoute).then(200);
		var messagesJSON = txtFileBuilder.buildJSONmessages(userID, partnerID, messages);
		await fileClient.updateFile(podFileRoute, messagesJSON).then(success => {
			200
		}, err => fileClient.createFile(podFileRoute, messagesJSON).then(200));
		folderManager.grantReadPermissionsToFile(podFileRoute, partnerID);
	}
   
}

module.exports = {
    sendToInbox,
    sendToOwnPOD,
}
