/**
 * Class representing a message
 */
class Message{
    constructor(user, partner, content, type){
        this.user = user;
        this.partner = partner;
        this.content = content;
        this.timestamp = new Date().getTime();
        if(type == undefined)
            this.type = "message";
        else
            this.type = type;
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
            "message" : this.content,
            "type" : this.type
        })
    }
}

module.exports = Message;