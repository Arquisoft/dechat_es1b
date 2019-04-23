const fileClient = require('solid-file-client');
const validator = require('../existencevalidators');
const permissionService = require('../permissionsService/permissions.js')
const glist = require('../groupList.js')
/**
* This function may be called on chat init
* It checks the existence of file groups.txt
* creating it if doesn't exist  or else updating 
* the acl file
* @param activeUser refers the user on session
*/
async function createFileOnInit(activeUser){
	var uriToCheck = "https://" + activeUser + "/dechat//groups.txt"
	if(await validator.checkFile(uriToCheck)){
		permissionService.groupsPermission(activeUser);
	}
	else{
		var groups = {
	"list":
	[
	]
	}	
	
	await fileClient.createFile(uriToCheck, JSON.stringify(groups)).then(200);
	await permissionService.groupsPermission(activeUser)
	}
	
	
}

/**
* This function create a group by passing a 
* @param name of the group
* @param participants
* @param creator, the active user in session
*/
async function createGroup(name, participants, creator){
	var d = new Date();
	var n = d.getTime();
	var idGroup = name+"" + n+""+creator;
	var notAdded = [];

	for(i in participants){
 
	var uriToCheck = "https://" + participants[i] + "/dechat//groups.txt"
	console.log("El resultado de validar es: "+ await validator.checkFile(uriToCheck))
	if(await validator.checkFile(uriToCheck)){
		
			var newGroupAdded = await addGroup(participants[i], idGroup, creator);
			console.log(newGroupAdded);

			await updateGroupsTo(uriToCheck,newGroupAdded);

	}
	else{
		notAdded.push(participants[i]);
	}
	
	}
				
				await createGroupPerSe(creator, idGroup, participants, name);

	return notAdded;
}


/**
* Creates the file groups.txt with the new group
* @param idGroup
* In the pod contained in
* @param uriToCheck
* of the 
* @param activeUser
*/
async function createTheFile(uriToCheck, idGroup, activeUser){
	
	
	var groups = {
	"list":
	[
		{
			"id" : idGroup,
			"owner" : activeUser
		}
	]
}	
	
	await fileClient.createFile(uriToCheck, JSON.stringify(groups)).then(200);
	await permissionService.groupsPermission(activeUser)
}

/** Updates the groups json file of the client included in
* @param uriToCheck 
* with the file containing all groups
* @param newGroupAdded
*/
 async function updateGroupsTo(uriToCheck, newGroupAdded){
	 console.log("********"+newGroupAdded);
	 await fileClient.updateFile( uriToCheck, JSON.stringify(newGroupAdded)).then(200);
 }

/** Gets the group list of 
* @param user
* @param owner of the group
* and adds a new group
* @param groupName
* @return The file with the groups
*/
 async function addGroup(user, groupName, owner){

  var url = "https://"+user+"/dechat//groups.txt";

 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 var tng = {
			"id" : groupName,
			"owner" : owner
		}
 thejson.list.push(tng);

 return thejson;
}
/**
* This function creates the group folder with his messages.txt file
* in the 
* @param activeUser pod 
* for a group determined by 
* @param groupID
* including a 
* @param listOfParticipants
*/
async function createGroupPerSe(activeUser, groupID, listOfParticipants, groupName){
	console.log("/*/* Estoy creando el grupo PERSE")
	var url = "https://"+activeUser+"/dechat/"+groupID;
	console.log("/*/* Estoy creando el grupo PERSE" + url)
	var uriFile = "https://"+activeUser+"/dechat/"+groupID+"//messages.txt";
	var uriInfoFile = "https://"+activeUser+"/dechat/"+groupID+"//info.txt";
	await fileClient.createFolder(url).then(200);
	await fileClient.createFile(uriFile, "").then(200);
	var groupInfo = await fileGroupInfo(activeUser,groupID,listOfParticipants, groupName);
	await fileClient.createFile(uriInfoFile, JSON.stringify(groupInfo)).then(200);
	//await permissionService.groupInfoPermission(activeUser, groupID, groupName);
	await permissionService.groupFolderPermission(activeUser, groupID, listOfParticipants);
	
}

/**
* Creates the info txt document with 
* @param activeUser the owner of the group
* @param groupID 
* @param listOfParticipants
* @param groupName
*/
async function fileGroupInfo(activeUser,groupID,listOfParticipants, groupName){
	return {
		"name" : groupName,
		"id"   : groupID,
		"participants": listOfParticipants,
		"owner": activeUser
	}
}
/**
* This function may be called on init to check that the
* @param user 
* has all group folders created
*/
async function checkAllGroupsOKOnInit(user){
	var groups = await glist.listGroups(user);
	for(i in groups.list){
		var uriToCheck = "https://"+user+"/dechat/"+groups.list[i].id;
		if(!await validator.checkFile(uriToCheck)){
			await createGroupPerSeInSon(user, groups.list[i].id, groups.list[i].owner);
		}
	}
}
/**
* Function to create the group
* owned by
* @param owner
* identified by
* @param id 
* in the POD of a participant
* @param user
*/
async function createGroupPerSeInSon(user, id, owner){
	var folderUri = "https://"+user+"/dechat/"+id;
	await fileClient.createFolder(folderUri).then(200);
	var uriInfo = "https://"+owner+"/dechat/"+id+"//info.txt";
	var infoFile = await fileClient.readFile(uriInfo).then(200);
	var myInfoFileUri = "https://"+user+"/dechat/"+id+"//info.txt";
	await fileClient.createFile(myInfoFileUri, JSON.stringify(infoFile)).then(200);
	var lista = [];
	for(i in infoFile.participants){
		lista.push(infoFile.participants[i]);
	}
	
	var myMessagesFileUri = "https://"+user+"/dechat/"+id+"//messages.txt";
	await fileClient.createFile(myMessagesFileUri, "").then(200);
	await groupFolderPermission(user, id, lista);

}

exports.createFileOnInit = createFileOnInit;
exports.createGroup = createGroup;