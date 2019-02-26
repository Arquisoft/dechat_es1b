/**
 * Contains basic queries to fetch data from the PODs
 */
const {default: data} = require("@solid/query-ldflex")

async function getName(webID){
    const name = await data[webID].name
    console.log("" + name)
    return name + ""
} 

module.exports = {
    getName
}