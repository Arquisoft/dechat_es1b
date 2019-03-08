var Promise = require("promise");
const fileClient = require("solid-file-client");
var textParser = require("./TextParser.js");
 
var promise = new Promise(function (myWebid, hisWebid) {
  var myWebidURL = "https://" + myWebid + "/private" + hisWebid + "/chat.json";
  var result;
  fileClient.readFile(myWebid).then((body) => { 
	  result = (creator.create(textParser.parseString(body)));
  }, (err) => console.log(err));
  return result;
});

exports.promise = promise;