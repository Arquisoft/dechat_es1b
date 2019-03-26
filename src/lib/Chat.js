/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const chatManager = require("./ChatManager/ChatManager.js");
const folderManager = require("./ChatManager/ChatWriter/FolderManager.js");
const fileManager = require("./ChatManager/ChatWriter/FileManager.js");
const Message = require("../model/message");

class Chat {

    constructor(user, partner) {
        this.user = user;
        this.partner = partner;
        //TODO: Sent messages should be initialized from reading user's pod so we keep older messages
        this.sentMessages = [];
        this.messages = [];
    }

    /**
    * Method to send a message
    * @param {String} text content of the message 
    * @return {Promise} file
    */
    async sendMessage(text) {
        var message = new Message(this.user.id, this.partner.id, text);
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
        return this.messages;
    }

    /**
    * Delete all the messages and clear the chat
    */
    async clearChat() {
        // TODO empty chat
    }

    /**
     *   Checks if a notification has arrived for the current chat, in that case
     *   removes the notification and executes the callback function
     *   @param {function} callback
     *   @return {Array} messages
     */
    async checkForNotifications(callback) {
        var hits = [];
        var files = await folderManager.getFilesFromFolder(this.user.inbox);
        for (const file of files) {
            let content;
            content = await fileManager.readFile(file.url);
            if (content == this.partner.id) {
                hits.push(await file.url);
                this.messages = await chatManager.readPod(this.user.id, this.partner.id);
            }
        }

        if (hits.length > 0) {
            callback(this.messages);
        }

        for (const url of hits) {
            fileManager.deleteFile(url);
        }
        return this.messages;
    }
}

module.exports = Chat
