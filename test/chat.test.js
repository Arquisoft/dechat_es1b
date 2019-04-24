const Chat = require("../src/lib/chat");
const Persona = require("../src/model/person");
const Message = require("../src/model/message");
const chatManager = require("../src/lib/ChatManager/ChatManager");

const fc = require("solid-file-client");


const user = new Persona("https://podaes1b.solid.community/profile/card#me", "Carmen", "https://podaes1b.solid.community/inbox");
const target = new Persona("https://es1btest.solid.community/profile/card#me", "Paco", "https://es1btest.solid.community/inbox");

const chat = new Chat(user, target);

const OK = 200;


describe('Send/Get messages tests', () => {
    beforeAll(() => {        
        // Mock POD server calls
        chatManager.writeOwnPOD = jest.fn();
        chatManager.writeInbox = jest.fn();
        fc.popupLogin = jest.fn().mockResolvedValue(OK);
        fc.updateFile = jest.fn().mockResolvedValue(OK);
        fc.readFolder = jest.fn().mockResolvedValue(OK);
        fc.createFolder = jest.fn().mockResolvedValue(OK);
        }),
    it('Message should get sent', async () => {    
        await chat.init();
        expect(chat.sentMessages.length).toBe(0);
        await chat.sendMessage("New message");
        expect(chat.sentMessages.length).toBe(1);
        expect(chat.messages.length).toBe(1);
        // Make sure all the POD function calls were done
        expect(chatManager.writeOwnPOD).toBeCalled();
        expect(await chatManager.writeInbox).toBeCalled();
    })
    it('Message should get sent', async () => {  
        await chat.sendMessage("New message 2");
        expect(chat.messages.length).toBe(1);
        // Make sure all the POD function calls were done
        expect(chatManager.writeOwnPOD).toBeCalled();
        expect(await chatManager.writeInbox).toBeCalled();
    })
    it('Image should get sent', async () => { 
        await chat.sendMessage("http://example.org/image.jpg", "image");
        expect(chat.messages.length).toBe(1);
        // Make sure all the POD function calls were done
        expect(chatManager.writeOwnPOD).toBeCalled();
        expect(await chatManager.writeInbox).toBeCalled();
    })
    it('File should get sent', async () => {  
        await chat.sendMessage("http://example.org/file.pdf", "file");
        expect(chat.messages.length).toBe(1);
        // Make sure all the POD function calls were done
        expect(chatManager.writeOwnPOD).toBeCalled();
        expect(await chatManager.writeInbox).toBeCalled();
    })
    it('Check sentMessages array work when init chat', async () => {
        //Init the chat with 4 messages. 3 sent by owner and other by target.
        var ms1 = new Message("podaes1b.solid.community", "es1btest.solid.community", "What's updog?");
        ms1.timestamp = new Date(2016, 11, 24, 10, 33, 30, 0);
        var ms2 = new Message("podaes1b.solid.community", "es1btest.solid.community", "Not much, u?");
        ms2.timestamp = new Date(2017, 11, 24, 10, 33, 30, 0);
        var ms3 = new Message("es1btest.solid.community", "podaes1b.solid.community", "You're looking updog today")
        ms3.timestamp = new Date(2018, 11, 24, 10, 33, 30, 0);
        var ms4 = new Message("podaes1b.solid.community", "es1btest.solid.community", "Why do I ever bother talking to you?");
        ms4.timestamp = new Date(2018, 11, 25, 10, 33, 30, 0);
        await chat.init([ms1, ms2, ms3, ms4]);

        expect(chat.messages.length).toBe(4);
        expect(chat.sentMessages.length).toBe(3);

        await chat.sendMessage("http://example.org/image.jpg", "image", [ms1, ms2, ms3, ms4]);
        
        expect(chat.messages.length).toBe(5);
        expect(chat.sentMessages.length).toBe(4);

        // Make sure all the POD function calls were done
        expect(chatManager.writeOwnPOD).toBeCalled();
        expect(await chatManager.writeInbox).toBeCalled();
    })
});
