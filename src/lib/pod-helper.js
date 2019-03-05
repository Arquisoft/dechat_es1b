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
        var friendRoute = friend.inbox + "/chat"+friend.name+".json"
	    //Should be changed to user's pod so own messages are kept
	
	    //Login since it looks like its required 
	    fc.popupLogin().then(200);
	
	    return fc.createFile(friendRoute, message).then(200);
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