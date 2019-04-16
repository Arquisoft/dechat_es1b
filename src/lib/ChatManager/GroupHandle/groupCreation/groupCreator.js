const fileClient = require('solid-file-client');
const validator = require('../existencevalidatora');
/**
* This function create a group by passing a 
* @param name of the group
* @param participants
* @param creator, the active user in session
*/
async createGroup(name, participants, creator){
	var d = new Date();
	var n = d.getTime();
	var idGroup = name+"" + n+""+creator;
	
	for(i in participants){
 
	var uriToCheck = "https://" + participants[i] + "/dechat//groups.txt"
	if(validator.checkFile(uriToCheck)){
		
			var newGroupAdded = await addGroup(participants[i], idGroup);
			await updateGroupsTo(uriToCheck,newGroupAdded);
	
	}
	else{
		createTheFile(uriToCheck, idGroup);
	}
	
	}
	
	
	
}

/**
* Give permission to all friends to write in file groups.txt
* In the pod of the person included in
* @param uriToCheck
*/
async function givePermissionsToFriends(uriToCheck){
	//TODO
}

/**
* Creates the file groups.txt with the new group
* @param idGroup
* In the pod contained in
* @param uriToCheck
*/
async function createTheFile(uriToCheck, idGroup){
	
	await givePermissionsToFriends(uriToCheck);
	var groups = {
	"list":
	[
		idGroup
	]
}	

	await fileClient.createFile(uriToCheck, groups).then(200);
}

/** Updates the groups json file of the client included in
* @param uriToCheck 
* with the file containing all groups
* @param newGroupAdded
*/
 async functionupdateGroupsTo(uriToCheck, newGroupAdded){
	 fileClient.updateFile( uriToCheck, newGroupAdded).then( success => {
    console.log( `Updated ${url}.`)
	}, err => console.log(err) );
 }

/** Gets the group list of 
* @param user
* and adds a new group
* @param groupName
* @return The file with the groups
*/
 async function addGroup(user, groupName){

  var url = "https://"+user+"/dechat//groups.txt";

 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 
 thejson.list.push(groupName);

 return thejson;
}