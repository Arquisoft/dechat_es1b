const express = require('express')
const app = express()
const path = require ('path')


app.use(express.static(__dirname + "/src"));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + "/src/index.html"))
})

app.listen(3000, function () {
  console.log('DeChat ES1B running on port 3000')
})