const writer = require("./ChatManager/ChatWriter/ProfileWriter");
const fc = require("solid-file-client");
const query = require("./ldflex-queries");


async function addContact(userId, contactId, successCallback, errorCallback) {
        if (contactId == null || contactId == ''){
            return;
        }
        const friends = await query.getFriends();
        for (const friend of friends) {
            if (friend.id === contactId)
                errorCallback("You have already added this friend");
        }
        const card = contactId.replace("#me", "");
        fc.readFile(card).then(async (result) => {
                await writer.addContact(userId, contactId)
                successCallback();
            },
            err => {
                errorCallback("WebID is not valid / does not exist");
            });
}

module.exports = {
    addContact
};