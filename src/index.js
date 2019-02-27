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

$("#friends").click(async () => {
    userWerbId = pod.getSession().webId
    friends = await query.getFriends()

    $.each(friends, (i, friend) => {
        $(".friends-list").prepend("<button id='Amigo "+i+"'>" + "Chat with " + friend.name + "</button>")
		//document.getElementById(friend.id).click(async() => { startChat()})
        console.log("Friend #" + i + " " + friend.id + " " + friend.name + " " + friend.inbox)
    })
})

/**
* Start a chat with the selected friend
* @param {Person} friend objeto Person que representa al amigo en cuestion
*/
function startChat(friend) {
	alert("Se llama a la f start")
	//console.log(friend.id)
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
	
	if(!session)		
		$(".friends-list").empty()
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

