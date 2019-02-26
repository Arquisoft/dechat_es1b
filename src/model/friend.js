const query = require("../lib/ldflex-queries")

/**
 * Class representing a friend for DTO purposes
 */
module.exports = class Friend{
    constructor(friend){
        this.value = friend.value
        this.fullname = core.getFormattedName(this.value);
        this.inbox = core.getInboxUrl(this.value);
    }
}
