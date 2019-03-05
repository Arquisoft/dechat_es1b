const fileClient = require('solid-file-client');

/**
 * This function read a file of a POD.
 * @param leemeURL URL where is the file.
 */
function readFile(leemeURL) {
  var almacen;
  fileClient.readFile(leemeURL).then(  body => {
    almacen = body;
    return almacen;
  }, err => console.log(err) );
}
