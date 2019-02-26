/**
 * API for handling SOLID pods
 */
const auth = require("solid-auth-client");
const { default: data } = require("@solid/query-ldflex");
const Friend = require("../model/friend");


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
 * Returns a list of Friends @see{Friend.js} from the authenticated user
 */
async function friends() {
  const session = await auth.currentSession();
  user = data[session.webId];
  toRet = [];
  for await (const friend of user.friends) toRet.push(await new Friend(friend));
  return toRet;
}

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
