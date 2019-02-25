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
  auth.popupLogin({ popupUri: "../popup.html" });
};

async function isLoggedIn() {
  return auth.currentSession();
};

async function logout() {
  auth.logout().then(alert("See you l8r allig8r"));
};

async function friends() {
  const session = await auth.currentSession();
  user = data[session.webId];
  toRet = [];
  for await (const friend of user.friends) toRet.push(new Friend(friend));
  return toRet;
}

module.exports = {
    login,
    logout,
    isLoggedIn,
    friends
}
