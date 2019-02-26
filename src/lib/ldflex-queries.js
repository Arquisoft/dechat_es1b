/**
 * Contains basic queries to fetch data from the PODs
 */
const { default: data } = require("@solid/query-ldflex")

/**
 * Creates handlers to run queries against WebID or the authenticated user
 */
class QueryFactory{
    forWebID(webID){
        return new WebIDQueryMaker(webID)
    }

    forSession(){
        return new SessionQueryMaker
    }
}

/**
 * Takes a WebID as a parameter and runs the query against it
 */
class WebIDQueryMaker {
    constructor(webID) {
        this.webID = webID
    }
    async getName() {
        const proxy = await data[this.webID].name
        return proxy.value
    }

    async getInbox() {
        const proxy = await data[this.webID].inbox
        return proxy.value
    }

}

/**
 * Searches in the logged users' POD
 */
class SessionQueryMaker{
    async getName(){
        const proxy = await data.user.name
        return proxy.value
    }

    async getInbox(){
        const proxy = await data.user.inbox
        return proxy.value
    }
}

module.exports = {
    QueryFactory
}