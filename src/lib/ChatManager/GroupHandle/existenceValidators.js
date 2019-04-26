const fileClient = require('solid-file-client');

/** Boolean function to determine the existence of a solid file 
* @param {String} uri the pod uri of the element to know about its existence
* @return {Boolean} true if exists, false if is not accesible or non-existent
*/
async function checkFile(uri)
{
	try{
		await fileClient.readFile(uri);
		return true;
	}
	catch(err){
		return false;
	}
}

/** Boolean function to determine the existence of a solid folder
* @param {String} uri the pod uri of the element to know about its existence
* @return {Boolean} true if exists, false if is not accesible or non-existent
*/
async function checkFolder(uri)
{
	try{
		await fileClient.readFolder(uri);
		return true;
	}
	catch(err){
		return false;
	}
}
exports.checkFolder = checkFolder;
exports.checkFile = checkFile;