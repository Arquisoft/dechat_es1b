const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const fc = require("solid-file-client");

const KNOWS = "http://xmlns.com/foaf/0.1/knows";

/**
 * 
 * @param {Logged user} userWebID 
 * @param {Friend to add} contactWebID 
 */
async function addContact(userWebID, contactWebID) {
  cardURI = userWebID.replace("#me", "");

  const parser = new N3.Parser();
  const writer = new N3.Writer();

  var file = await fc.readFile(cardURI);

  writer.addQuad(
    quad(namedNode(userWebID), namedNode(KNOWS), namedNode(contactWebID))
  );
  writer.end((error, result) => {
    result = result.replace(/(undefined|null)/g, "");
    var output = file + result;
    console.log(output)
    fc.updateFile(cardURI, output).then(console.log("Ya ta!"));
  });
}

module.exports = {
  addContact
}