
var express = require('express');
var app = express();

app.get('/hello/:id', function (req, res) {
  res.send('Hello World!'+req.params.id);
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});