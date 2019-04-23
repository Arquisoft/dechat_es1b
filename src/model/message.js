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

    init(timestamp){
        this.timestamp = timestamp;
    }

/**
 * Converts an object or JavaScript value into a JSON text string
 * Format: {"date": time, "message": content}
 * @return {String} JSON text string
 */
    serialize(){
        return JSON.stringify({
            "date": this.timestamp,
            "message":this.content
        })
    }
}

module.exports = Message;