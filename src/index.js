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
	$(".friends-list").empty()
    pod.logout()
})

$("#friends").click(async () => {
    userWerbId = pod.getSession().webId
    friends = await query.getFriends()

    $.each(friends, (i, friend) => {
        $(".friends-list").prepend("<button id='"+friend.id+"'>" + "Chat with " + friend.name + "</button>")
		//document.getElementById(friend.id).onClick = function(startChat(friend))	
        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox)
    })
})

/**
* Start a chat with the selected friend
* @param {Person} friend objeto Person que representa al amigo en cuestion
*/
function startChat(friend) {
	alert(friend.id)
	console.log(friend.id)
}

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

