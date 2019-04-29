const Chat = require("../src/lib/chat");
const Persona = require("../src/model/person");
const Message = require("../src/model/message");
const chatManager = require("../src/lib/ChatManager/ChatManager");

const fc = require("solid-file-client");
const validator = require('../src/lib/ChatManager/GroupHandle/existenceValidators');
const user = new Persona("https://podaes1b.solid.community/profile/card#me", "Carmen", "https://podaes1b.solid.community/inbox");
const target = new Persona("https://es1btest.solid.community/profile/card#me", "Paco", "https://es1btest.solid.community/inbox");

const chat = new Chat(user, target);

const OK = 200;


describe('Test groups', () => {
    beforeAll(() => {
        // Mock POD server calls
        chatManager.writeOwnPOD = jest.fn();
        chatManager.writeInbox = jest.fn();
        fc.popupLogin = jest.fn().mockResolvedValue(OK);
        fc.updateFile = jest.fn().mockResolvedValue(OK);
        fc.readFolder = jest.fn().mockResolvedValue(OK);
        fc.createFolder = jest.fn().mockResolvedValue(OK);
    }),
    it('Check if create group', async () => {
        //Create file on init
        await chatManager.createFileOnInit(user.id);
        let localitation = user.id.replace("/profile/card#me", "");
        localitation = localitation + "/group/groups.txt";
        //Check if file exist
        console.log(" *** localitation: " + localitation);
        console.log(" +++ result: " + await validator.checkFile(localitation));
    });
});

//This test cant work in any ecosystem.
// describe('Test groups', () => {
//     it('Check if create group', async () => {
//         let podaes1bCredentials = {
// 			"idp": "https://solid.community",
// 			"username": "podaes1b",
// 			"base": "https://podaes1b.solid.community",
// 			"password": "arquitectura20191b"
//         }
//         fileClient.login(podaes1bCredentials).then( webId => {
//             console.log( `Logged in as ${webId}.`)
//         }, err => console.log(err) );
//
//
//         //Create file on init
//         await chatManager.createFileOnInit(user.id);
//         let localitation = user.id.replace("/profile/card#me", "");
//         localitation = localitation + "/group/groups.txt";
//         //Check if file exist
//         console.log(" *** localitation: " + localitation);
//         console.log(" +++ result: " + await validator.checkFile(localitation));
//         console.log(await chatManager.createGroup("TestGroup", ["es1btest.solid.community"], "podaes1b.solid.community"));
//     })
// });