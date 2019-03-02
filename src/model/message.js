/**
 * Class representing a message
 */
class Message{
    constructor(content){
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