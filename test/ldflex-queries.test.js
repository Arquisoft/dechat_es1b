const query = require("../src/lib/ldflex-queries")

/**
 * Tests ldflex-queries functionality
 */
describe("LDFlex queries tests", function(){
    const WebID = "https://es1btest.solid.community/profile/card#me";
    it("Gets name from WebID", async function(){
        const name = await query.getName(WebID);
        expect(name).toBe("Paco");
    }),
    it("Gets inbox URI from WebID", async function(){        
        const inbox = await query.getInbox(WebID);
        expect(inbox).toBe("https://es1btest.solid.community/inbox/");
    }),
    it("Gets friends of from WebID", async function(){
        const friends = await query.getFriends(WebID);
        expect(friends.length).toBe(2);
        expect(friends[friends.length-1].id).toBe("https://samuelcifuentes.solid.community/profile/card#me");
    })
})