
var express = require('express');
var app = express();

app.get('/getUser', function (req, res) {
  

  var user = {
    nom : "louis",
    prenom : "sebastien",
    age : "20"
  }
  res.json(user);
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});