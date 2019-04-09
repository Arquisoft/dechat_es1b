const peerjs = require('peerjs')
const peer = undefined;
const conn = undefined;

/**
* This function creates a random ID for our peer and initializes it,
* connecting us to the PeerJs server. 
*/
async function initializePeer() {
	//Test functionality to build a random ID. Leaving the Peer constructor
	//blank gives us a random one automatically. However it
	//may be useful maintaining record of our own ID when the time comes to send
	//it to our partner so for now we go this way.
	var symbols = ['1','2','3','4','5','d','e','c','h','a','t'];
	this.id = "";
	var i = 0;
	var sel;
	while (i<9) {
		sel = Math.random()*10;
		this.id=this.id+""+symbols[sel];
		i++;
	}
    //At this point we have built a hopefully unique ID for our peer
	this.peer = new Peer(id);
};

/**
* This function will receive our partner's peer ID and stablish a connection 
* between us and them.
* @param {String} peerID
*/
async function connectToPeer(peerID) {
	conn = peer.connect(peerID);
	conn.on('open', () => {conn.send('Videochat connected');});
}

/**
* This function will check if our connection has received our
* partner's message correctly and is thus succesfully connected.
* @return {Boolean} 
*/
async function checkConnection() {
	var res = false;
	await peer.on('connection', (conn) => {
		conn.on('data', (data) => {
			if (data.equals('Videochat connected')) {
				res = true;
			}
		});
	});
	return res;
}

/**
* Return our peer id, so we can send it to our oartner at some point.
* @return {String}
*/
function getOwnPeerID() {
	return this.id;
}

module.exports = {
    initializePeer,
	connectToPeer,
	checkConnection,
	getOwnPeerID
}
