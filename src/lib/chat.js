/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const chatManager = require("./ChatManager/ChatManager.js");
const Message = require("../model/message");
const query = require("../lib/ldflex-queries");

class Chat {

    constructor(user, partner) {
        this.user = user;
        this.partner = partner;
        //sentMessages and messages will be load when user sendMessage or open chat.
        this.sentMessages = [];
        this.messages = [];
    }

    /**
    * Method to send a message
    * @param {} content this can be file or string.
    * @param {String} type depend type, sendMessage process this.
    * @return {Promise} file
    */
    async sendMessage(content, type) {
        var message = new Message(this.user.id, this.partner.id, content, type);
        this.messages = await this.getMessages();

        //Is is type image, process this:
        if(type === "image") {
            var friendIdentifier = this.partner.id.replace("https://", "");
	        var partes = friendIdentifier.split(".");
	        friendIdentifier = partes[0] + "." + partes[1];
            var folderRoute = this.user.id.replace("/profile/card#me", "/dechat/" + friendIdentifier + "/files");
            //Save in content name of file.
            message.content = folderRoute+ "/" + content.name;
            console.log("Uploadig file... [" + message.content + "]");

            //Upload image to Own POD.
            await chatManager.uploadFileToOwnPOD(content, this.user.id, this.partner.id);
            console.log("File uploaded fine.");
        }

        //Save current sentMessages.
        this.sentMessages = [];
        let userID = this.user.id.replace("/profile/card#me", "").replace("https://", "");
        for(var i = 0; i < this.messages.length; i++) {
            if(this.messages[i].user === userID) {
                if(this.messages[i].type==undefined){
                    let newMsg = new Message(this.messages[i].user, this.messages[i].partner, this.messages[i].content);
                    newMsg.init(this.messages[i].timestamp);
                    this.sentMessages.push(newMsg)
                }else{
                    let newMsg = new Message(this.messages[i].user, this.messages[i].partner, this.messages[i].content,this.messages[i].type);
                    newMsg.init(this.messages[i].timestamp);
                    this.sentMessages.push(newMsg)
                }
                
            }
        }
        //Saving to array current message
        this.sentMessages.push(message);
        this.messages.push(message);
        await chatManager.writeOwnPOD(this.user.id, this.partner.id, this.sentMessages);
        return chatManager.writeInbox(this.partner, message.user);
    }

    /**
    * Method to get the messages
    * @return {Array} messages
    */
    async getMessages() {
        var messages = await chatManager.readPod(this.user.id, this.partner.id);
        return messages;
    }

    /**
    * Delete all the messages and clear the chat
    */
    async clearChat() {
        // TODO empty chat
    }

    /**
     * Returns the profile pic of the given user if it has one, else undefined
     * @param {WebID} webID 
     */
    async getProfilePic(webID){
        var pic = await query.getProfilePic(webID);
        return pic;
    }
}

module.exports = Chat
