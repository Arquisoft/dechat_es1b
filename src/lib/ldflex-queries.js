/**
 * Contains basic queries to fetch data from the PODs
 */
const { default: data } = require("@solid/query-ldflex")
const Person = require("../model/person")

/**
 * Creates handlers to run queries against WebID or the authenticated user
 * @param {String} webID 
 * @return {Proxy} controller
 */
async function getName(webID) {
    let proxy
    if (webID)
        proxy = await data[webID].name
    else
        proxy = await data.user.name
    return proxy.value
}

/**
 * We get the user's inbox
 * @param {String} webID 
 * @return {Proxy} controller
 */
async function getInbox(webID) {
    let proxy
    if (webID)
        proxy = await data[webID].inbox
    else
        proxy = await data.user.inbox
    return proxy.value
}

/**
 * Returns a list of Friends @see{person.js} from the authenticated user
 * @param {String} webID of the authenticated user
 * @return {Array} array of friends
 */
async function getFriends(webID) {
    let friends;
    toRet = [];
    if (webID)
        friends = data[webID].friends;
    else
        friends = data.user.friends;
    for await (const friend of friends){
      var id = await friend.value;
      var name = await getName(id);
      var inbox = await getInbox(id);
      toRet.push(new Person(id, name, inbox));
    }
    return toRet;
  }

async function getProfilePic(webID){
    let pic;
    if (webID)
        pic = data[webID].vcard$hasPhoto;
    else
        pic = data.user.vcard$hasPhoto;
    pic = await pic.value;
    return pic;
}
  


module.exports = {
    getName,
    getInbox,
    getFriends,
    getProfilePic
}