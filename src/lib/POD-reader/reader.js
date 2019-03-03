const fileClient = require('solid-file-client');
var leemeURI = "https://podaes1b.solid.community/public/Bebesitaa/index.ttl"
var almacen
fileClient.readFile(leemeURI).then(  body => {
	almacen = body;
  console.log(almacen);
}, err => console.log(err) );
