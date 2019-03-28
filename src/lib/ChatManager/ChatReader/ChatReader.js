var textParser = require("./TextParser.js");
var sorter = require("./Sorter.js");
const creator = require("./ElementCreator.js");
const fileClient = require("solid-file-client");
const ChatWritter = require("../ChatWriter/ChatWriter")

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

	console.log(url + ": " + salida);

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
 * If is the first time, messages.txt don't create,
 * so we will create.
 * @param {String} userURL 
 * @param {String} friendURL 
 */
async function checkIfMessageExists(userUrl, friendUrl) {
	var friendIdentifier = friendUrl.replace("https://", "");
	var partes = friendIdentifier.split(".");
	friendIdentifier = partes[0] + "." + partes[1];
	var fileRoute = userUrl.replace("/profile/card#me", "/dechat/" + friendIdentifier + "/messages.txt");
	try {
		await fileClient.readFile(fileRoute);
	} catch(error) {
		console.log("Restaurando ruta: " + fileRoute)
		await ChatWritter.sendToOwnPOD(userUrl, friendUrl, []);
	}
}

/**
 * Check if messages exists.
 * @param {String} userURL 
 * @param {String} friendURL 
 */
async function checkIfMessagesExists(userURL, friendURL) {
	await checkIfMessageExists(userURL, friendURL);
	await checkIfMessageExists(friendURL, userURL);
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
};

module.exports = {
	singleUriGetter,
	read,
	readPod
}