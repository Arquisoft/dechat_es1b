var textParser = require("./TextParser.js");
var sorter = require("./Sorter.js");
const creator = require("./ElementCreator.js");
const fileClient = require("solid-file-client");
const ChatWritter = require("../ChatWriter/ChatWriter");
const FolderManager = require("../ChatWriter/FolderManager");
const validator = require('../GroupHandle/existenceValidators');


/**
 * This function get all messages from a single pod uri
 * parsing file and converting to a json
 * After this an element creator go over every message 
 * and create every element message
 * @param {String} Url
 * @return {Array} List of objects messages
 */
async function singleUriGetter(url) {
	//if user haven't folder create, return empty list of messages
	try {
		var salida = await fileClient.readFile(url);
	} catch(error) {
		return [];
	}
	var tr
	if(await salida != "")
		tr = await creator.create(textParser.parseString(salida));
	else
		tr = "";
    
	return await tr;
}

/**
 * This function receives two uri applies singleUriGetter
 * 	to create a message array for each onerror
 *	and returns the sorted by date list 
 * @param {String} urla Example: martinlacorrona.solid.community
 * @param {String} urlb Example: javierardura.solid.community
 */
async function read(urla, urlb) {
	var folderB = urlb.split(".")[0] + "." + urlb.split(".")[1];
	var folderA = urla.split(".")[0] + "." + urla.split(".")[1];
	var url1 = "https://" + urla + "/" + FolderManager.DECHAT_FOLDER + "/" + folderB + "/messages.txt";
	var url2 = "https://" + urlb + "/" + FolderManager.DECHAT_FOLDER + "/" + folderA + "/messages.txt";
	var a1 = await singleUriGetter(url1);
	var a2 = await singleUriGetter(url2);
	var at = await a1.concat(a2);
	var tr = await sorter.sort(at);

	return await tr;
}

/**
 * If is the first time, messages.txt don't create,
 * so we will create.
 * @param {String} userURL 
 * @param {String} friendURL 
 */
async function checkIfMessageExists(userUrl, friendUrl) {
	var friendIdentifier = friendUrl.replace("https://", "");
	var partes = friendIdentifier.split(".");
	friendIdentifier = partes[0] + "." + partes[1];
	var fileRoute = userUrl.replace("/profile/card#me", "/" + FolderManager.DECHAT_FOLDER + "/"
									 + friendIdentifier + "/messages.txt");
	try {
		await fileClient.readFile(fileRoute);
	} catch(error) {
		await ChatWritter.sendToOwnPOD(userUrl, friendUrl, []);
	}
}

/**
 * Check if messages exists, if not create created.
 * @param {String} userURL 
 * @param {String} friendURL 
 */
async function checkIfMessagesExists(userURL, friendURL) {
	await checkIfMessageExists(userURL, friendURL);
}

/**
* Read pod receives the webid of the chat participants returning and ordered array of messages
* @param userURL the webID of the chat's ownerDocument
* @param friendURL the webID of the chat's contact
* @return the ordered list of the conversation messages
*/
async function readPod(userURL, friendURL) {
	await checkIfMessagesExists(userURL, friendURL);
	var user = userURL.replace("https://", "").replace("/profile/card#me", "");
	var partner = friendURL.replace("https://", "").replace("/profile/card#me", "");
	return await read(user, partner);
}

/**
* Supports groupal reading passing the
* @param listOfFriends
* for the group
* @param groupId
* @return ordered messages
*/
async function readGroupal(listOfFriends, groupId){
	var i;
	var listTR = [];
	for (i in listOfFriends){
		var user = listOfFriends[i];
		var urltolook = "https://" + user + "/"+FolderManager.DECHAT_FOLDER+"/" + groupId + "/messages.txt";
		if(validator.checkFile(urltolook)){
		var mess = await singleUriGetter(urltolook);
		if(await mess != ""){
			listTR = await listTR.concat(mess);
		}
		}
	}
	
	
	var tr =  await sorter.sort(listTR);
	return await tr;
}

/**
* Read the group identified by the 
* @param groupId
* in the pod of the 
* @param userID
* @return ordered messages
*/
async function readGroup(userID, groupId){
	var groupUri = "https://"+userID+"/"+FolderManager.DECHAT_FOLDER+"/"+groupId+"//info.txt";
	var info = await fileClient.readFile(groupUri);
	var infoJSON = await JSON.parse(info);
	return await readGroupal(infoJSON.participants, groupId);
	
}

module.exports = {
	singleUriGetter,
	read,
	readPod,
	readGroup
}