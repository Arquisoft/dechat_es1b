const fc = require("solid-file-client")
const sp = require("solid-permissions")
const rdf = require("rdflib")
const webClient = require("solid-web-client")

class PODHelper{
    constructor(fetch){
        this.fetch = fetch;
    }
    
    /**
     * Creates a file in the specified inbox with the json data passed as argument
     * @param {String} inboxURL 
     * @param {String} data 
     */
    sendToInbox(friend, message){
        var friendRoute = friend.inbox + "/chat"+friend.name+".json"

	    //Login since it looks like its required 
	    fc.popupLogin().then(200);
	
	    return fc.createFile(friendRoute, message).then(200);
    }
	
	grantReadPermissionsToFile(fileRoute, partnerID) {
		sp.getPermissions(fileRoute, webClient, rdf)
		.then(function (permissionSet) {
        // Loads the PermissionSet instance, parsed from folder 
        // Now it can be edited and saved
        return permissionSet
          .addPermission(partnerID, solid.acl.READ)
          .save()
		});
	}
	
	/**
     * Creates a folder in the specified pod, containing a json representing chat messages
     * @param {String} userID 
     * @param {String} partnerID
	 * @param {String} message
     */
	sendToOwnPOD(userID, partnerID, message) {
		//Obtaining a string representing contact's webID
		//To do this, we will isolate the variable part of the WebID 
		//(example: https://jhon.solid.community will turn into jhon.solid)
		var friendIdentifier = partnerID.replace("https://", "");
		var partes = friendIdentifier.split(".");
		friendIdentifier = partes[0]+"."+partes[1];
		
		var folderRoute = userID.replace("/profile/card#me", "/private/"+friendIdentifier+"/");
		var podFileRoute = folderRoute+"messages.json";
		
		fc.popupLogin().then(200);
		
		console.log("A 404 ERROR NEXT MEANS FOLDER HAS BEEN SUCCESFULLY CREATED");
		fc.createFolder(folderRoute).then(200);
		
		console.log("A 404 ERROR NEXT MEANS MESSAGE LOG FILE HAS BEEN SUCCESFULLY CREATED");
		fc.updateFile(podFileRoute, message.serialize()).then(success => {
			console.log("Fichero de mensajes actualizado")
		}, err => fc.createFile(podFileRoute, message.serialize()).then(200));
		
		this.grantReadPermissionsToFile(podFileRoute, partnerID);
		
	}
	
    saveToPod(user, message){
        var userRoute = user.id
    }

    /**
     * Gets the files inside a folder
     * @param {String} url 
     */
    getFilesFromFolder(url){
        return fc.readFolder(url).then((result) => result)
    }

    /**
     * Deletes the file with the given URL
     * @param {String} url 
     */
    deleteFile(url){
        return fc.deleteFile(url).then(() => 200);
    }
    
}

module.exports = PODHelper;