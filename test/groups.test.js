const Chat = require("../src/lib/chat");
const Persona = require("../src/model/person");
const Message = require("../src/model/message");
const chatManager = require("../src/lib/ChatManager/ChatManager");
const permissionsService = require("../src/lib/ChatManager/GroupHandle/permissionsService/permissions");

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
    it('Check if create file of groups.txt', async () => {
        //Create file on init
        await chatManager.createFileOnInit(user.id);
        let localitation = user.id.replace("/profile/card#me", "");
        localitation = localitation + "/group/groups.txt";
        //Check if file exist
        console.log(" *** localitation: " + localitation);
        console.log(" +++ result: " + await validator.checkFile(localitation));
    });
    it('Check permissions work', async () => {
        permissionsService.givePermisionsToFriends("podaes1b.solid.community");
        permissionsService.groupsPermission("podaes1b.solid.community");
        let result = await permissionsService.createACLFile({});
        expect(result).toBe("@prefix : <#>. \n@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n@prefix c: </profile/card#>. \n\n:ControlReadWrite \n\ta n0:Authorization;" +
            " \n\tn0:accessTo <groups.txt>; \n\tn0:agent c:me; \n\tn0:mode n0:Control, n0:Read, n0:Write. \n:ReadWrite \n\ta n0:Authorization; \n\tn0:accessTo <groups.txt>; \n\tn0:agent; \n\tn0:mode n0:Write, n0:Read.");
        //Again, in some ecosystem like Travis don't work with prefixeds list.
        //console.log(await permissionsService.createPrefixedFriends(["prueba.solid.comunnity", "prueba2.solid.comunnity"]));
        expect(await permissionsService.createPrefixedFriends({})).toBe("");
        expect(await permissionsService.createPrefixedFriends({})).toBe("");
        expect(await permissionsService.createACLFileForFolderContent({})).toBe("@prefix : <#>. \n" +
            "@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n" +
            "@prefix c: </profile/card#>. \n" +
            "\n" +
            ":Control \n" +
            "\ta n0:Authorization; \n" +
            "\tn0:accessTo <messages.txt>; \n" +
            "\tn0:agent c:me; \n" +
            "\tn0:mode n0:Control, n0:Read, n0:Write. \n" +
            ":Read \n" +
            "\ta n0:Authorization; \n" +
            "\tn0:accessTo <messages.txt>; \n" +
            "\tn0:agent; \n" +
            "\tn0:mode n0:Read.");
        expect(await permissionsService.createACLFileForInfo({})).toBe("@prefix : <#>. \n" +
            "@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n" +
            "@prefix c: </profile/card#>. \n" +
            "\n" +
            ":Control \n" +
            "\ta n0:Authorization; \n" +
            "\tn0:accessTo <info.txt>; \n" +
            "\tn0:agent c:me; \n" +
            "\tn0:mode n0:Control, n0:Read, n0:Write. \n" +
            ":ReadWrite \n" +
            "\ta n0:Authorization; \n" +
            "\tn0:accessTo <info.txt>; \n" +
            "\tn0:agent; \n" +
            "\tn0:mode n0:Read, n0:Write.");
        expect(await permissionsService.createPrefixedParticipants({})).toBe("");
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