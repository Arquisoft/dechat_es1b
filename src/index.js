const session = require("./lib/session");
const query = require("./lib/ldflex-queries");
const Chat = require("./lib/chat");
const FolderManager = require("./lib/ChatManager/ChatWriter/FolderManager");
const Notifier = require("./lib/notifier");
const profile = require("./lib/profile");
const chatManager = require("./lib/ChatManager/ChatManager");

// Time constants
const messageLoopTimer = 3000;
const notifLoopTimer = 5000;

const notifIconUrl = "./assets/images/Solid.png";

let user, notifications, messageLoop, notifLoop;
var groups = [];


/**
 * On DOM load, set solid.auth to track the session status
 */
$('document').ready(async () => {
    session.track(
        // If there's a session
        async () => {
                user = await session.getUser();
                notifications = new Notifier(user);
                changeView(true);
                let urlFolder = await FolderManager.getUrlFolder(user.id);
                await FolderManager.checkDechatFolder(urlFolder);
                await initializeGroups();
                loadInitialContacts();
            },
            // User isn't logged in
            async () => {
                user = null;
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

// Add friend
$("#add-contact").click(async () => {
    const friendWebID = prompt("Input friend's WebID");
    profile.addContact(user.id, friendWebID, loadInitialContacts, displayAlert);
})

// Add group
$("#add-group").click(async () => {
    clearInterval(messageLoop);
    $("#mesgs").empty(); //Delete all the content of mesgs
    $(".profile_bar").empty(); //Empty profile upper bar

    var content = "<div class='msg_history'>" +
        "<h3>Add group</h3>" +
        "</br>" +
        "<h5>Group name:</h5>" +
        "<input type='text' id='group-name'/>" +
        "</br></br>" +
        "<h5>Choose members:</h5>" +
        "<div id='group-candidates'></div>" +
        "<button id='submit-group' class='btn btn-default'>Add group</button>" +
        "</div>"
    $("#mesgs").append(content);
    var friends = await query.getFriends();
    friends = removeDupes(friends, "id");
    console.log("amigos")
    console.log(friends)
    for (var friend of friends) {
        $("#group-candidates").append("<label><input type=checkbox class='candidate' name='" + friend.id + "'/>  " + friend.name + "</label></br>");
    }

    $("#submit-group").click(async () => {
        var selected = [];
        $("#group-candidates input:checked").each(function () {
            selected.push($(this).attr("name"));
        })
        selected.push(user.id);
        console.log(selected);
        var name = $("#group-name").val();
        const rejected = await chatManager.createGroup(name, selected, user.id);

        if (rejected.length > 0) {
            var rejectedHTML = "<p>This users could not be added because they do not use dechat / do no exist: </p>" +
                "<ul id='rejected'></ul>";
            $("#mesgs").append(rejectedHTML);
            for (const badboi of rejected) {
                $("#rejected").append("<li>" + badboi + "</li>");
            }
        }
    })

})

/**
 * Shows an alert if something goes wrong with add friends funcionality.
 * @param {message} message - message that will be shown on display when something goes wrong.
 */
function displayAlert(message) {
    $(".alert-container").append('<div class="alert alert-danger alert-dismissible error-alert" role="alert">' +
        '<a href="#" class="close close-alert" data-dismiss="alert" aria-label="close">&times;</a>' +
        message +
        '</div>');
    $(".close-alert").click(() => {
        $(".alert").remove();
    })
}

/**
 * Starts the load of user friends.
 */
async function loadInitialContacts() {
    loadFriends();
    loadGroups();
}

async function initializeGroups() {
    await chatManager.createFileOnInit(user.id);
    await chatManager.givePermissionsToFriends(user.id);
    await chatManager.createUncreatedGroups(user.id);
    groups = await chatManager.listGroupsOnInit(user.id);
}


/**
 * This functions loads the friends that the user has in his POD and show them in UI given the user the option to chat with them.
 */
async function loadFriends() {
    emptyFriendsList(); // Remove all the friends in the list of them (solve bugs with disconnect and reconnect funcionality)
    var friends = await query.getFriends();
    friends = removeDupes(friends, "id");

    for (var i in friends) {
        const friend = friends[i];


        var image = await query.getProfilePic(friends[i].id);
        if (typeof image === 'undefined') {
            image = "./assets/images/user.png";
        }

        friends[i].image = image; //Image will be cached in friend object

        var textFriend = "<a  id='buttonFriend" + i + "'>" +
            "<div class='chat_list'>" +
            "<div class = 'chat_people' >" +
            "<div class='chat_img'> <img src='" + image + "' alt='profile img'> </div>" +
            "<div class='chat_ib'>" +
            "<h5>" + friend.name + "</h5>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</a>";
        $("#chat_scroll").prepend(textFriend);
        $("#buttonFriend" + i).click(async () => {
            // if there's a chat active for someone else, we stop listening for messages from it
            clearInterval(messageLoop);
            startChat(friend, i)
        });
    };
    listenForNotifications(); //Starts the listening notifications to check if the user receive a message from someone.
}

async function loadGroups() {
    emptyFriendsList();
    for (const group of groups) {
        const i = groups.indexOf(group);
        var groupHTML = "<a id= 'buttonGroup" + i + "'>" +
            "<div class='chat_list'>" +
            "<div class = 'chat_people' >" +
            "<div class = 'chat_img'> <img src='./assets/images/group.png'></div>" +
            "<div class='chat_ib'>" +
            "<h5>" + group.name + "</h5>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</a>";
        $("#chat_scroll").append(groupHTML);
        $("#buttonGroup" + i).click(async () => {
            clearInterval(messageLoop);
            startGroupChat(group, i);
        })
    }

}

/**
 * Start a chat with the selected friend
 * @param {Person} object representing the user's contact
 * @param {Integer} i
 */
async function startChat(friend, i) {
    const chat = await new Chat(user, friend);
    await chat.init(); //Initializate sentMessages array

    //We start the chat when we make sure we have the folder created.
    console.log("Chat with " + friend.id + " opened")
    $("#mesgs").empty(); //Delete all the content of mesgs

    $(".profile_bar").empty(); //Empty profile upper bar
    $(".profile_bar").append("<img class='bar_image' src='" + friend.image + "' alt='profile img' /> <p class='text-center'>" + friend.name + "</p>"); //Add content of the profile upper bar

    var initialMessageContent =
        "<div class='msg_history' id='msg_history" + i + "'>" + "</div>" +
        "<div class='type_msg'>" +
        "<div class='input_msg_write'>" +
        "<input type='text' class='write_msg' placeholder='Write a message' id='contentText" + i + "' />" +
        "<div class='button-container'>" +
        "<div class='image-upload'>" +
        "<label for='send-image'>" +
        "<img class='image-icon' src='assets/images/upload-image.svg'/>" +
        "</label>" +
        "<input type='file' id='send-image' accept='image/*'/>" +
        "</div>" +
        "<button class='btn btn-outline-secondary btn-rounded waves-effect' type='button' id='sendMessages" + i + "' >" + "Send</button>" +
        "</div>" +
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

    addImageUploadListener(chat);

    // Set up listener for new messages, time in ms
    messageLoop = setInterval(() => {
        checkForNewMessages(chat, i)
    }, messageLoopTimer);

}

async function startGroupChat(group, i) {
    console.log("Group chat " + group.id + " opened")

    $("#mesgs").empty(); //Delete all the content of mesgs

    $(".profile_bar").empty(); //Empty profile upper bar
    $(".profile_bar").append("<img class='bar_image' src='./assets/images/group.png' alt='profile img' /> <p class='text-center'>" + group.name + "</p>"); //Add content of the profile upper bar

    var initialMessageContent =
        "<div class='msg_history' id='msg_history" + i + "'>" + "</div>" +
        "<div class='type_msg'>" +
        "<div class='input_msg_write'>" +
        "<input type='text' class='write_msg' placeholder='Write a message' id='contentText" + i + "' />" +
        "<div class='button-container'>" +
        "<button class='btn btn-outline-secondary btn-rounded waves-effect' type='button' id='sendMessages" + i + "' >" + "Send</button>" +
        "</div>" +
        "</div>" +
        "</div>";

    $("#mesgs").append(initialMessageContent);

    updateGroupUIMessages(await chatManager.readGroup(user.id, group.id), i);

    $("#sendMessages" + i).click(async () => {
        var messageContent = "<div class='outgoing_msg'>" +
            "<div class='sent_msg'>" +
            "<p>" + document.getElementById("contentText" + i).value + "</p>" +
            "<span class='time_date'>" + new Date().toLocaleDateString() + '\t' + new Date().toLocaleTimeString() + "</span> </div>" +
            " </div>";

        //If message is empty don't send message
        if ($("#contentText" + i).val().length > 0)
            $("#msg_history" + i).append(messageContent);

        sendGroupMessage(group, i);

    });

    addGroupEnterListener(group, i);


    messageLoop = setInterval(() => {
        checkForNewGroupMessages(group, i)
    }, 5000)


}

function addImageUploadListener(chat) {
    $("#send-image").on('change', function () {
        console.log("Envío imagen");
        var parts = this.files[0].name.split(".");
        var formato = parts[parts.length - 1];
        if (formato == 'jpg' || formato == 'jpeg' || formato == 'gif' || formato == 'png') {
            chat.sendMessage(this.files[0], 'image');
        } else {
            chat.sendMessage(this.files[0], 'file');
        }
    });
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
    $('#contentText' + i).bind("enterKey", function () {
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
 * Add the functionality of sending messages to enter key in group chats
 * @param {Chat} chat representing the chat object.
 * @param {User} user representing the user who is using the chat.
 * @param {User} friend representing the friend of the user who receives the messages.
 * @param {Integer} i
 */
async function addGroupEnterListener(group, i) {
    // Trigger enter key to send messages action.
    $('#contentText' + i).bind("enterKey", function () {
        var messageContent = "<div class='outgoing_msg'>" +
            "<div class='sent_msg'>" +
            "<p>" + document.getElementById("contentText" + i).value + "</p>" +
            "<span class='time_date'>" + new Date().toLocaleDateString() + '\t' + new Date().toLocaleTimeString() + "</span> </div>" +
            " </div>";

        //If message is empty don't send message
        if ($("#contentText" + i).val().length > 0)
            $("#msg_history" + i).append(messageContent);

        //console.log(i)
        sendGroupMessage(group, i);
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
    var messages = await chat.getMessages();
    updateUIMessages(messages, index);
    //await chat.checkForNotifications((messages) => { showNotification(chat); updateUIMessages(messages, index); });
}

/**
 * Checks if there are new messages in a group chat
 * @param {} group 
 * @param {*} index 
 */
async function checkForNewGroupMessages(group, index) {
    var messages = await chatManager.readGroup(user.id, group.id);
    updateGroupUIMessages(messages, index);
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
        var sentMessage;
        var userToCompare = "https://" + messages[i].user + "/profile/card#me"; //It is neccesary to known if the message is outgoing or incoming.
        let msgContent;
        if (messages[i].type === 'image') {
            msgContent = "<img src='" + messages[i].content + "' class='image'/>";
        } else if (messages[i].type === 'file') {
            let nameFile = messages[i].content.split("/");
            nameFile = nameFile[nameFile.length - 1];
            msgContent = "<a href='" + messages[i].content + "' download>Download file</a> (" + nameFile + ")";
        } else {
            msgContent = messages[i].content;
        }
        if (userToCompare == user.id) {
            sentMessage = "<div class='outgoing_msg'>" +
                "<div class='sent_msg'>" +
                "<p>" + msgContent + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span> </div>" +
                " </div>";

        } else {
            sentMessage = "<div class='incoming_msg'>" +
                "<div class='incoming_msg_img'></div>" +
                "<div class='received_msg'>" +
                "<div class='received_withd_msg'>" +
                "<p>" + msgContent + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span></div>" +
                "</div>"
            "</div>";
        }
        //console.log("Messages loop " + messages[i].content);
        $("#msg_history" + index).append(sentMessage);
    }

    $("#msg_history" + index).animate({
        scrollTop: $('#msg_history' + index)[0].scrollHeight
    }, 1000);
}

async function updateGroupUIMessages(messages, index) {
    $("#msg_history" + index).empty();
    var i;
    console.log(messages)
    for (i = 0; i < messages.length; i++) {
        console.log(messages[i])
        let sentMessage;
        var userToCompare = "https://" + messages[i].user + "/profile/card#me";
        let msgContent;
        msgContent = messages[i].content;
        if (typeof msgContent !== 'undefined'){
        if (userToCompare == user.id) {
            sentMessage = "<div class='outgoing_msg'>" +
                "<div class='sent_msg'>" +
                "<b>You: </b><p>" +
                msgContent +
                "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span></div>" +
                "</div>";
        } else {
            var author = await query.getName(userToCompare);
            sentMessage = "<div class='incoming_msg'>" +
                "<div class='incoming_msg_img'></div>" +
                "<div class='received_msg'>" +
                "<div class='received_withd_msg'>" +
                "<b>" + author + " </b><p>" + msgContent + "</p>" +
                "<span class='time_date'>" + new Date(messages[i].timestamp).toLocaleDateString() + "\t" + new Date(messages[i].timestamp).toLocaleTimeString() + "</span></div>" +
                "</div>"
            "</div>";
        }
        $("#msg_history" + index).append(sentMessage);
    }

    }

    $("#msg_history" + index).animate({
        scrollTop: $('#msg_history' + index)[0].scrollHeight
    }, 1000);

}

/**
 * Sets up a listener for notifications which will be run every {notifLoopTimer} ms
 */
function listenForNotifications() {
    notifLoop = setInterval(() => {
        notifications.checkForNotifications((friendList) => {
            //Call function to show message alert
            friendWantsToChat(friendList);
        });
    }, notifLoopTimer);
}


async function friendWantsToChat(friendList) {
    if (friendList.length > 0) {
        var messageTalk = "";
        for (var i in friendList) {
            if (i > 0) {
                messageTalk += ", ";
            }
            var nameFriend = await query.getName(friendList[i]);
            messageTalk = messageTalk + nameFriend + " ";
        }
        notifyMe(messageTalk);
    }

}

/**
 * This functions is call when user receives a message to notify him.
 * @param {String} messageTalk 
 */
function notifyMe(messageTalk) {
    const messageTitle = "You have got new messages!"
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        new Notification(messageTitle, {
            body: "from " + messageTalk,
            icon: notifIconUrl
        });
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                new Notification(messageTalk + " sent you a message", {
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

function sendGroupMessage(group, i) {
    if ($("#contentText" + i).val().length > 0) {
        chatManager.writeGroupal(user.id, group.id, $("#contentText" + i).val());
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
        $("#titleApp").html("Welcome " + await query.getName());
        $("#subTitleApp").prop("hidden", session)
    } else {
        $("#titleApp").html("Sign in using Solid technology");
        $("#subTitleApp").prop("show", session)
    }
}

// Aux function to remove dupes from an array
function removeDupes(array, criteria) {
    const toRet = array.map(elem => elem[criteria])
        .map((elem, i, final) => final.indexOf(elem) === i && i)
        .filter(elem => array[elem]).map(elem => array[elem]);
    return toRet;
}