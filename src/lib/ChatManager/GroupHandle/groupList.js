const fileClient = require('solid-file-client');
const createGroup = require('./group.js');
const FolderManager = require("../../ChatWriter/FolderManager");


 async function listGroups(user){

 var url = "https://"+user+"/group//groups.txt";

 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 

 return thejson;
}

async function listGroupsOnInit(user){
	var listInitial = await listGroups(user);
	var listJSON = await listInitial;
	var i;
	var listOfTR = [];
	for(i in listJSON.list){
		var folderUri = "https://"+user+"/"+FolderManager.DECHAT_FOLDER+"/"+listJSON.list[i].id+"//info.txt";
		var readed = await fileClient.readFile(folderUri);
		var jsonreaded = JSON.parse(readed);
		var theObje = createGroup.group(jsonreaded.id, jsonreaded.name, jsonreaded.participants, jsonreaded.owner)
		listOfTR.push(theObje);
	}
	return listOfTR;
}

exports.listGroups = listGroups;
exports.listGroupsOnInit = listGroupsOnInit;