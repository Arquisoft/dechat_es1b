const session = require("./lib/session")
const query = require("./lib/ldflex-queries")
const Chat = require("./lib/chat")

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
})

/**
* Start a chat with the selected friend
* @param {Person} object representing the user's contact
*/
async function startChat(friend) {
    console.log("Chat with "+ friend.id + " opened")


    const chat = new Chat(user.id, friend.id)
    console.log(chat)
}

/**
* Empty the user's contacts html list
*/
function emptyFriendsList() {
	$(".friends-list").empty()
}

$("#friends").click(async () => {
    friends = await query.getFriends(user.id)
	emptyFriendsList()
    $.each(friends, (i, friend) => {
        $(".friends-list").prepend("<ul><button class='contactButton' id='Amigo"+i+"'>" + "Chat with " + friend.name + "</button></ul>")
		$("#Amigo"+i).click(async() => { startChat(friend)})
        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox)
    })
})

/**
 * Sets the buttons according to the session status
 * @param {boolean} session 
 */
function changeView(session) {
    $("#login").prop("hidden", session)
    $("#logout").prop("hidden", !session)
    $("#friends").prop("hidden", !session)

    $("#login").prop("show", !session)
    $("#logout").prop("show", session)
    $("#friends").prop("show", session)
    changeTitles(session);
	
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

