/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const auth = require("solid-auth-client");
const PODHelper = require("./pod-helper.js");
const Message = require("../model/message");
const query = require("./ldflex-queries.js");
"use strict";
class Chat{
    constructor(user, partner){
        this.pod = new PODHelper(auth.fetch)
        this.user = user
        this.partner = partner

    }

    async sendMessage(text){
        // TODO save message in sender's POD
        // TODO push notification in receiver's POD
        var inboxUrl = await query.getInbox(this.partner)
        return this.pod.sendToInbox(inboxUrl,
         new Message(this.user, this.partner, text).generateNotification());
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
}

module.exports = Chat