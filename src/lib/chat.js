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
        console.log(text);
		
		var message = new Message(this.user.id, this.partner.id, text);
		
		//this.pod.sendToOwnPOD(this.user.id, this.partner.id, message);
        // TODO give format to the notification     
        return this.pod.sendToInbox(this.partner,
        message.user);
    }

    async getMessages(){
        // TODO read messages in the chat file
    }

    async createChat(){
        // TODO create chat with someone else
    }

    async clearChat(){
        // TODO empty chat
    }

    /*
        Checks if a notification has arrived for the current chat, in that case
        removes the notification and executes the callback function
     */
    checkForNotifications(callback){
        this.pod.getFilesFromFolder(this.user.inbox).then((files) => {
            for (const file of files) {
                this.pod.readFile(file.url).then((content)=>{
                    if (content == this.partner.id){
                        this.pod.deleteFile(file.url);
                        callback();
                        return;
                    }
                })
            }
        })
    }
}

module.exports = Chat