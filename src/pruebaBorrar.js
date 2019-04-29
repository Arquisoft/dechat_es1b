const fileClient = require("solid-file-client");

var podaes1bCredentials = {
			"idp": "https://solid.community",
			"username": "podaes1b",
			"base": "https://podaes1b.solid.community",
			"password": "arquitectura20191b",
      "test": "/public/test/"
}

console.log(podaes1bCredentials);

fileClient.checkSession().then( session => {
  console.log("Logged in as "+session.webId)
}, err => console.log(err) );

fileClient.login({
  "idp"      : "https://solid.community",
  "username" : "podaes1b",
  "password" : "arquitectura20191b",
  "base"     : "https://podaes1b.solid.community",
  "test"     : "/public/test/"
}).then( webId => {
    console.log( `Logged in as ${webId}.`)
}, err => console.log(err) );