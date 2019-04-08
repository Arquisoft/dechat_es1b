const fileClient = require('solid-file-client');

 async function listGroups(user){

 var url = "https://"+user+".solid.community/dechat//groups.txt";

 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 
 var list = [];
 for(i in thejson.list){
	 list.push(thejson.list[i]);
 }

 return list;
}

 async function addGroup(user, groupName){

 var url = "https://"+user+".solid.community/dechat//groups.txt";
 
 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 
 thejson.list.push(groupName);
 
 //Subir el archivo

}

exports.listGroups = listGroups;
exports.addGroup = addGroup;