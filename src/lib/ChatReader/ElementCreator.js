

/**
 * Create a message object
 * @return {Object} message
 */
function createSingle(sender, receiver, tmessage){
	var tr = new Object;
	tr.sender = sender;
	tr.receiver = receiver;
	tr.content = tmessage.message;
	tr.timestamp = tmessage.date;
	return tr;
}

/**
 * Create a list of Objects messages
 * @param {JSON} json file
 * @return {Array} array of Objects messages
 */
function create(jsonfile){
	var sender = jsonfile.webid_sender;
	var receiver = jsonfile.webid_receiver;
	var messages = jsonfile.messages;
	var lista = [];
	var particularMessage;
	var i;
	for(i in messages) {
		particularMessage = createSingle(sender, receiver, messages[i]);
		lista.push(particularMessage);
	}
	return lista;
}

exports.create = create;