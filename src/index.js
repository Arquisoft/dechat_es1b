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
* @param {Person} friend - object representing the user's contact
*/
function startChat(friend) {
    console.log(friend.id)
    $(".friends-list").prepend("<div id='sendMessage'><textarea rows='2' cols='34'>Send a message</textarea><button class='sendButton'>Send</button></div>");
    $(".friends-list").prepend("<h2> CHAT with\t"+friend.name+"</h2><div id='chatContent'><p>This is a testing message\n</p></div>");

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
		$("#buttonFriend"+i).click(async() => { startChat(friend, i)})
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



