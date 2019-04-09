const peermanager = require("../lib/VideoChat/PeerManager.js");

class VideoManager{
    constructor(){

    }

    initialize(){
        peermanager.initializePeer();
		//After this maybe some of the connection functions 
		//should be called 
    }
}

module.exports = VideoManager