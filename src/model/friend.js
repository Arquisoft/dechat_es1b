const ldfquery = require("../lib/ldflex-queries")

/**
 * Class representing a friend for DTO purposes
 */
module.exports = class Friend{
    constructor(friend){
        this.value = friend.value           
        this.setName()
        this.setInbox()        
    }

    async setName(){
        const queryFactory = new ldfquery.QueryFactory
        const query = queryFactory.forWebID(this.value)
        this.name = await query.getName();
    }

    async setInbox(){
        const queryFactory = new ldfquery.QueryFactory
        const query = queryFactory.forWebID(this.value)
        this.inbox = await query.getInbox();
    }

    getName(){
        return this.name;
    }

    getInbox(){
        return this.inbox;
    }

}
