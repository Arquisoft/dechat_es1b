const pod = require("./lib/session")
const query = require("./lib/ldflex-queries")
const solidFC = require("./lib/FileClient.js")

/**
 * On DOM load, set solid.auth to track the session status
 */
$("document").ready(async () => {
    pod.track(
        // If there's a session
        () => {
            changeView(true)
        },
        // User isn't logged in
        () => {
            changeView(false)
        }
    )
})

// Button listeners
$("#login").click(async () => {
    pod.login()
})

$("#logout").click(async () => {
    $(".friends-list").css("border", "1px solid #2FA7F5");
    pod.logout()
})

/**
* Start a chat with the selected friend
* @param {Person} friend - object representing the user's contact*/
function startChat(friend, i) {
    console.log(friend.id)
    $(".friends-list").prepend("<div class='chatContainer' id='chatContainer"+i+"'>"+"<h4>" +  friend.name+ "</h4><div class=chatContent id='chatContent"+i+"'><p>This is a testing message\n</p></div>"+"<div id='sendMessage'"+i+"'>"+"<textarea rows='2' cols='34' id='messageText"+i+"'>"+"Send a message</textarea><button class='sendButton' id='messageFriend"+i+"'>Send</button></div></div>");
    $("#buttonFriend"+i).prop('disabled', true);
    $("#messageFriend"+i).click(async() => { solidFC.sendMessageToPOD(pod.getSession().webId, friend, document.getElementById("messageText"+i).value)});

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
    userWerbId = pod.getSession().webId
    friends = await query.getFriends()
	emptyFriendsList()
    $.each(friends, (i, friend) => {
        $(".friends-list").prepend("<ul><button class='contactButton' id='buttonFriend"+i+"'>" + "Chat with " + friend.name + "</button></ul>")
        $("#buttonFriend"+i).click(async() => { startChat(friend, i)})
        
        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox)
    })
    $(".friends-list").prepend("<ul><button class='closeChats' id='closeChats'>" + "Close Chats </button></ul>")
    $("#closeChats").click(async() => { closeChats(friends)})
})

function closeChats(friends){
    $.each(friends, (i, friend) => {
        $("#chatContainer"+i).remove()
        $("#buttonFriend"+i).prop('disabled', false);
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

async function changeTitles(session){
    if(session){
        $("#titleApp").html("Welcome user: " + await query.getName());
        $("#subTitleApp").prop("hidden", session)
    }else{
        $("#titleApp").html("Sign in using Solid technology");
        $("#subTitleApp").prop("show", session)
    }
}



