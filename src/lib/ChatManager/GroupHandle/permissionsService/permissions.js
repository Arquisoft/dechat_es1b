const fileClient = require('solid-file-client');
const query = require('../../../ldflex-queries.js');
const FolderManager = require("../../ChatWriter/FolderManager");

/**
* Give permission to all friends to write and read the folder dechates1b
* In the pod of the
* @param person
*/
async function givePermisionsToFriends(person)
{
	var folderACLURI = "https://"+person+"/group/.acl";
	var listOfFriends = await query.getFriends();
	
	var folderACL = await createACLFileForFolder(person);
	fileClient.updateFile(folderACLURI, await folderACL);	
	
}


/**
* Give permission to all friends to write in file groups.txt
* In the pod of the
* @param person
*/
async function groupsPermission(person)
{
	var uriToEdit = "https://"+person+"/group//groups.txt.acl";
	var listOfFriends = await query.getFriends();
	//console.log(listOfFriends.toString());
	
	var fileTU =  await createACLFile(listOfFriends);
	fileClient.updateFile( uriToEdit, await fileTU);
	
	
}

/**
* Main function to generate the ACL file to give permissions to friends from
* @param listOfFriends
*/
async function createACLFile(listOfFriends){

	var ACL = "@prefix : <#>. \n"
		+ "@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n"
		+ "@prefix c: </profile/card#>. \n"
		+ await createPrefixedFriends(listOfFriends)
		+ "\n"
	
		+ ":ControlReadWrite \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <groups.txt>; \n"
		+ "\tn0:agent c:me; \n"
		+ "\tn0:mode n0:Control, n0:Read, n0:Write. \n"
		+ ":ReadWrite \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <groups.txt>; \n"
		+ await addParticipants(listOfFriends)
		+ "\tn0:mode n0:Write, n0:Read.";


	return ACL;
}

/**
* Main function to generate the ACL file to give permissions to friends from
* @param listOfFriends
*/
async function createACLFileForFolder(user){

	var ACL = "@prefix : <#>. \n"
		+ "@prefix acl: <http://www.w3.org/ns/auth/acl#>. \n"
		+ "@prefix foaf: <http://xmlns.com/foaf/0.1/>. \n"
		+ "\n"
	
		+ "<#owner> \n"
		+ "\ta acl:Authorization; \n"
		+ "\tacl:agent \n"
		+ "\t<https://"+user+"/profile/card#me>; \n"
		+ "\tacl:accessTo <./>; \n"
		+ "\tacl:defaultForNew <./>; \n"
		+ "\tacl:mode \n"
		+ "\tacl:Read, acl:Write, acl:Control. \n"
		
		+ "<#public> \n"
		+ "\ta acl:Authorization; \n"
		+ "\tacl:agentClass foaf:Agent;\n"
		+ "\tacl:accessTo <./>; \n"
		+ "\tacl:defaultForNew <./>; \n"
		+ "\tacl:mode acl:Read, acl:Write, acl:Append.";   

	return ACL;
}


/**
* Support method to declare all the
* @param participants 
* to receive permissions 
*/
async function createPrefixedFriends(participants){
	var strTR = "";
	
	for(i in participants){
		var partnerID = participants[i].id.replace('#me','#');
		strTR = strTR + "@prefix c"+i+": <" + partnerID + ">. \n";
	}
	return strTR;
}

/**
* Support method to give permission to all 
* @param participants 
*/
async function addParticipants(participants){
	var strTR = "\tn0:agent";
	for(i in participants){
		
		if(i != participants.length -1){
			strTR = strTR + " c"+i+":me,";
		}
		else{
			strTR = strTR + " c"+i+":me";
		}
	}
	strTR = strTR + "; \n";
	return strTR;
}

/***********************************************************************************************************************************/


/**
* Give permission to all participants to read a
* @param groupID
* In the pod of the
* @param person
* to all the participants from
* @param listOfParticipants
*/
async function groupFolderPermission(person, groupID, listOfParticipants)
{
	var listB = [];
	for(i in listOfParticipants){
		if(listOfParticipants[i] != person){
			listB.push(listOfParticipants[i]);
		}
	}
	
	var uriToEdit = "https://"+person+"/"+FolderManager.DECHAT_FOLDER+"/"+groupID+"//messages.txt.acl";
	var mainUri = "https://"+person+"/"+FolderManager.DECHAT_FOLDER+"/"+groupID+"//messages.txt";

	var fileTU =  await createACLFileForFolderContent(await listB);
	
	fileClient.updateFile( uriToEdit, await fileTU);
	
	
}

/**
* Main function to generate the ACL file to give permissions to friends from
* @param listOfFriends
* to access the group folder content
*/
async function createACLFileForFolderContent(listOfFriends){

	var ACL = "@prefix : <#>. \n"
		+ "@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n"
		+ "@prefix c: </profile/card#>. \n"
		+ await createPrefixedParticipants(listOfFriends)
		+ "\n"

		+ ":Control \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <messages.txt>; \n"
		+ "\tn0:agent c:me; \n"
		+ "\tn0:mode n0:Control, n0:Read, n0:Write. \n"
		+ ":Read \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <messages.txt>; \n"
		+ await addParticipants(listOfFriends)
		+ "\tn0:mode n0:Read.";

	return ACL;
}

/**
* Main function to generate the ACL file to give permissions to friends from
* @param listOfFriends
* to access the info txt
*/
async function createACLFileForInfo(listOfFriends){

	var ACL = "@prefix : <#>. \n"
		+ "@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n"
		+ "@prefix c: </profile/card#>. \n"
		+ await createPrefixedParticipants(listOfFriends)
		+ "\n"

		+ ":Control \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <info.txt>; \n"
		+ "\tn0:agent c:me; \n"
		+ "\tn0:mode n0:Control, n0:Read, n0:Write. \n"
		+ ":ReadWrite \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <info.txt>; \n"
		+ await addParticipants(listOfFriends)
		+ "\tn0:mode n0:Read, n0:Write.";

	return ACL;
}

/**
* Support method to declare all the
* @param participants 
* to receive permissions 
*/
async function createPrefixedParticipants(participants){
	var strTR = "";
	
	for(i in participants){
		var partnerID = "https://"+participants[i]+"/profile/card#";
		strTR = strTR + "@prefix c"+i+": <" + partnerID + ">. \n";
	}
	return strTR;
}
/***********************************************************************************************************************************/


/**
* Give permission to owner to read a
* @param groupID
* In the pod of the
* @param person
* to the
* @param owner
*/
async function groupInfoPermission(person, groupID, owner)
{
	var uriToEdit = "https://"+person+"/"+FolderManager.DECHAT_FOLDER+"/"+groupID+"//info.txt.acl";
	var mainUri = "https://"+person+"/"+FolderManager.DECHAT_FOLDER+"/"+groupID+"//info.txt";

	var listOfParticipantsB = [];
	listOfParticipantsB.push(owner);
	var fileTU =  await createACLFileForInfo(listOfParticipantsB);
	fileClient.updateFile( uriToEdit,await fileTU);
	
	
}

/**
* Give permission to all participants to read a
* @param groupID
* In the pod of the
* @param person
* to 
* @param listOfParticipants
*/
async function groupInfoPermissionForOwner(person, groupID, listOfParticipants)
{
	var uriToEdit = "https://"+person+"/"+FolderManager.DECHAT_FOLDER+"/"+groupID+"//info.txt.acl";
	var mainUri = "https://"+person+"/"+FolderManager.DECHAT_FOLDER+"/"+groupID+"//info.txt";
	var fileTU =  await createACLFileForInfo(listOfParticipants);
	fileClient.updateFile( uriToEdit,await fileTU);
	
	
}

exports.givePermisionsToFriends = givePermisionsToFriends;
exports.groupInfoPermission = groupInfoPermission;
exports.groupsPermission = groupsPermission;
exports.groupFolderPermission = groupFolderPermission;
exports.groupInfoPermissionForOwner = groupInfoPermissionForOwner;
exports.createACLFile = createACLFile;
exports.createPrefixedFriends = createPrefixedFriends;