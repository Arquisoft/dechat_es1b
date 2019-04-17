const fileClient = require('solid-file-client');
const query = require('../../../ldflex-queries.js');
/**
* Give permission to all friends to write in file groups.txt
* In the pod of the
* @param person
*/
async function groupsPermission(person)
{
	var uriToEdit = "https://"+person+"/dechat//groups.txt.acl";

	var listOfFriends = await query.getFriends();
	//console.log(listOfFriends.toString());
	
	var fileTU =  await createACLFile(listOfFriends);
	fileClient.updateFile( uriToEdit, fileTU).then( success => {
    console.log( `Updated ${url}.`)
	}, err => console.log(err) );
	
	
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
		+ ":Write \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <groups.txt>; \n"
		+ await addParticipants(listOfFriends)
		+ "\tn0:mode n0:Write.";

		console.log(ACL);
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

exports.groupsPermission = groupsPermission;