const Chat = require("../src/lib/chat")

describe("Chat tests", function(){
    const WebID = "https://podaes1b.solid.community/profile/card#me";
    const chat = new Chat(WebID)
    it("Notification should get sent to inbox", async function(){
       var response = await chat.sendMessage();
       expect(response.ok).toBeTruthy()
    })
})