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
            "date": this.timestamp,
            "message":this.content
        })
    }
}

module.exports = Message;