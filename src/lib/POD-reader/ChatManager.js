var podReader = require("./PodReader.js");
var textParser = require("./TextParser.js");
var sorter = require("./Sorter.js");
const creator = require("./ElementCreator.js");

/*
 * This function get all messages from a single pod uri
 * parsing file and converting to a json
 * After this an element creator go over every message 
 * and create every element message
 */
async function singleUriGetter(myWebid, hisWebid) {
	//This get chat.js from parse myWebId and hisWebid.
	var myWebidURL = "https://" + myWebid + "/private/" + hisWebid + "/chat.json";

	var salida = await podReader.readFile(myWebidURL);
	var tr = await creator.create(textParser.parseString(salida));

	return await tr;
}

/**
 * This function receives two uri applies singleUriGetter
 * 	to create a message array for each onerror
 *	and returns the sorted by date list 
 * @param {*} url1 Example: martinlacorrona.solid.community
 * @param {*} url2 Example: javierardura.solid.community
 */
async function read(url1, url2) {
	var messagesUrl1 = await singleUriGetter(url1, url2);
	var messagesUrl2 = await singleUriGetter(url2, url2);
	var allMessages = await messagesUrl1.concat(messagesUrl2);
	var alMessagesSorter = await sorter.sort(allMessages);

	return await alMessagesSorter;
}

exports.read = read;