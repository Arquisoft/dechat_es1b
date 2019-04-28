/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const chatManager = require("./ChatManager/ChatManager.js");
//const videochat = require("./VideoChat/PeerManager.js");
const Message = require("../model/message");
const query = require("../lib/ldflex-queries");
const jpegasus = require('jpegasus');
const folderManager = require("../lib/ChatManager/ChatWriter/FolderManager");

class Chat {

    constructor(user, partner) {
        this.user = user;
        this.partner = partner;
        //sentMessages and messages will be load when user sendMessage or open chat.
        this.sentMessages = [];
        this.messages = [];
    }

    /**
     * Function to init chat.
     * @param {} messagesTest only for test.
     */
    async init(messagesTest) {
        let messages;
        if(messagesTest === undefined)
            messages = await this.getMessages();
        else {//This is only for testing.
            messages = messagesTest;
            this.messages = messagesTest;
        }

        //Initializate current sentMessages.
        this.sentMessages = [];
        let userID = this.user.id.replace("/profile/card#me", "").replace("https://", "");
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].user === userID) {
                if (messages[i].type == undefined) {
                    let newMsg = new Message(messages[i].user, messages[i].partner, messages[i].content);
                    newMsg.init(messages[i].timestamp);
                    this.sentMessages.push(newMsg)
                } else {
                    let newMsg = new Message(messages[i].user, messages[i].partner, messages[i].content, messages[i].type);
                    newMsg.init(messages[i].timestamp);
                    this.sentMessages.push(newMsg)
                }
            }
        }
    }

    /**
    * Method to send a message
    * @param {} content this can be file or string.
    * @param {String} type depend type, sendMessage process this.
    * @param {} messagesTest only for test.
    * @return {Promise} file
    */
    async sendMessage(content, type, messagesTest) {
        var message = new Message(this.user.id, this.partner.id, content, type);
        
        if(messagesTest === undefined)
            this.messages = await this.getMessages();
        else { //This is only for testing.
            this.messages = messagesTest;
        }

        //Is is type image, process this:
        if (type === "image" || type === "file") {
            let friendIdentifier = this.partner.id.replace("https://", "");
            let partes = friendIdentifier.split(".");
            friendIdentifier = partes[0] + "." + partes[1];
            let folderRoute = this.user.id.replace("/profile/card#me", "/" + folderManager.DECHAT_FOLDER
                + "/" + friendIdentifier + "/files");
            //Save in content name of file.
            message.content = folderRoute + "/" + content.name;
            console.log("Uploadig image file... [" + message.content + "]");
            if(type === "image") {
                //Compress image
                content =
                    await jpegasus.compress(content, {
                        maxHeight: 1000,
                        maxWidth: 1000,
                        quality: 0.65
                    });
            }
            //Upload image to Own POD.
            await chatManager.uploadFileToOwnPOD(content, this.user.id, this.partner.id);
            console.log("Image file uploaded fine.");
        }
        //Saving to array current message
        this.sentMessages.push(message);
        this.messages.push(message);
        await chatManager.writeOwnPOD(this.user.id, this.partner.id, this.sentMessages);
        return chatManager.writeInbox(this.partner, message.user);
    }

    /**
    * Method to get the messages and initializate sentMessages array.
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
    async getProfilePic(webID) {
        var pic = await query.getProfilePic(webID);
        return pic;
    }
}

module.exports = Chat
