const fc = require("solid-file-client")
const MESSAGE_FILE = "messages.txt"
const CHAT_FOLDER = "/dechat"
const txtFileBuilder = require("./textFileBuilder.js")
const reader = require("./POD-reader/ChatManager.js")
const folderValidator = require('./folderValidator')

class PODHelper{
	
    constructor(fetch){
        this.fetch = fetch;
    }
    
    /**
     * Creates a file in the specified inbox with the json data passed as argument
     * @param {String} inboxURL 
     * @param {String} data Promise
     * @return {Promise} file
     */
    sendToInbox(friend, message){
        var friendRoute = friend.inbox + "/dechat.txt"
	
	    //Login since it looks like its required 
	    fc.popupLogin();
	    return fc.createFile(friendRoute, message).then(200);
    }
	
    /**
     * Grant the necessary permissions to read a file
     * @param {String} route of the file  
     * @param {String} webID of the partner
     */
	async grantReadPermissionsToFile(fileRoute, partnerID) {
		var aclRoute = fileRoute+".acl";
		var aclContents = txtFileBuilder.generateACL(partnerID, MESSAGE_FILE);
		
		await fc.updateFile(aclRoute, aclContents).then(success => {
			200
		}, err => fc.createFile(aclRoute, aclContents).then(200));
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
		
		await fc.popupLogin().then(200);
		
		
		await fc.createFolder(folderRoute).then(200);
		
		var messagesJSON = txtFileBuilder.buildJSONmessages(userID, partnerID, messages);
		
		
		await fc.updateFile(podFileRoute, messagesJSON).then(success => {
			200
		}, err => fc.createFile(podFileRoute, messagesJSON).then(200));
		
		this.grantReadPermissionsToFile(podFileRoute, partnerID);
		
	}

    /**
     * Read the url file
     * @return {Promise} file
     */
    readFile(url){
        return fc.readFile(url);
    }
	
	/**
	* Read pod receives the webid of the chat participants returning and ordered array of messages
	* @param userURL the webID of the chat's ownerDocument
	* @param friendURL the webID of the chat's contact
	* @return the ordered list of the conversation messages
	*/
	readPod(userURL, friendURL){
		var user = userURL.replace("https://","").replace("/profile/card#me","");
		var partner = friendURL.replace("https://","").replace("/profile/card#me","");
		return reader.read(user, partner);
	}

    /**
     * Deletes the content of the folder specified by url, assuming the logged user has the rights to do so
     * @param {String} url 
     * @return {Promise} files
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
     * @return {Promise} files
     */
    getFilesFromFolder(url){
        return fc.readFolder(url).then((result) => {
            return result.files;
        })
    }

    /**
     * Deletes the file with the given URL
     * @param {String} url 
     * @return {Promise} file
     */
    deleteFile(url){
        return fc.deleteFile(url).then(() => 200);
    }
    
    /**
     * Creates a folder using the url
     * @param {String} url folder
     */
    async createFolder(url){
        await fc.createFolder(url);
    }
    
   /**
     * Reads a folder using the url
     * @param {String} url folder
     * @return {Promise} Object promise if exist or undefined if not
     */
    async readFolder(url){
       return fc.readFolder(url).then(folder => { return(folder)}, err=> console.log(err));
    }

    /**
     * Check if the pod has the dechat folder
     * If not, creates the folder
     * @param {String} url folder
     */
    async checkDechatFolder(userUrl){
        let check =  await this.readFolder(userUrl + CHAT_FOLDER);
        if (check == undefined){
            this.createFolder(userUrl + CHAT_FOLDER);
        }
    }
	
	/**
	* Check if a determinate folder or file exists or is accesible
	* @Param {String} uri to validate its existence
	* @return {Boolean} true if exists, false in other case
	*/
	async validate(uriToValidate){
		let result = await folderValidator.validate(uriToValidate);
		return result;
	}
    
}

module.exports = PODHelper;
