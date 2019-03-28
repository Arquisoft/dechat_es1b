/**
* Builds a JSON format file that contains all messages
* @param {String} senderID
* @param {String} receiverID
* @param {Array} messages
* @return {String} desired JSON-format contents in a string
*/
function buildJSONmessages(senderID, receiverID, messages) {
	var sender = senderID.replace("https://", "").replace("/profile/card#me", "");
	var receiver = receiverID.replace("https://", "").replace("/profile/card#me", "");
	var lastupdate = new Date().getTime();

	var jsonstring = JSON.stringify({ "webid_sender": sender, "webid_receiver": receiver, "lastupdate": lastupdate, "messages": "////" });
	var segments = jsonstring.split('"////"');
	var ret = segments[0] + "[";
	var i;
	for (i = 0; i < messages.length; i++) {
		ret = ret + messages[i].serialize();
		if (i != messages.length - 1)
			ret = ret + ",";
		else
			ret = ret + "]" + segments[1];
	}
	if(messages.length == 0)
		ret = ret + "]}";

	return ret;
}

/**
*Generate an ACL text string that grants owner all permissions and Read only to partnerID
*@param {String} partnerID
*@param {String} filename
*@return {String} ACL string content
*/
function generateACL(partnerID, filename) {
	partnerID = partnerID.replace("#me", "#");
	var ACL = "@prefix : <#>. \n"
		+ "@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n"
		+ "@prefix c: </profile/card#>. \n"
		+ "@prefix c0: <" + partnerID + ">. \n\n"

		+ ":ControlReadWrite \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <" + filename + ">; \n"
		+ "\tn0:agent c:me; \n"
		+ "\tn0:mode n0:Control, n0:Read, n0:Write. \n"
		+ ":Read \n"
		+ "\ta n0:Authorization; \n"
		+ "\tn0:accessTo <" + filename + ">; \n"
		+ "\tn0:agent c0:me; \n"
		+ "\tn0:mode n0:Read.";

	return ACL;
}

module.exports = {
	generateACL,
	buildJSONmessages
}