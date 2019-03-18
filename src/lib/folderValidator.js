const fileClient = require('solid-file-client');

/** Boolean function to determine the existence of a solid file or folder
* @param {String} uri the pod uri of the element to know about its existence
* @return {Boolean} true if exists, false if is not accesible or non-existent
*/
async function checkFolder(uri)
{
	try{
		await fileClient.readFile(uri);
		return true;
	}
	catch(err){
		return false;
	}
}
exports.validate = checkFolder;