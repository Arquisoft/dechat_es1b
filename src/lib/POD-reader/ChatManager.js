var podReader = require('./PodReader.js');
var textParser = require('./TextParser.js');
var sorter = require('./Sorter.js');
const fileClient = require('solid-file-client');
const creator = require('./ElementCreator.js')

/*
 * This function get all messages from a single pod uri
 * parsing file and converting to a json
 * After this an element creator go over every message 
 * and create every element message
 */

 async function singleUriGetter(url){

 var salida = await fileClient.readFile(url);

 var tr = await creator.create(textParser.parseString(salida));

 return await tr;
}

/*
*	This function receives two uri applies singleUriGetter
* 	to create a message array for each onerror
*	and returns the sorted by date list 
*/
async function read(url1, url2){
	var a1 = await singleUriGetter(url1);
	var a2 = await singleUriGetter(url2);
	var at = await a1.concat(a2);
	var tr = await sorter.sort(at);
 return await tr;
}

exports.read = read;