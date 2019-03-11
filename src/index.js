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
* Send a message
* @param {Chat} the chat to which it will be sent
* @param {Integer} i
*/
function sendMessage(chat, i) {
    chat.sendMessage(document.getElementById("messageText" + i).value);
    document.getElementById("messageText" + i).value = "";
}

var numberMessagesSended;

/**
* Start a chat with the selected friend
* @param {Person} object representing the user's contact
* @param {Integer} i
*/
async function startChat(friend, i) {
    const chat = new Chat(user, friend)
    console.log("Chat with " + friend.id + " opened")
    $(".friends-list").prepend("<div class='chatContainer' id='chatContainer" + i + "'>" + "<h4>" + friend.name + "</h4><div class='chatContent' id='chatContent" + i + "'><p id='textMessageScreen' class='textMessageScreen'>Welcome!\n</p></div>" + "<div id='sendMessage'" + i + "'>" + "<textarea rows='2' cols='34' id='messageText" + i + "'>" + "Send a message</textarea><button class='sendButton' id='messageFriend" + i + "'>Send</button></div></div>");
    $("#buttonFriend" + i).prop('disabled', true);
    $("#messageFriend" + i).click(async () => {
        sendMessage(chat, i)
        //it may be a solve to show messages when they are send but it produces other bugs.
        $(".chatContent").append("<p class='textMessageSended'>" + user.inbox.substring(0, user.inbox.length - 6) + " >" + document.getElementById("messageText" + i).value + "</p>");
        numberMessagesSended++;
    });

    // Set up listener for new messages, time in ms
    setInterval(() => {
        checkForNewMessages(chat)
    }, 5000)
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

/**
* Close the chats of the friends list
* @param {List<Person>} list of the user's contacts
*/
function closeChats(friends) {
    $.each(friends, (i, friend) => {
        $("#chatContainer" + i).remove()
        $("#buttonFriend" + i).prop('disabled', false);
    })
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


/**
* Check if there is a new message in a chat.
* @param {Chat} A chat in particular
*/
async function checkForNewMessages(chat) {
    // Pass the callback function to execute if a new notification is received
    var messages = await chat.checkForNotifications(() => { showNotification(chat); });
    // Deleted all the displayed messages
    $("#textMessageScreen").remove();
    $(".textMessageScreen").remove();
    var i;
    //Show all the messages
    var j;
    var messageSendedContent;
    for (j = 0; j < numberMessagesSended; j++)
        messageSendedContent[j] = $(".textMessageSended").text();


    for (i = 0; i < messages.length; i++) {
        $(".chatContent").append("<p class='textMessageScreen' id='textMessageScreen'>" + messages[i].sender + " >" + messages[i].content + "</p>");
    }

    $(".textMessageSended").remove();
    var k;
    for (k = 0; k < numberMessagesSended; k++)
        $(".chatContent").append("<p class='textMessageSended'>" + messageContent[k] + "</p>");


}

/**
 * Shows a notification in screen when it arrives.
 * @param {Chat} A chat in particular
 */
async function showNotification(chat) {
    console.log("Got a new message");
    $(".friends-list").prepend("<div id='notificacion' class='alert alert-info'>" + chat.partner.name + " sends you a new message!</div>");
    hideNotifications();
}

/**
 * This method has the function of hiding notifications
 */
async function hideNotifications() {
    $("#notificacion").fadeOut(1500);
}


