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
    it("Gets profile pic from WebID", async function(){
        const picture = await query.getProfilePic(WebID).name;
        expect(picture).toBe(undefined);
    }),
    it("Gets profile pic from WebID w", async function(){
        const picture = await query.getProfilePic(WebID); expect(picture).toBe('https://es1btest.solid.community/profile/5b8e65c53399621bf6c6612a180c8ea462dccea0_full.jpg');
    }),   
    it("Gets inbox URI from WebID", async function(){        
        const inbox = await query.getInbox(WebID);
        expect(inbox).toBe("https://es1btest.solid.community/inbox/");
    }),
    it("Gets friends of from WebID", async function(){
        const friends = await query.getFriends(WebID);
        expect(friends.length).toBe(1);
        expect(friends[friends.length -1].id).toBe("https://test12345.solid.community/profile/card#me");
    })
})