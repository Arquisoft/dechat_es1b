const core = require("../lib/core");

/**
 * Class representing a friend for DTO purposes
 */
module.exports = class Friend{
    constructor(friend){
        this.value = friend.value
        this.fullname = await core.getFormattedName(this.value);
        this.inbox = await core.getInboxUrl(this.value);
    }
}