const peerjs = require('peerjs')
var peer;
var call;




/**
* This function creates a random ID for our peer and initializes it,
* connecting us to the PeerJs server. This function is called when a user press the button to generate it peerID to start a videochat
*/
async function initializePeer(i) {
    peer = new Peer({
        config: {
            'iceServers': [
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'turn:numb.viagenie.ca:3478', username: 'dechates1b@yopmail.com', credential: 'arquisoft20182019' }
            ]
        }
    });
    peer.on('open', function (id) {
        //At this point we have built a hopefully unique ID for our peer
        var messageContent = "I want to start a videochat, here is my ID: " + id;
        $("#contentText" + i).val(messageContent); //Update the sending message field at the UI with the content of the peerID.
    });
    answerVideoCall(); //User waits for a call...
};

/**
 * This function start the videocall with the partner. The connection is established and the neccesary components are shown in UI.
 * @param {string} peerID - the partner peerID which is used to establish connection. 
 */
function videocallPartner(peerID) {
    initializeChatComponents();
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        call = peer.call(peerID, stream);
        var myVideo = document.getElementById('myVideo');
        //Show your own stream (webcam video) on the screen.
        myVideo.srcObject = stream;
        myVideo.play();
        call.on('stream', (remoteStream) => {
            // Show stream in some <video> element.
            var partnerVideo = document.getElementById('partnerVideo');
            // Set the given stream as the video source
            partnerVideo.srcObject = remoteStream;
            partnerVideo.play();
        });
        //End the user transmission stream if the user press disconnect button.
        $('#disconnectButton').on("click", function () {
            call.close();
        });
    }, (err) => {
        disconnect();
        $(".messaging").prepend("<div id='videocallError' class='alert alert-danger' role='alert'>" +
            "The videochat call failed to initialize properly. Check your network and your devices (microphone, webcam)" +
            "</div>");
        $("#videocallError").delay(3000).hide(600);
        console.error('Failed to get local stream', err);
    });

}

/**
 * This function set the user to a waiting state when the user generates his peerID.
 * When the call from the other user is receive, it initializes videochat call components and establish connection.
 */
function answerVideoCall() {
    initializeChatComponents();
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    peer.on('call', (call) => {
        navigator.getUserMedia({ video: true, audio: true }, (stream) => {
            call.answer(stream); // Answer the call with an Audio&&Video stream.
            // Play the webcam stream on display 
            var myVideo = document.getElementById('myVideo');
            myVideo.srcObject = stream;
            myVideo.play();
            call.on('stream', (remoteStream) => {
                var partnerVideo = document.getElementById('partnerVideo');
                // Set the given stream as the video source and play it.
                partnerVideo.srcObject = remoteStream;
                partnerVideo.play();
            });
            //End the user transmission stream if the user press disconnect button.
            $('#disconnectButton').on("click", function () {
                call.close();
            });
        }, (err) => {
            disconnect();
            $(".messaging").prepend("<div id='videocallError' class='alert alert-danger' role='alert'>" +
                "The videochat call failed to initialize properly. Check your network and your devices (microphone, webcam...)" +
                "</div>");
            $("#videocallError").delay(3000).hide(600);
            console.error('Failed to get local stream', err);
        });
    });


}
/**
 * This function shows/hide videochat components of the UI and disable/enable connect/disconnect buttons if the call is on process or not.
 */
function disconnect() {
    $("#connectWithPeer").attr("disabled", false);
    $("#disconnectButton").attr("disabled", true);
    $("#myVideo").remove();
    $("#partnerVideo").remove();
}

/**
 * This function is called from index.js when a user write the partner peerID and press connect.
 * It established connection with the other user and calls videoCallPartner function to start the call.
 */
function connectWithPeer() {
    peer = new Peer({
        config: {
            'iceServers': [
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'turn:numb.viagenie.ca:3478', username: 'dechates1b@yopmail.com', credential: 'arquisoft20182019' }
            ]
        }
    });
    var peerIDContent = $("#peerIDText").val(); //Obtain the value of the text area which have the partner peerID.
    videocallPartner(peerIDContent);
}
/**
 * This function add the <video> elements in UI. It is called when someone established a videochat call and when someone answer a videochat call.
 * It disable/enable the connect/disconnect button.
 */
function initializeChatComponents() {
    $(".messaging").prepend("<video id='myVideo'> </video>" +
        "<video id='partnerVideo'> </video>");
    $("#connectWithPeer").attr("disabled", true);
    $("#disconnectButton").attr("disabled", false);
}


module.exports = {
    initializePeer,
    videocallPartner,
    answerVideoCall,
    disconnect
}
