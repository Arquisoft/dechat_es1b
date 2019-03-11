/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const auth = require("solid-auth-client");
const PODHelper = require("./pod-helper.js");
const Message = require("../model/message");
const reader = require("./POD-reader/ChatManager.js");
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

    async sendMessage(text){		
		var message = new Message(this.user.id, this.partner.id, text);
		
		//Saving to array current message
		this.sentMessages.push(message);
		await this.pod.sendToOwnPOD(this.user.id, this.partner.id, this.sentMessages);
		
		//TODO: Messages array is updated here, should be updated on notification timer function
		//TODO: For some reason messages are retrieved with an undefined receiver field 
		this.messages = await this.pod.readPod(this.user.id, this.partner.id);
		//Printing messages to ensure everything is fine
		var i;
		for (i=0; i<this.messages.length; i++)
			console.log(this.messages[i]);
		
        //TODO: give format to the notification     
        return this.pod.sendToInbox(this.partner,
        message.user);
    }

    async getMessages(){
        return this.messages;
    }

    async clearChat(){
        // TODO empty chat
    }

    /**
     *   Checks if a notification has arrived for the current chat, in that case
     *   removes the notification and executes the callback function
     */
    async checkForNotifications(callback){
        var hits = [];
        var files = await this.pod.getFilesFromFolder(this.user.inbox);
        for (const file of files){
            let content;
            content = await this.pod.readFile(file.url);
            if (content == this.partner.id){
                hits.push(await file.url)
            }
        }

        if (hits.length > 0){
            console.log(hits);
            callback();
        }

        for (const url of hits){
            console.log("BORRO " + url);

            this.pod.deleteFile(url);
        }
    }
}

module.exports = Chat