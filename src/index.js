const pod = require("./lib/session")
const query = require("./lib/ldflex-queries")

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
    pod.logout()
})

/**
* Start a chat with the selected friend
* @param {Person} object representing the user's contact
*/
function startChat(friend) {
	alert(friend.name)
	console.log(friend.id)
}

/**
* Empty the user's contacts html list
*/
function emptyFriendsList() {
	$(".friends-list").empty()
}

$("#friends").click(async () => {
    $(".friends-list").show();
    userWerbId = pod.getSession().webId
    friends = await query.getFriends()
	emptyFriendsList()
    $.each(friends, (i, friend) => {
        $(".friends-list").prepend("<ul><button class='contactButton' id='buttonFriend"+i+"'>" + "Chat with " + friend.name + "</button></ul>")
		$("#buttonFriend"+i).click(async() => { startChat(friend)})
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



