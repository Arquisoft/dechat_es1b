/**
* An creator function that emulates a class of group
* @param id of the group
* @param name of the group
* list of
* @param participants
* @param owner, the active user
*/
function group(id, name, participants, owner){
	var groupTR = new Object();
	groupTR.id = id;
	groupTR.name = name;
	groupTR.participants = participants;
	groupTR.icon = "https://" + owner + "/dechat/" + name +"//ico.png"
	
	return groupTR;
}

exports.group = group;