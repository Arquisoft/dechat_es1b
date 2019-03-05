const Chat = require("../src/lib/chat")
const auth= require("solid-auth-client")
const PODHelper = require("../src/lib/pod-helper")
const query = require("../src/lib/ldflex-queries")
const fc = require("solid-file-client")

describe("Chat tests", function(){
    const user = "https://podaes1b.solid.community/profile/card#me";
    const target = "https://es1btest.solid.community/profile/card#me";
    const pod = new PODHelper(auth.fetch)
    const chat = new Chat(user, target)

    beforeAll(()=>{
        fc.createFile = jest.fn().mockResolvedValue(200);
        fc.readFolder = jest.fn().mockResolvedValue(["notif1", "notif2", "notif3"]);
        fc.popupLogin = jest.fn().mockResolvedValue(200);
    }),
    it("Notification should get sent to inbox", async function(){
       var response = await chat.sendMessage("This is a test message :^)");
       expect(response).toBe(200)
    }),
    it("Testing reading Inbox", async function(){
        var inbox = await query.getInbox(target);
        inboxR = await pod.getFilesFromFolder(inbox);
        expect(inboxR.length).toBe(3)      
    })
})