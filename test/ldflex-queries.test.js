const query = require("../src/lib/ldflex-queries")

/**
 * Tests ldflex-queries functionality
 */
describe("LDFlex queries tests", function(){
    const WebID = "https://podes1b.solid.community/profile/card#me"
    it("Gets name from WebID", async function(){
        const name = await query.getName(WebID)
        expect(name).toBe("Secundino Bespod")
    }),
    it("Gets inbox URI from WebID", async function(){        
        const inbox = await query.getInbox(WebID)
        expect(inbox).toBe("https://podes1b.solid.community/inbox/")
    })
})