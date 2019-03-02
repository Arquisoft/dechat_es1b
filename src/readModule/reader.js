const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const fileClient = require('solid-file-client');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Mira la consola por favor\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var leemeURI = "https://podaes1b.solid.community/public/Bebesitaa/index.ttl"
var almacen
fileClient.readFile(leemeURI).then(  body => {
	almacen = body;
  console.log(almacen);
}, err => console.log(err) );
