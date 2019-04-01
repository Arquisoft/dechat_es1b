const fileManager = require("../src/lib/ChatManager/ChatWriter/FileManager");
const fc = require("solid-file-client")
const Chat = require("../src/lib/chat")
const Persona = require("../src/model/person")
const Notifier = require("../src/lib/notifier")

const user = new Persona("https://podaes1b.solid.community/profile/card#me", "Carmen", "https://podaes1b.solid.community/inbox");
const target = new Persona("https://es1btest.solid.community/profile/card#me", "Paco", "https://es1btest.solid.community/inbox");

const chat = new Chat(user, target);
const notifications = new Notifier(user);

const OK = 200;

describe("Inbox and notification tests", function(){       

    beforeAll(()=>{
        // Mock solid-file-client
        fc.createFile = jest.fn().mockResolvedValue(OK);
        fc.updateFile = jest.fn().mockResolvedValue(OK);
        fc.popupLogin = jest.fn().mockResolvedValue(OK);
        fc.deleteFile = jest.fn().mockResolvedValue(OK);
        fc.createFolder = jest.fn().mockResolvedValue(OK);
        fc.readFolder = jest.fn().mockResolvedValue(
            {
                "files":[
                    {
                        "url": "dechat.txt"
                    }
                ]
            }
        )

        fileManager.readFile = jest.fn().mockResolvedValue(target.id)
        fileManager.deleteFile = jest.fn().mockResolvedValue(OK);
    }),
    it("Notification should get sent to inbox", async function(){
        var response = await chat.sendMessage("This is a test message :^)");
        expect(response).toBe(OK)
    }),
    it("Testing reading Inbox", async function(){
        var callback = jest.fn()
        inboxR = await notifications.checkForNotifications(callback);
        // Messages should get returned
        expect(inboxR.length).toBe(1);   
        // If we found messages callback function should get called
        expect(callback).toBeCalled();
    })
})