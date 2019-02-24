const auth = solid.auth

// Displays user's webid in the console if he's logged in
function trackSession(){
    auth.trackSession(session => {
        if (!session)
          console.log('The user is not logged in')
        else
          console.log(`The user is ${session.webId}`)
      })
}

$("#login").click(async () => {
    const session = await solid.auth.currentSession();
    if (!session)
        auth.popupLogin({ popupUri: '../views/popup.html' })
    else
        console.log("Ya tas dentro tt")
    trackSession()
})

$("#logout").click(() => {
    auth.logout().then(alert("See you l8r allig8r"))
})

$("#friends").click(() => {
    
})