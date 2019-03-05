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
        var jsonstring = JSON.stringify( {
            "title": "dechat",
            "content":{
                "origin":this.user,
                "url": "https://example.org"
            }            
        });
        return jsonstring;
    }
}

module.exports = Message;