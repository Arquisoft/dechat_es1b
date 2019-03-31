const folderManager = require("./ChatManager/ChatWriter/FolderManager.js");
const fileManager = require("./ChatManager/ChatWriter/FileManager.js");


class Notifier {

    constructor(user){
        this.user = user;
    }

    /**
     *   Checks if a notification has arrived for the current chat, in that case
     *   removes the notification and executes the callback function
     *   @param {function} callback
     *   @return {Array} messages
     */
    async checkForNotifications(callback) {
        var partnerIds = [];
        var files = await folderManager.getFilesFromFolder(this.user.inbox);
        for (const file of files) {
            let content;
            content = await fileManager.readFile(file.url);
            if (!(partnerIds.includes(content)))
                partnerIds.push(content);
        }

        if (partnerIds.length > 0) {
            callback(partnerIds);
        }

        for (const file of files) {
            fileManager.deleteFile(file.url);
        }
        return partnerIds;
    }
}

module.exports = Notifier;