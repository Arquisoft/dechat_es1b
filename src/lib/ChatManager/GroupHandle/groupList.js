const fileClient = require('solid-file-client');
const dechatFolder = "dechates1b";

 async function listGroups(user){

 var url = "https://"+user+"/"+dechatFolder+"//groups.txt";

 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 

 return thejson;
}

exports.listGroups = listGroups;