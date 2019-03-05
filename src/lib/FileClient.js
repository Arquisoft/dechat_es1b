const fileClient = require("solid-file-client")

/*
* Writes "message" parameter string to a file within webId's pod
* @param {string} webID: User's pod webID, where te message is saved to
* @param {Person} friend: User to who the message is addressed
* @param {string} message: Simple text representing the message
*/
async function sendMessageToPOD(webID, friend, message) {
	alert(message)
	
	//Obtaining a string with POD's rute to where we wanna write
	folder = "/private/"+friend.name+"/messages.txt"
	podRoute = webID.replace("/profile/card#me", folder)
	
	//Login since it looks like its required 
	fileClient.popupLogin().then( webId => {
       console.log( `Logged in as ${webId}.`)
	}, err => console.log(err) );
	
	//Here a notification should be sent to friend, along with 
	//adding messages instead of creating file each time
	
	fileClient.createFile(podRoute, message).then( fileCreated => {
	console.log(`Created file ${fileCreated}.`);
	}, err => console.log(err) );
	
	  
}

module.exports = {
    sendMessageToPOD
}
