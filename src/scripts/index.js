const auth = solid.auth
const data = solid.data

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
    console.log(isLoggedIn())
    if (! await isLoggedIn())
        auth.popupLogin({ popupUri: '../views/popup.html' })
    else
        console.log("Ya tas dentro tt")
    trackSession()
})

$("#logout").click(async () => {
    if (await isLoggedIn())
        auth.logout().then(alert("See you l8r allig8r"))
})

$("#friends").click(async () => {
    if (await isLoggedIn()){
        const session = await auth.currentSession();
        user = data[session.webId];
        for await (const friend of user.friends){
            console.log('*')
            console.log(friend.value)
        }
    }
})