const Chat = require("../src/lib/chat");
const Persona = require("../src/model/person");
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
        expect(chat.sentMessages.length).toBe(0);
        await chat.sendMessage("New message");
        expect(chat.sentMessages.length).toBe(1);
        // Make sure all the POD function calls were done
        expect(chatManager.writeOwnPOD).toBeCalled();
        expect(await chatManager.writeInbox).toBeCalled();
    })
});
