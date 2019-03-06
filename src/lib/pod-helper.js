const fc = require("solid-file-client")
const MESSAGE_FILE = "messages.json"

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
        var friendRoute = friend.inbox + "/dechat.txt"
	
	    //Login since it looks like its required 
	    fc.popupLogin();
	
	    return fc.createFile(friendRoute, message).then(200);
    }
	
	/**
	*Generate an ACL text string that grants owner all permissions and Read only to partnerID
	*@param {String} partnerID
	*/
	generateACL(partnerID) {
		partnerID = partnerID.replace("#me", "#");
		var ACL = "@prefix : <#>. \n"
			+"@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n"
			+"@prefix c: </profile/card#>. \n"
			+"@prefix c0: <"+ partnerID + ">. \n\n"

			+":ControlReadWrite \n"
				+"\ta n0:Authorization; \n"
				+"\tn0:accessTo <"+ MESSAGE_FILE +">; \n"
				+"\tn0:agent c:me; \n"
				+"\tn0:mode n0:Control, n0:Read, n0:Write. \n"
			+":Read \n"
				+"\ta n0:Authorization; \n"
				+"\tn0:accessTo <"+ MESSAGE_FILE +">; \n"
				+"\tn0:agent c0:me; \n"
				+"\tn0:mode n0:Read.";
			
		return ACL;
	}
	
	grantReadPermissionsToFile(fileRoute, partnerID) {
		var aclRoute = fileRoute+".acl";
		var aclContents = this.generateACL(partnerID);
		console.log("A 404 ERROR NEXT MEANS PERMISSIONS FILE HAS BEEN SUCCESFULLY CREATED");
		fc.updateFile(aclRoute, aclContents).then(success => {
			console.log("Permissions successfully configured")
		}, err => fc.createFile(aclRoute, aclContents).then(200));
	}
	
	/**
     * Creates a folder in user's own pod, containing a json representing chat messages
	 * and grants read permissions to partner.
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
		var podFileRoute = folderRoute+MESSAGE_FILE;
		
		fc.popupLogin().then(200);
		
		console.log("A 404 ERROR NEXT MEANS FOLDER HAS BEEN SUCCESFULLY CREATED");
		fc.createFolder(folderRoute).then(200);
		
		console.log("A 404 ERROR NEXT MEANS MESSAGE LOG FILE HAS BEEN SUCCESFULLY CREATED");
		fc.updateFile(podFileRoute, message.serialize()).then(success => {
			console.log("Messages file successfully updated")
		}, err => fc.createFile(podFileRoute, message.serialize()).then(200));
		
		this.grantReadPermissionsToFile(podFileRoute, partnerID);
		
	}
	
    saveToPod(user, message){
        var userRoute = user.id
    }

    readFile(url){
        return fc.readFile(url);
    }

    /**
     * Deletes the content of the folder specified by url, assuming the logged user has the rights to do so
     * @param {String} url 
     */
    emptyFolder(url){
        return this.getFilesFromFolder(url).then((files)=>{
            for (const file of files) {
                this.deleteFile(file.url)
            }
        }).catch("Couldn't empty the folder")
    }

    /**
     * Gets the files inside a folder
     * @param {String} url 
     */
    getFilesFromFolder(url){
        return fc.readFolder(url).then((result) => {
            return result.files;
        })
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