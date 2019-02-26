const pod = require("./lib/POD-handler")
// Displays user's webid in the console if he's logged in

/**
 * On DOM load, set solid.auth to track the session status
 */
$("document").ready(async () => {
    pod.track(
        // If there's a session
        () => toggleButtons(true),
        // User isn't logged in
        () => toggleButtons(false)
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
    userWerbId = session.webId
    friends = await pod.friends()

    $.each(friends, (i, friend) => {
        //$("#friendList").prepend("<li>" + friend.fullname + "</li>")
        console.log(friend.value)
    })
})

/**
 * Sets the buttons according to the session status
 * @param {boolean} session 
 */
function toggleButtons(session){
    $("#login").prop("disabled", session)
    $("#logout").prop("disabled", !session)
    $("#friends").prop("disabled", !session)
}