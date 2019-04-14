const writer = require("./ChatManager/ChatWriter/ProfileWriter");
const fc = require("solid-file-client");
const query = require("./ldflex-queries");


async function addContact(userId, contactId, successCallback, errorCallback) {
    try {
        if (contactId == null || contactId == '')
            throw new Error("WebID can't be empty");
        const friends = await query.getFriends();
        for (const friend of friends){
            if (friend.id === contactId)
                throw new Error("You have already added this friend");
        }
        const card = contactId.replace("#me", "");
        fc.readFile(card).then(result => {
                writer.addContact(userId, contactId);
                successCallback();
            },
            err => {
                throw new Error("WebID is not valid / does not exist");
            });
    } catch (error) {
        errorCallback(error.message);
    }
}

module.exports = {
    addContact
};