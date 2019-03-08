'use strict';
const fileClient = require("solid-file-client");
const textParser = require("./TextParser.js");
const sorter = require("./Sorter.js");
const creator = require("./ElementCreator.js");
var promise = require("promise");

/**
 * This function read a file of a POD.
 * @param leemeURL URL where is the file.
 */
function readFile(leemeURL) {
  var almacen;
  var parsedText;

  fileClient.readFile(leemeURL).then((body) => {
    //Copy the read file into almacen
    //console.log(body);
    return body;
  }, (err) => console.log(err));
}

exports.readFile = readFile;