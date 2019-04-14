const peermanager = require("../lib/VideoChat/PeerManager.js");

class VideoManager{
    constructor(){
        this.peerID = ""
    }

    async initialize(){
        this.peerID =  await peermanager.initializePeer();
        console.log("Videochat: peer id " + this.peerID)
    }

    getMyID(){
        return this.peerID;
    }

    setMyID(id){
        this.peerID=id;
    }
}

module.exports = VideoManager