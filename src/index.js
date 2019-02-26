const pod = require("./lib/POD-handler")
const ldfquery = require("./lib/ldflex-queries")

const queryFactory = new ldfquery.QueryFactory
let query
/**
 * On DOM load, set solid.auth to track the session status
 */
$("document").ready(async () => {
    pod.track(
        // If there's a session
        () => {
            query = queryFactory.forSession()
            changeView(true)
        },
        // User isn't logged in
        () => {
            query = null
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
    friends = await pod.friends()

    $.each(friends, (i, friend) => {
        //$("#friendList").prepend("<li>" + friend.fullname + "</li>")
        console.log(friend)
        console.log(friend.value + friend.name + friend.inbox)
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

