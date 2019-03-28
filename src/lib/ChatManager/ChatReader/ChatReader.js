var textParser = require("./TextParser.js");
var sorter = require("./Sorter.js");
const creator = require("./ElementCreator.js");
const fileClient = require("solid-file-client");

/**
 * This function get all messages from a single pod uri
 * parsing file and converting to a json
 * After this an element creator go over every message 
 * and create every element message
 * @param {String} Url
 * @return {Array} List of objects messages
 */
async function singleUriGetter(url) {
	var salida = await fileClient.readFile(url);

	var tr = await creator.create(textParser.parseString(salida));

	return await tr;
};

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
	var url1 = "https://" + urla + "/dechat/" + folderB + "/messages.txt";
	var url2 = "https://" + urlb + "/dechat/" + folderA + "/messages.txt";
	var a1 = await singleUriGetter(url1);
	var a2 = await singleUriGetter(url2);
	var at = await a1.concat(a2);
	var tr = await sorter.sort(at);

	return await tr;
};

/**
 * Reads a folder using the url
 * @param {String} url folder
 * @return {Promise} Object promise if exist or undefined if not
 */
async function readFolder(url) {
    return fileClient.readFolder(url).then(folder => { return (folder) }, err => console.log(err));
};

/**
 * Check if a message txt exist.
 * @param {String} url 
 */
async function checkIfMessageExisteOneUrl(url, friendID) {
	url = (url.replace("/profile/card#me", "")) + "/dechat/" +  friendID;
	let check = await readFolder(url);
    if (check == undefined) {
		await fileClient.createFolder(url);
		await fileClient.createFile(url + "/messages.txt");
	}
}

/**
 * If is the first time, messages.txt don't create,
 * so we will create.
 * @param {String} userURL 
 * @param {String} friendURL 
 */
async function checkIfMessagesExists(userURL, friendURL) {
	let userID = userURL.replace("https://", "").replace("/profile/card#me", "");
	let friendID = friendURL.replace("https://", "").replace("/profile/card#me", "");

	await checkIfMessageExisteOneUrl(userURL, friendID);
	await checkIfMessageExisteOneUrl(friendURL, userID);
}

/**
* Read pod receives the webid of the chat participants returning and ordered array of messages
* @param userURL the webID of the chat's ownerDocument
* @param friendURL the webID of the chat's contact
* @return the ordered list of the conversation messages
*/
async function readPod(userURL, friendURL) {
	//First check if messages exists
	await checkIfMessagesExists(userURL, friendURL);

	var user = userURL.replace("https://", "").replace("/profile/card#me", "");
	var partner = friendURL.replace("https://", "").replace("/profile/card#me", "");
	return this.read(user, partner);
};

module.exports = {
	singleUriGetter,
	read,
	readPod
}