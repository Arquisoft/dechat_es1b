const fc = require("solid-file-client")
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
        console.log(friendRoute, message)
	
	    //Login since it looks like its required 
	    fc.popupLogin();
	
	    return fc.createFile(friendRoute, message).then(console.log("ya ta"));
    }
	
	sendToOwnPOD(userID, partnerID, message) {
		
		//Obtaining a string with POD's rute to where we wanna write
		idfriend = partnerID.replace("https://", "");
		idfriend = idfriend.replace("/profile/card#me", "");
		folder = "/private/"+idFriend+"/messages.txt";
		podRoute = userID.replace("/profile/card#me", folder);
		
		fc.popupLogin().then(200);
		
		//TODO: Folder should automatically get read permissions for partner
		return fc.createFile(podRoute, message).then(200);
		
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