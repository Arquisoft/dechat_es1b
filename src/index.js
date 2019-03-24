const session = require("./lib/session")
const query = require("./lib/ldflex-queries")
const Chat = require("./lib/chat")
const Person = require("./model/person")

let user;

/**
 * On DOM load, set solid.auth to track the session status
 */
$("document").ready(async () => {
    session.track(
        // If there's a session
        async () => {
            user = await session.getUser();
            console.log(user);
            changeView(true);
            loadInitialContacts();
        },
        // User isn't logged in
        async () => {
            user = null;
            console.log(user);
            changeView(false);
        }
    )
})

// Button listeners
$("#login").click(async () => {
    session.login();
})

$("#logout").click(async () => {
    session.logout()

})


async function loadInitialContacts() {
    loadFriends();
}

async function loadFriends() {
    friends = await query.getFriends();
    emptyFriendsList();
    $.each(friends, (i, friend) => {
        console.log(friend, i)
        var textFriend = "<div class='chat_list'>" +
            "<div class='chat_people'>" +
            "<div class='chat_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='profile img'> </div>" +
            "<div class='chat_ib'>" +
            "<h5>" + friend.name + "</h5>" +
            "</div>" +
            "</div>" +
            "<button class='btn btn-outline-secondary btn-rounded waves-effect' id='buttonFriend" + i + "'>" + " Chat </button>" +
            "</div>";
        $("#chat_scroll").prepend(textFriend);
        $("#buttonFriend" + i).click(async () => { startChat(friend, i) });
        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox);
    });
}

var numberMessagesSended;

/**
* Start a chat with the selected friend
* @param {Person} object representing the user's contact
* @param {Integer} i
*/
async function startChat(friend, i) {
    var splitId = user.id.split("/");
    var urlFolder = splitId[0] + splitId[1] + splitId[2];
    const chat = new Chat(user, friend)
    chat.checkDechatFolder(urlFolder);
    //We start the chat when we make sure we have the folder created.
    console.log("Chat with " + friend.id + " opened")

    $("#mesgs").empty(); //Delete all the content of mesgs
    var initialMessageContent = "<div class='msg_history' id='msg_history" + i + "'>" + "</div>" +
        "<div class='type_msg'>" +
        "<div class='input_msg_write'>" +
        "<input type='text' class='write_msg' placeholder='Write a message' id='contentText" + i + "'/>" +
        "<button class='btn btn-outline-secondary btn-rounded waves-effect' type='button' id='sendMessages" + i + "'>" + "Send</button>" +
        "</div>" +
        "</div>";
    $("#mesgs").append(initialMessageContent);


    //Add action to sending messages button
    $("#sendMessages" + i).click(async () => {
        var messageContent = "<div class='outgoing_msg'>" +
                "<div class='sent_msg'>" +
                "<p>" + document.getElementById("contentText"+i).value + "</p>" +
                "<span class='time_date'>" + new Date().toLocaleDateString() + '\t' + new Date().toLocaleTimeString() + "</span> </div>" +
                " </div>";

        sendMessage(chat, i, user, friend);

        $("#msg_history" + i).append(messageContent);

        numberMessagesSended++;
    });

    // Set up listener for new messages, time in ms
    setInterval(() => {
        checkForNewMessages(chat, i)
    }, 5000);

}



/**
* Check if there is a new message in a chat.
* @param {Chat} A chat in particular
*/
async function checkForNewMessages(chat, index) {
    // Pass the callback function to execute if a new notification is received
    var messages = await chat.checkForNotifications((messages) => { showNotification(chat); updateUIMessages(messages, index); });
}
/**
* Update chat UI. This function should only be called once a notification has arrived.
* @param {Message[]} messages Message array containing chat messages
*/
function updateUIMessages(messages, index) {
    // Deleted all the displayed messages
    $("#msg_history" + index).empty();
    var i;
    for (i = 0; i < messages.length; i++) {
        var sendedMessage;
        var userToCompare = "https://"+ messages[i].user + "/profile/card#me"; //It is neccesary to known if the message is outgoing or incoming.
        if (userToCompare == user.id) {
            sendedMessage = "<div class='outgoing_msg'>" +
                "<div class='sent_msg'>" +
                "<p>" + messages[i].content + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span> </div>" +
                " </div>";

        }
        else {
            sendedMessage = "<div class='incoming_msg'>" +
                "<div class='incoming_msg_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> </div>" +
                "<div class='received_msg'>" +
                "<div class='received_withd_msg'>" +
                "<p>" + messages[i].content + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span></div>" +
                "</div>"
            "</div>";
        }
        console.log("Messages loop " + messages[i].content);
        $("#msg_history" + index).append(sendedMessage);
    }


}



/**
 * Shows a notification in screen when it arrives.
 * @param {Chat} A chat in particular
 */
async function showNotification(chat) {
    console.log("Got a new message");
    $("#mesgs").prepend("<div id='notificacion' class='alert alert-info'>" + chat.partner.name + " sends you a new message!</div>");
    hideNotifications();
}

/**
 * This method has the function of hiding notifications
 */
async function hideNotifications() {
    $("#notificacion").fadeOut(1500);
}


/**
* Send a message
* @param {Chat} the chat to which it will be sent
* @param {Integer} i
*/
function sendMessage(chat, i) {
    chat.sendMessage($("#contentText" + i).val());
    $("#contentText" + i).val(""); //Remove content of the send message text area
}

/**
* Empty the user's contacts html list
*/
function emptyFriendsList() {
    // $(".friends-list").empty()
    $(".inbox_chat scroll").empty();

}


/**
 * Sets the buttons, nav and titles according to the session status.
 * If we initiate session we hide the button of the log and appears the nav and the button of the list of friends.
 * If we close session disappears the nav and the button of the list of friends and the button of the login appears.
 * Change the titles depending on whether we are logged in or not.
 * If we are not logged in, we will empty the list of friends.
 * @param {boolean} session 
 */
function changeView(session) {
    $("#login").prop("hidden", session);
    $("#login").prop("show", !session);
    $("#mainHeader").prop("hidden", session);
    $("#mainHeader").prop("show", !session);
    changeTitles(session);
    if (!session) {
        $("#navbar").css("visibility", "hidden");
        $(".messaging").css("visibility", "hidden");
        emptyFriendsList();
    }
    if (session) {
        $("#navbar").css("visibility", "visible");
        $(".messaging").css("visibility", "visible");
    }

}

/**
* Change titles depending on whether they have logged in or not.
* @param {boolean} session
*/
async function changeTitles(session) {
    if (session) {
        $("#titleApp").html("Welcome user: " + await query.getName());
        $("#subTitleApp").prop("hidden", session)
    } else {
        $("#titleApp").html("Sign in using Solid technology");
        $("#subTitleApp").prop("show", session)
    }
}



