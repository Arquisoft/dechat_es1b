/**
 * API for handling SOLID pods
 */
const auth = require("solid-auth-client");


/**
 * Presents a popup and logs the user in
 */
async function login(){
  await auth.popupLogin({ popupUri: "../popup.html" });
};

/**
 * Returns the current session
 */
async function getSession() {
  return await auth.currentSession();
};

async function logout() {
  auth.logout().then(alert("Disconnected"));
};


/**
 * Tracks the session and executes the callback functions depending on the session status
 * @param {function} success 
 * @param {function} failure 
 */
async function track(success, failure){
  auth.trackSession(session => {
    if (!session){
      failure()
    }else
    success()
  })
}

module.exports = {
    login,
    logout,
    getSession,
    friends,
    track
}
