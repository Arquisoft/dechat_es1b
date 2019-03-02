/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
const auth = require("solid-auth-client")
const PODHelper = require("./pod-helper.js");
const Message = require("../model/message")
"use strict";
class Chat{
    constructor(webID){
        this.pod = new PODHelper(auth.fetch)
        this.webID = webID

    }

    sendMessage(){
        // TODO save message in sender's POD
        // TODO push notification in receiver's POD
        return this.pod.sendToInbox("https://samuelcifuentes.solid.community/inbox/",
         new Message("hola, probando vainas").serialize());
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