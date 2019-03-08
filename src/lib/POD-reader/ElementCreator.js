var mess = require("./Message.js");

function createSingle(sender, receiver, tmessage){
	var tr = new Object;
	tr.sender = sender;
	tr.receiver = receiver;
	tr.content = tmessage.message;
	tr.timestamp = tmessage.date;
	return tr;
}

function create(jsonfile){
	var sender = jsonfile.webid_sender;
	var receiver = jsonfile.webid_reciever;
	var messages = jsonfile.messages;
	var lista = [];
	var particularMessage;
	for(var i in messages) {
		particularMessage = createSingle(sender, receiver, messages[i]);
		lista.push(particularMessage);
	}
	return lista;
}

exports.create = create;