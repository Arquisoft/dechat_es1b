const Chat = require("../src/lib/chat")
const auth= require("solid-auth-client")
const fc = require("solid-file-client")
const PODHelper = require("../src/lib/pod-helper")
const query = require("../src/lib/ldflex-queries")

describe("Chat tests", function(){
    const user = "https://podaes1b.solid.community/profile/card#me";
    const target = "https://samuelcifuentes.solid.community/profile/card#me";
    const pod = new PODHelper(auth.fetch)
    const chat = new Chat(user, target)
    it("Notification should get sent to inbox", async function(){
       var response = await chat.sendMessage("funsiona plz");
       expect(response.ok).toBeTruthy()
    })/*,
    it("Probando a leer el inbox", async function(){
        var inbox = await query.getInbox(target);
        console.log(await pod.getURL(inbox));
    })*/
})