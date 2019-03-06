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
            console.log(user)
            changeView(true)
        },
        // User isn't logged in
        async () => {
            user = null;
            console.log(user)
            changeView(false)
        }
    )
})

// Button listeners
$("#login").click(async () => {
    session.login()
})

$("#logout").click(async () => {
    session.logout()
    $(".friends-list").css("border", "1px solid #2FA7F5");
})

/**
* Start a chat with the selected friend
* @param {Person} object representing the user's contact
*/
async function startChat(friend, i) {
    const chat = new Chat(user, friend)
    console.log("Chat with " + friend.id + " opened")
    $(".friends-list").prepend("<div class='chatContainer' id='chatContainer" + i + "'>" + "<h4>" + friend.name + "</h4><div class=chatContent id='chatContent" + i + "'><p>This is a testing message\n</p></div>" + "<div id='sendMessage'" + i + "'>" + "<textarea rows='2' cols='34' id='messageText" + i + "'>" + "Send a message</textarea><button class='sendButton' id='messageFriend" + i + "'>Send</button></div></div>");
    $("#buttonFriend" + i).prop('disabled', true);
    $("#messageFriend" + i).click(async () => { chat.sendMessage(document.getElementById("messageText" + i).value) });

    // Set up listener for new messages, time in ms
    setInterval(() => {
        checkForNewMessages(chat)
    }, 2000)
}

/**
* Empty the user's contacts html list
*/
function emptyFriendsList() {
    $(".friends-list").empty()
}

$("#friends").click(async () => {
    $(".friends-list").show();
    $(".friends-list").css("border", "1px solid #2FA7F5");
    userWerbId = session.getSession().webId;
    friends = await query.getFriends();
    emptyFriendsList();
    $.each(friends, (i, friend) => {
        console.log(friend, i)
        $(".friends-list").prepend("<ul><button class='contactButton' id='buttonFriend" + i + "'>" + "Chat with " + friend.name + "</button></ul>");
        $("#buttonFriend" + i).click(async () => { startChat(friend, i) });

        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox);
    })
    $(".friends-list").prepend("<ul><button class='closeChats' id='closeChats'>" + "Close Chats </button></ul>");
    $("#closeChats").click(async () => { closeChats(friends) });
})

function closeChats(friends) {
    $.each(friends, (i, friend) => {
        $("#chatContainer" + i).remove()
        $("#buttonFriend" + i).prop('disabled', false);
    })
}
/**
 * Sets the buttons according to the session status
 * @param {boolean} session 
  $("#logout").prop("hidden", !session)
    
    $("#login").prop("show", !session)
    
    $("#logout").prop("show", session)
 */
function changeView(session) {

    $("#login").prop("hidden", session);
    $("#login").prop("show", !session);
    $("#friends").prop("hidden", !session);
    $("#friends").prop("show", session);
    changeTitles(session);
    if (!session)
        $("#navbar").css("visibility", "hidden");
    if (session)
        $("#navbar").css("visibility", "visible");
    if (!session)
        emptyFriendsList()
}

async function changeTitles(session) {
    if (session) {
        $("#titleApp").html("Welcome user: " + await query.getName());
        $("#subTitleApp").prop("hidden", session)
    } else {
        $("#titleApp").html("Sign in using Solid technology");
        $("#subTitleApp").prop("show", session)
    }
}

function checkForNewMessages(chat) {
    // Pass the callback function to execute if a new notification is received
    chat.checkForNotifications(() => { showNotification(); });
}


var notificationCounter = 0;

/**
 * Shows a notification in screen when it arrives.
 */
async function showNotification() {
    console.log("Got a new message");
    $(".friends-list").prepend("<div id='notificacion' class='alert alert-info'>Someone sends you a new message!</div>");
    notificationCounter++;
    hideNotifications();
}


async function hideNotifications() {
    while (notificationCounter > 0) {
        setTimeout(function () {
            $("#notificacion").fadeOut(1500);
        }, 3000);
        notificationCounter--;
    }
}


