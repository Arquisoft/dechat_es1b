const session = require("./lib/session");
const query = require("./lib/ldflex-queries");
const Chat = require("./lib/chat");
const Person = require("./model/person");
const FolderManager = require("./lib/ChatManager/ChatWriter/FolderManager");
const Notifier = require("./lib/notifier");

// Time constants
const messageLoopTimer = 3000;
const notifLoopTimer = 5000;
const notifFadeout = 1500;

const notifIconUrl = "./assets/images/Solid.png";

let user, notifications, messageLoop, notifLoop;


/**
 * On DOM load, set solid.auth to track the session status
 */
$('document').ready(async () => {
    session.track(
        // If there's a session
        async () => {
            user = await session.getUser();
            notifications = new Notifier(user);
            console.log(user);
            changeView(true);
            loadInitialContacts();
            let urlFolder = await FolderManager.getUrlFolder(user.id);
            await FolderManager.checkDechatFolder(urlFolder);
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
    emptyFriendsList();
    clearInterval(messageLoop);
    clearInterval(notifLoop);
    session.logout();
})


async function loadInitialContacts() {
    loadFriends();
}

async function loadFriends() {
    friends = await query.getFriends();
    emptyFriendsList();
  
    $.each(friends, async (i, friend) => {
        console.log(friend.id);
        console.log(friend, i);


        var image = await query.getProfilePic(friends[i].id);
        if(typeof image === 'undefined'){
            image = "https://ptetutorials.com/images/user-profile.png";
            console.log("IMAGE " + image);
        }
        
        var textFriend = "<div class='chat_list'>" +
            "<div class='chat_people'>" +
            "<div class='chat_img'> <img src='" + image  +"' alt='profile img'> </div>" +
            "<div class='chat_ib'>" +
            "<h5>" + friend.name + "</h5>" +
            "</div>" +
            "</div>" +
            "<button class='btn btn-outline-secondary btn-rounded waves-effect' id='buttonFriend" + i + "'" + " onkeypress='pressEnter(event)' >" + " Chat </button>" +
            "</div>";
        $("#chat_scroll").prepend(textFriend);
        $("#buttonFriend" + i).click(async () => {
            // if there's a chat active for someone else, we stop listening for messages from it
            clearInterval(messageLoop);
            startChat(friend, i)
        });

        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox);
    });
    listenForNotifications(); 
    }
    




/**
 * Start a chat with the selected friend
 * @param {Person} object representing the user's contact
 * @param {Integer} i
 */
async function startChat(friend, i) {
    const chat = await new Chat(user, friend);
    //We start the chat when we make sure we have the folder created.
    console.log("Chat with " + friend.id + " opened")


    $("#mesgs").empty(); //Delete all the content of mesgs
    var initialMessageContent = "<div class='msg_history' id='msg_history" + i + "'>" + "</div>" +
        "<div class='type_msg'>" +
        "<div class='input_msg_write'>" +
        "<input type='text' class='write_msg' placeholder='Write a message' id='contentText" + i + "' />" +
        "<button class='btn btn-outline-secondary btn-rounded waves-effect' type='button' id='sendMessages" + i + "' >" + "Send</button>" +
        "</div>" +
        "</div>";

    $("#mesgs").append(initialMessageContent);

    updateUIMessages(await chat.getMessages(), i);

    //Add action to sending messages button
    $("#sendMessages" + i).click(async () => {
        var messageContent = "<div class='outgoing_msg'>" +
            "<div class='sent_msg'>" +
            "<p>" + document.getElementById("contentText" + i).value + "</p>" +
            "<span class='time_date'>" + new Date().toLocaleDateString() + '\t' + new Date().toLocaleTimeString() + "</span> </div>" +
            " </div>";

        //If message is empty don't send message
        if ($("#contentText" + i).val().length > 0)
            $("#msg_history" + i).append(messageContent);

        //console.log(i)
        sendMessage(chat, i, user, friend);
        // Get the input field
    });

    addEnterListener(chat, i, user, friend);

    // Set up listener for new messages, time in ms
    messageLoop = setInterval(() => {
        checkForNewMessages(chat, i)
    }, messageLoopTimer);


}

/**
* Add the functionality of sending messages to enter key
* @param {Chat} chat representing the chat object.
* @param {User} user representing the user who is using the chat.
* @param {User} friend representing the friend of the user who receives the messages.
* @param {Integer} i
*/
async function addEnterListener(chat, i, user, friend) {
    // Trigger enter key to send messages action.
    $('#contentText' + i).bind("enterKey", function (e) {
        var messageContent = "<div class='outgoing_msg'>" +
            "<div class='sent_msg'>" +
            "<p>" + document.getElementById("contentText" + i).value + "</p>" +
            "<span class='time_date'>" + new Date().toLocaleDateString() + '\t' + new Date().toLocaleTimeString() + "</span> </div>" +
            " </div>";

        //If message is empty don't send message
        if ($("#contentText" + i).val().length > 0)
            $("#msg_history" + i).append(messageContent);

        //console.log(i)
        sendMessage(chat, i, user, friend);
    });

    $('#contentText' + i).keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });

}


/**
 * Check if there is a new message in a chat.
 * @param {Chat} chat A chat in particular
 */
async function checkForNewMessages(chat, index) {
    // Pass the callback function to execute if a new notification is received
    messages = await chat.getMessages();
    updateUIMessages(messages, index);
    //await chat.checkForNotifications((messages) => { showNotification(chat); updateUIMessages(messages, index); });
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
        var userToCompare = "https://" + messages[i].user + "/profile/card#me"; //It is neccesary to known if the message is outgoing or incoming.
        if (userToCompare == user.id) {
            sendedMessage = "<div class='outgoing_msg'>" +
                "<div class='sent_msg'>" +
                "<p>" + messages[i].content + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span> </div>" +
                " </div>";

        } else {
            sendedMessage = "<div class='incoming_msg'>" +
                "<div class='incoming_msg_img'></div>" +
                "<div class='received_msg'>" +
                "<div class='received_withd_msg'>" +
                "<p>" + messages[i].content + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span></div>" +
                "</div>"
            "</div>";
        }
        //console.log("Messages loop " + messages[i].content);
        $("#msg_history" + index).append(sendedMessage);
    }


}

/**
 * Sets up a listener for notifications which will be run every {notifLoopTimer} ms
 */
function listenForNotifications() {
    notifLoop = setInterval(() => {
        notifications.checkForNotifications((friendList) => {
            console.log("¡Te ha llegado una notificación!")
            console.log(friendList);
            //Call function to show message alert
            friendWantsToChat(friendList);
        });
    }, notifLoopTimer);
}

async function friendWantsToChat(friendList) {
    if (friendList.length > 0) {
        var messageTalk = "";
        for (i in friendList) {
            if (i > 0) {
                messageTalk += ", ";
            }
            var nameFriend = await query.getName(friendList[i]);
            messageTalk = messageTalk + nameFriend + " ";
        }
        notifyMe(messageTalk);
    }

}

function notifyMe(messageTalk) {
    const messageTitle = "You have got new messages!"
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }   

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(messageTitle, 
            {   
                body: "from " + messageTalk,
                icon: notifIconUrl
            });
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(messageTalk + " sent you a message", 
                {   
                    body: "from " + messageTalk,
                    icon: notifIconUrl
                });
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}

/**
 * Shows a notification in screen when it arrives.
 * @param {Chat} A chat in particular
 */
async function showNotification(chat) {
    console.log("Notification: You got a new message!");
    $("#mesgs").prepend("<div id='notificacion' class='alert alert-info'>" + chat.partner.name + " sends you a new message!</div>");
    hideNotifications();
}

/**
 * This method has the function of hiding notifications
 */
async function hideNotifications() {
    $("#notificacion").fadeOut(notifFadeout);
}


/**
 * Send a message
 * @param {Chat} the chat to which it will be sent
 * @param {Integer} i
 */
function sendMessage(chat, i) {
    //If message is not null
    if ($("#contentText" + i).val().length > 0) {
        chat.sendMessage($("#contentText" + i).val());
        $("#contentText" + i).val(""); //Remove content of the send message text area
    }
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
    } else {
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