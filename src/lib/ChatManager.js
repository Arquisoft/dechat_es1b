const chatReader = require("ChatReader/ChatReader.js");

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