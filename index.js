
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
  console.dir('[addUser] called');
    var newUser = new User({ name : req.body.name, firstname : req.body.firstname });
      newUser.save(function (err, result) {
        if (err) return handleError(err);

        console.log(result);
        res.end();
      });
});

app.post('/deleteUser', function (req, res) {
    User.findById(req.body.id, function (err, user) {
        user.remove(function (err, product) {
          if (err) return handleError(err);
            console.log('Object deleted !');

          res.end();
        })
    })
});

app.post('/updateUser', function (req, res) {
  console.dir('[updateUser] called');

    User.findById(req.body.id, function (err, user) {
          if(err)
            res.send(err);

            User.update(user, req.body, null, function(error, result){
                res.end();
            })
        })
});



var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});