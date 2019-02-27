/**
 * Contains basic queries to fetch data from the PODs
 */
const { default: data } = require("@solid/query-ldflex")
const Person = require("../model/person")

/**
 * Creates handlers to run queries against WebID or the authenticated user
 */

async function getName(webID) {
    let proxy
    if (webID)
        proxy = await data[webID].name
    else
        proxy = await data.user.name
    return proxy.value
}

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
 */
async function getFriends(webID) {
    let friends
    toRet = [];
    if (webID)
        friends = data[webID].friends
    else
        friends = data.user.friends
    for await (const friend of friends){
      var id = await friend.value
      var name = await getName(id)
      var inbox = await getInbox(id)
      toRet.push(new Person(id, name, inbox));
    }
    return toRet;
  }
  


module.exports = {
    getName,
    getInbox,
    getFriends
}