const pod = require("./lib/POD-handler")
// Displays user's webid in the console if he's logged in

/**
 * On DOM load, set solid.auth to track the session status
 */
$("document").ready(async () => {
    pod.track(
        // If there's a session
        () => changeView(true),
        // User isn't logged in
        () => changeView(false)
    )
})

// Button listeners
$("#login").click(async () => {
    pod.login()
    startApplicationView();
})

$("#logout").click(async () => {
    pod.logout()
})

$("#friends").click(async () => {
    friends = await pod.friends()

    $.each(friends, (i, friend) => {
        //$("#friendList").prepend("<li>" + friend.value + "</li>")
        console.log(friend.value)
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

}

function hideTitles(){
    $("#titleApp").html("Welcome user: " + pod.isLoggedIn());
    $("#subTitleApp").prop("hidden", session)
}
function startApplicationView() {
    pod.track(
        // If there's a session
        () => changeView(true),
        // User isn't logged in
        () => changeView(false)
    )
}
