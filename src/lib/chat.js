/**
 * Interface that isolates SOLID pod handling from the UI regarding the chat itself
 */
"use strict";
class Chat{
    constructor(webID){
        this.webID = webID
    }

    async sendMessage(){
        // TODO save message in sender's POD
        // TODO push notification in receiver's POD
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