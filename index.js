
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Retrieve
var MongoClient = require('mongodb').MongoClient;



app.use(bodyParser());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



/*
ex input request


app.post('/setUser', function(req, res){
    //ex pour un input 'name'
    var userName = req.body.name;
}

*/


app.get('/getUser', function (req, res) {
  // Connect to the db
MongoClient.connect("mongodb://admin:admin@ds053708.mongolab.com:53708/heroku_c37tjzdd", function(err, db) {
  if(err) { return console.log(err); }
    else
        console.log("vous etes connectes a la mongo !");
}


});

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});