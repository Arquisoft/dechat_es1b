const Chat = require("../src/lib/chat")
const auth= require("solid-auth-client")
const PODHelper = require("../src/lib/pod-helper")
const fc = require("solid-file-client")
const Persona = require("../src/model/person")

const user = new Persona("https://podaes1b.solid.community/profile/card#me", "Carmen", "https://podaes1b.solid.community/inbox");
const target = new Persona("https://es1btest.solid.community/profile/card#me", "Paco", "https://es1btest.solid.community/inbox");
const pod = new PODHelper(auth.fetch)
const chat = new Chat(user, target)
const targetChat = new Chat(target, user);
const OK = 200;

describe("Inbox and notification tests", function(){   
    beforeAll(()=>{
        // Mock solid-file-client
        fc.createFile = jest.fn().mockResolvedValue(OK);
        fc.popupLogin = jest.fn().mockResolvedValue(OK);
        fc.deleteFile = jest.fn().mockResolvedValue(OK);
        fc.readFolder = jest.fn().mockResolvedValue(
            {
                "files":[
                    "dechat.txt"
                ]
            }
        )        
    }),
    it("Notification should get sent to inbox", async function(){
        var response = await chat.sendMessage("This is a test message :^)");
        expect(response).toBe(OK)
    }),
    it("Testing reading Inbox", async function(){
        inboxR = await pod.getFilesFromFolder(target.inbox);
        expect(inboxR.length).toBe(1)      
    }),
    it("There's a message from the other guy", async function(done){     
        // First we send a message to target   
        await chat.sendMessage("User sends a message to target");    
        // If the message arrrived to target's inbox it should be recognized
        // and the callback should be called    
        fc.readFile = jest.fn().mockResolvedValue(user.id) // We mock the contents of the notification
        var callback = jest.fn().mockImplementation(()=>{ done(); })
        targetChat.checkForNotifications(callback);
    }, 500),
    it("There's a message but not from the other guy", async function(done){
        // First we send a message to target   
        await chat.sendMessage("User sends a message to target");    
        // If the callback is called it means we have a false positive    
        fc.readFile = jest.fn().mockResolvedValue("Mr. Bug") // We mock the contents of the notification
        var callback = jest.fn().mockImplementation(()=>{ done.fail("Oh no") })
        targetChat.checkForNotifications(callback);
        done()
    })

})
