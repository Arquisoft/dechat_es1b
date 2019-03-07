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
    }

    async sendMessage(text){		
		var message = new Message(this.user.id, this.partner.id, text);
		
		this.pod.sendToOwnPOD(this.user.id, this.partner.id, message);
        // TODO give format to the notification     
        return this.pod.sendToInbox(this.partner,
        message.user);
    }

    async getMessages(){
        // TODO read messages in the chat file
    }

    async clearChat(){
        // TODO empty chat
    }

    /*
        Checks if a notification has arrived for the current chat, in that case
        removes the notification and executes the callback function
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
            callback();
        }

        for (const url in hits){
            this.pod.deleteFile(url);
        }
    }
}

module.exports = Chat