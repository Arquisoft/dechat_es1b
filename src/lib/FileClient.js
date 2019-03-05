const fileClient = require("solid-file-client")

/*
* Writes "message" parameter string to a new file within friend's pod
*/
async function sendMessageToPOD(friend, message) {
	alert(message)
	//Obtaining a string with POD's rute to where we wanna write
	friendRoute = friend.inbox + "/chat"+friend.name+".txt"
	//Should be changed to user's pod so own messages are kept
	
	//Login since it looks like its required 
	fileClient.popupLogin().then( webId => {
       console.log( `Logged in as ${webId}.`)
	}, err => console.log(err) );
	
	fileClient.createFile(friendRoute, message).then( fileCreated => {
	console.log(`Created file ${fileCreated}.`);
	}, err => console.log(err) );
	
	  
}

module.exports = {
    sendMessageToPOD
}
