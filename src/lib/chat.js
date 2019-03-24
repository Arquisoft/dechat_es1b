/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const auth = require("solid-auth-client");
const PODHelper = require("./pod-helper.js");
const Message = require("../model/message");
"use strict";
class Chat{
    constructor(user, partner){
        this.pod = new PODHelper(auth.fetch)
        this.user = user
        this.partner = partner
		//TODO: Sent messages should be initialized from reading user's pod so we keep older messages
		this.sentMessages = []
		this.messages = []
    }
    

    /**
    * Method to send a message
    * @param {String} text content of the message 
    * @return {Promise} file
    */
    async sendMessage(text){		
		var message = new Message(this.user.id, this.partner.id, text);
		
		//Saving to array current message
		this.sentMessages.push(message);
		this.messages.push(message);
		await this.pod.sendToOwnPOD(this.user.id, this.partner.id, this.sentMessages);
        return this.pod.sendToInbox(this.partner,
        message.user);
    }
    
    /**
    * Method to get the messages
    * @return {Array} messages
    */
    async getMessages(){
        console.log("Initialized chat user: " + this.user.name + "Partner: " + this.partner.name);
        var listMessages = await this.pod.readPod(this.user.id, this.partner.id);
        return listMessages;
    }
    
    /**
    * Delete all the messages and clear the chat
    */
    async clearChat(){
        // TODO empty chat
    }

    /**
     * Check if the pod has the dechat folder
     * If not, creates the folder
     * @param {String} url folder
     */
    async checkDechatFolder(url){
        this.pod.checkDechatFolder(url);
    }
    /**
     *   Checks if a notification has arrived for the current chat, in that case
     *   removes the notification and executes the callback function
     *   @param {function} callback
     *   @return {Array} messages
     */
    async checkForNotifications(callback){
        var hits = [];
        var files = await this.pod.getFilesFromFolder(this.user.inbox);
        for (const file of files){
            let content;
            content = await this.pod.readFile(file.url);
            if (content == this.partner.id){
                hits.push(await file.url);
                this.messages = await this.pod.readPod(this.user.id, this.partner.id);
                //Printing messages to ensure everything is fine
                /*var i;
                for (i=0; i<this.messages.length; i++)
                    console.log(this.messages[i]);*/
            }
        }

        if (hits.length > 0){
            callback();
        }

        for (const url of hits){
            this.pod.deleteFile(url);
        }
        return this.messages;
    }
}

module.exports = Chat
