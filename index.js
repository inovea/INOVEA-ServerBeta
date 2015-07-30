
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Retrieve

app.use(bodyParser());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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






mongoose.connect("mongodb://admin:admin@ds053708.mongolab.com:53708/heroku_c37tjzdd");
var User = mongoose.model('users', {name : String, firstname : String});


app.get('/users', function (req, res) {
  // Connect to the db
    mongoose.model('users').find(function(err, users){
        console.dir('[getUsers] called');
        res.send(users);
    })      

});


app.post('/users', function(req, res){  
    //ex pour un input 'name'
    var newUser = new User({ name : req.body.name, firstname : req.body.firstname });
      newUser.save(function (err, result) {
        if (err) return handleError(err);

        console.log(result);
        res.end();
      });
});

app.delete('/users', function (req, res) {
  console.log(req.body.id);
    mongoose.model('users').findById(req.body.id)
        .exec(function(err, doc) {
            if (err || !doc) {
                res.statusCode = 404;
                res.send({});
            } else {
                doc.remove(function(err) {
                    if (err) {
                        res.statusCode = 403;
                        res.send(err);
                    } else {
                        res.send({});
                    }
                });
            }
        });
});


var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});