

/**
 * Create a message object
 * @return {Object} message
 */
function createSingle(sender, receiver, tmessage) {
	var tr = new Object;
	tr.user = sender;
	tr.partner = receiver;
	tr.content = tmessage.message;
	tr.timestamp = tmessage.date;
	tr.type = tmessage.type;
	return tr;
}

/**
 * Create a list of Objects messages
 * @param {JSON} json file
 * @return {Array} array of Objects messages
 */
function create(jsonfile) {
	var sender = jsonfile.webid_sender;
	var receiver = jsonfile.webid_receiver;
	var messages = jsonfile.messages;
	var lista = [];
	var particularMessage;
	for (var i in messages) {
		particularMessage = createSingle(sender, receiver, messages[i]);
		lista.push(particularMessage);
	}
	return lista;
}

exports.create = create;