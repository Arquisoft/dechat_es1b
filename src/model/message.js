/**
 * Class representing a message
 */
class Message{
    constructor(user, partner, content){
        this.user = user;
        this.partner = partner;
        this.content = content;
        this.timestamp = new Date().getTime();
    }

    serialize(){
        return JSON.stringify({
            "content":this.content,
            "timestamp": this.timestamp
        })
    }
}

module.exports = Message;