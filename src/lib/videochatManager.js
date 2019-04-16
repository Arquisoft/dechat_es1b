const peerjs = require('peerjs')
var peer;
var conn;
var call;
var partnerPeerID;




/**
* This function creates a random ID for our peer and initializes it,
* connecting us to the PeerJs server. 
*/
async function initializePeer(i) {
    peer = new Peer();
    peer.on('open', function (id) {
        //At this point we have built a hopefully unique ID for our peer
        console.log("MANAGER ID PEER :" + id);
        var messageContent = "I want to start a videochat, here is my ID: " + id;
        $("#contentText" + i).val(messageContent); //Update the sending message field at the UI with the content of the peerID.
    });
    answerVideoCall();
};

/**
* This function will receive our partner's peer ID and stablish a connection 
* between us and them.
* @param {String} peerID
*/
async function connectToPeer(peerID) {
    setPartnerPeerID(peerID);
    conn = peer.connect(partnerPeerID);
    conn.on('open', () => { conn.send('Videochat connected'); });
}

/**
* This function will check if our connection has received our
* partner's message correctly and is thus succesfully connected.
* @return {Boolean} 
*/
async function checkConnection() {
    var res = false;
    peer.on('connection', (conn) => {
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
    return peer.id;
}

function setPartnerPeerID(peerID) {
    partnerPeerID = peerID;
}

function videocallPartner(peerID) {
    console.log("El PEER EN EL VIDEOCHAT ES " + peer);
    setPartnerPeerID(peerID);
    //What next line means is unknown to me atm
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        call = peer.call(partnerPeerID, stream);
        call.on('stream', (remoteStream) => {
            // Show stream in some <video> element. Gotta see how we access UI form here.
            var video = document.getElementById('myVideo');
            // Set the given stream as the video source
            video.src = URL.createObjectURL(remoteStream);
        });
    }, (err) => {
        console.error('Failed to get local stream', err);
    });
}

function answerVideoCall() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    peer.on('call', (call) => {
        navigator.getUserMedia({ video: true, audio: true }, (stream) => {
            call.answer(stream); // Answer the call with an Audio&&Video stream.
            call.on('stream', (remoteStream) => {
                // Show stream in some <video> element.
                var video = document.getElementById('partnerVideo');
                // Set the given stream as the video source
                video.src = URL.createObjectURL(remoteStream);

            });
        }, (err) => {
            console.error('Failed to get local stream', err);
        });
    });
}

function disconnect() {
    peer.disconnect();
}


function connectWithPeer() {
    peer = new Peer();
    console.log("Connecting...");
    var peerIDContent = $("#peerIDText").val();
    console.log("EL PEER ID DEL PARTNER ES: " + peerIDContent);
    videocallPartner(peerIDContent);
   /* var conn = peer.connect(peerIDContent);
        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function(){
        // here you have conn.id
        conn.send('hi!');
    });*/
}



module.exports = {
    initializePeer,
    connectToPeer,
    checkConnection,
    getOwnPeerID,
    setPartnerPeerID,
    videocallPartner,
    answerVideoCall,
    disconnect
}
