const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const fc = require("solid-file-client");

const KNOWS = "http://xmlns.com/foaf/0.1/knows";

async function getCard(URI) {
  const parser = new N3.Parser();
  var file = await fc.readFile(URI);
  let quads, prefixes;
  var res = parser.parse(file, q => (quads = q), p => (prefixes = p));
  console.log(await quads, await prefixes);
  return res;
}

async function addContact(userWebID, contactWebID) {
  cardURI = userWebID.replace("#me", "");

  const parser = new N3.Parser();
  const writer = new N3.Writer();

  var file = await fc.readFile(cardURI);
  console.log(file);

  writer.addQuad(
    quad(namedNode(userWebID), namedNode(KNOWS), namedNode(contactWebID))
  );
  const newQuad = await writer.end((error, result) => {
    result = result.replace(/(undefined|null)/g, "");
    var output = file + result;
    fc.updateFile(cardURI, output).then(console.log("Ya ta!"));
  });
}

function getPrefixes(rdfFile) {
  prefixes = {};
  var sentences = rdfFile.split(/\.(?![^<]*>)/g); //This regex selects all . except those inside <>
  for (sentence of sentences) {
    if (sentence.includes("@prefix")) prefixes.push(sentence + ".");
  }
  return prefixes;
}

module.exports = {
  getCard,
  addContact
};
