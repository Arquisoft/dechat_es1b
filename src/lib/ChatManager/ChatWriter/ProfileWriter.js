const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, quad } = DataFactory;
const fc = require("solid-file-client");

const KNOWS = "http://xmlns.com/foaf/0.1/knows";

/**
 * 
 * @param {Logged user} userWebID 
 * @param {Friend to add} contactWebID 
 */
async function addContact(userWebID, contactWebID) {
  const cardURI = userWebID.replace("#me", "");

  const writer = new N3.Writer();

  var file = await fc.readFile(cardURI);

  writer.addQuad(
    quad(namedNode(userWebID), namedNode(KNOWS), namedNode(contactWebID))
  );
  writer.end((error, result) => {
    result = result.replace(/(undefined|null)/g, "");
    var output = file + "\n" + result;
    console.log(output)
    return fc.updateFile(cardURI, output);
  });
}

module.exports = {
  addContact
}