const peerjs = require('peerjs')
const peer;

/**
 */
async function initializePeer() {
	//Test functionality to build a random ID. Leaving the Peer constructor
	//blank gives us a random one automatically so for now we'll go that way.
	/*var symbols = ['1','2','3','4','5','d','e','c','h','a','t'];
	var id = "";
	var i = 0;
	var sel;
	while (i<9) {
		sel = Math.random()*10;
		id=id+""+symbols[sel];
		i++;
	}*/
    //At this point we have built a hopefully unique ID for our peer
	peer = new Peer();
};


module.exports = {
    initializePeer
}
