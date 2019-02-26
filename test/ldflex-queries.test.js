const ldfquery = require("../src/lib/ldflex-queries")

/**
 * Tests ldflex-queries functionality
 */
describe("LDFlex queries tests", function(){
    const WebID = "https://podes1b.solid.community/profile/card#me"
    const queryFactory= new ldfquery.QueryFactory
    const idQuery = queryFactory.forWebID(WebID)
    it("Gets name from WebID", async function(){
        const name = await idQuery.getName()
        expect(name).toBe("Secundino Bespod")
    }),
    it("Gets inbox URI from WebID", async function(){        
        const inbox = await idQuery.getInbox()
        expect(inbox).toBe("https://podes1b.solid.community/inbox/")
    })
})