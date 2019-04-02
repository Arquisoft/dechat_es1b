const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const fc = require("solid-file-client")

const KNOWS = "http://xmlns.com/foaf/0.1/knows"

async function getCard(URI){
    const parser = new N3.Parser();
    var file = await fc.readFile(URI);
    var prefixes = getPrefixes(file);
    console.log("Prefijos")
    console.log(prefixes);
    var result =  parser.parse(file);
    return result;
}

async function addContact(userWebID, contactWebID){
    cardURI = userWebID.replace("#me", "");
    const parsedQuads = await getCard(cardURI);
    console.log(parsedQuads);
    
    const writer = new N3.Writer();
    for (parsedQuad of parsedQuads){
        writer.addQuad(parsedQuad);
    }
    writer.addQuad(quad(
        namedNode(contactWebID),
        namedNode(KNOWS),
        namedNode("null#me")
    )
    );
    const output = writer.end((error, result)=> {
        result.replace("undefined", "null");
        console.log(result);

    });
    //fc.updateFile(cardURI, output).then(console.log("Ya ta!"))
}

function getPrefixes(rdfFile){
    prefixes = [];
    var sentences = rdfFile.split(/\.(?![^<]*>)/g); //This regex selects all . except those inside <>
    for (sentence of sentences){
        if (sentence.includes("@prefix"))
            prefixes.push(sentence);
    }
    return prefixes.join('.');
}


module.exports = {
    getCard,
    addContact
}