const fileClient = require('solid-file-client');

 async function listGroups(user){

 var url = "https://"+user+"/dechat//groups.txt";

 var salida = await fileClient.readFile(url);

 var thejson =  JSON.parse(salida);
 
 var list = [];
 for(i in thejson.list){
	 list.push(thejson.list[i]);
 }

 return list;
}

exports.listGroups = listGroups;