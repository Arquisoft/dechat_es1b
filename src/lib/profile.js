const writer = require("./ChatManager/ChatWriter/ProfileWriter");

function addContact(userId, contactId){
    // TODO check if webid is valid
    writer.addContact(userId, contactId);
}

module.exports = {
    addContact
};