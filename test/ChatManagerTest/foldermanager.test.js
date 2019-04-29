const folderManager = require("../../src/lib/ChatManager/ChatWriter/FolderManager");
const fc = require("solid-file-client");

describe('Methods of folder', () => {
    const folderRoute = "https://marcoslpz1998.solid.community/dechat/marcoslpz1999.solid/";
    it("Read Folder", async function(){
        const folder = await folderManager.readFolder(folderRoute);
        expect(folder).toBe("Paco");
    
    })
})