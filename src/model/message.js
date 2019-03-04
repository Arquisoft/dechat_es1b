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

    generateNotification(){
        return {
            "title": "DeChat"+this.timestamp,
            "content":{
                "origin":this.user,
                "url": "https://example.org"
            }            
        }
    }
}

module.exports = Message;