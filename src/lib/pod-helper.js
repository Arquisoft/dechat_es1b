
class PODHelper{
    constructor(fetch){
        this.fetch = fetch;
    }
    
    sendToInbox(inboxURL, data){
        return this.fetch(inboxURL, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Slug": data.title,
            },
            body: data.url
        })
    }

    getURL(url){
        return this.fetch(url, {
            method: 'GET'
        })
    }
}

module.exports = PODHelper;