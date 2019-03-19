const chatReader = require("ChatReader/ChatReader.js");
const chatWriter = require("ChatWriter/ChatWriter.js");

    /**
     * This function receives two uri applies singleUriGetter
     * 	to create a message array for each onerror
     *	and returns the sorted by date list 
     * @param {String} urla Example: martinlacorrona.solid.community
     * @param {String} urlb Example: javierardura.solid.community
     */
    async function read(urla, urlb) {
        return this.chatReader(urla, urlb);
    }

    /**
     * Creates a file in the specified inbox with the json data passed as argument
     * @param {String} inboxURL 
     * @param {String} data Promise
     * @return {Promise} file
     */
    function writeInbox(friend, message){
        return this.ChatWriter.sendToInbox(friend,message);
    }
    
    /**
     * Creates a folder in user's own pod, containing a json representing chat messages
     * and grants read permissions to partner.
     * @param {String} userID 
     * @param {String} partnerID
     * @param {Array} messages
     */
    async function writeOwnPOD(userID, partnerID, messages) {
        this.ChatWriter.sendToOwnPOD(userID, partnerID, messages); 
    }

