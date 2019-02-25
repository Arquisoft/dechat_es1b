const auth = require("solid-auth-client")
const { default: data } = require("@solid/query-ldflex")
const pod = require("./lib/POD-handler")
// Displays user's webid in the console if he's logged in
function trackSession(){
    auth.trackSession(session => {
        if (!session)
          console.log('The user is not logged in')
        else
          console.log(`The user is ${session.webId}`)
      })
}

function getWebId(){

}

async function isLoggedIn(){
    return await auth.currentSession();
}

$("#login").click(async () => {
    console.log(await pod.isLoggedIn())
    if (! await pod.isLoggedIn()){
        pod.login()
        console.log("Está bien, puedes pasar")
    }
    else
        console.log("De que vas pavo")
})

$("#logout").click(async () => {
    if (await pod.isLoggedIn())
        pod.logout()
})

$("#friends").click(async () => {
    friends = await pod.friends()
    
    $.each(friends, (i, friend) => {
        $("#friendList").prepend("<li>" + friend.value + "</li>")
    })
    
})