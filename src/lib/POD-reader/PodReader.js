"use strict";
const fileClient = require("solid-file-client");

/**
 * This function read a file of a POD.
 * @param leemeURL URL where is the file.
 */
function readFile(leemeURL) {
	
  fileClient.popupLogin();
  fileClient.readFile(leemeURL).then((body) => {
    //Copy the read file into almacen
    //console.log(body);
    return body;
  }, (err) => console.log(err));
}

exports.readFile = readFile;