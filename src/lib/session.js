/**
 * API for handling SOLID pods
 */
const auth = require("solid-auth-client");
const query = require("./ldflex-queries");
const Person = require("../model/person")


/**
 * Presents a popup and logs the user in
 */
async function login(){
  await auth.popupLogin({ popupUri: "../popup.html" });
};

/**
 * Returns the current session
 * @return {function} currentSession 
 */
async function getSession() {
  return await auth.currentSession();
};

/**
 * Returns the authenticated user
 * @return {Person} user 
 */
async function getUser(){
  webID = (await auth.currentSession()).webId;
  name = await query.getName();
  inbox = await query.getInbox();
  return new Person(webID, name, inbox);
}

/**
 * Close user session 
 */
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
    track,
    getUser
}
