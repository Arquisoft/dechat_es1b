const peerjs = require('peerjs')
const peer = undefined;
const conn = undefined;

/**
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
* This function will receive our partner's peer ID and stablish a connection between them.
*/
async function connectToPeer(peerID) {
	this.conn = peer.connect(peerID);
	conn.on('open', () => {conn.send('Videochat connected');});
}

function getOwnPeerID() {
	return this.id;
}

module.exports = {
    initializePeer,
	connectToPeer,
	getOwnPeerID
}
