
class PODHelper{
    constructor(fetch){
        this.fetch = fetch;
    }
    
    sendToInbox(inboxURL, data){
        return this.fetch(inboxURL, {
            method: 'POST',
            body: data
        })
    }
}

module.exports = PODHelper;