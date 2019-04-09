const writer = require("./ChatManager/ChatWriter/ProfileWriter");
const fc = require("solid-file-client");
const query = require("./ldflex-queries");


async function addContact(userId, contactId, callback){
    const friends = await query.getFriends();
    if (contactId in friends){
        throw new Error("You have already added this friend");
    }
    const card = contactId.replace("#me", "");
    fc.readFile(card).then(result => {
        writer.addContact(userId, contactId);
        callback();
    },
    err => {
        throw new Error("WebID is not valid / does not exist");
    });
    // TODO check if webid is valid
    //writer.addContact(userId, contactId);
}

module.exports = {
    addContact
};