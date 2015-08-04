
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


//Connection to database
mongoose.connect("mongodb://admin:admin@ds053708.mongolab.com:53708/heroku_c37tjzdd");

var User = mongoose.model('users', {name : String, firstname : String, mail : String, password : String, admin : Boolean});
var Errand = mongoose.model('errands', {state : String, dateDebut : Date, dateFin : Date, duree : String, distance : String, user_id : String });


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// USER WEBSERVICES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/* 
  Get users
  */
  app.get('/users', function (req, res) {
  // Connect to the db
  mongoose.model('users').find(function(err, users){
    console.dir('[getUsers] called');
    res.send(users);
  })      

});


/* 
  Add user 
  */
  app.post('/users', function(req, res){  
    console.dir('[addUser] called');
    var newUser = new User({name : req.body.name, firstname : req.body.firstname, mail : req.body.mail, password : req.body.password, admin : req.body.admin});
    newUser.save(function (err, result) {
      if (err) return handleError(err);

      console.log(result);
      res.end();
    });
  });

/* 
  Delete user 
  */
  app.post('/deleteUser', function (req, res) {
    User.findById(req.body.id, function (err, user) {
      user.remove(function (err, removedUser) {
        if (err) return handleError(err);
        console.log('Object deleted !');

        res.end();
      })
    })
  });

/* 
  Update user 
  */
  app.post('/updateUser', function (req, res) {
    console.dir('[updateUser] called');


    User.findById(req.body.id, function (err, user) {
      if(err)
        res.send(err);
      // Model.update (user found by id, new user, null, function)
      User.update(user, req.body, null, function(error, result){
        res.end();
      })
    })
  });


////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END USER WEBSERVICES //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ERRAND WEBSERVICES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/* 
  Get errands
  */
  app.get('/errands', function (req, res) {

    console.dir('ok');
  // Connect to the db
  mongoose.model('errands').find(function(err, errands){
    console.dir('[getErrands] called');
    res.send(errands);
  })      

});


/* 
  Add errand
  */
  app.post('/errands', function(req, res){  
    console.dir('[addErrand] called');
    var newErrand = new Errand({state : req.body.state, dateDebut : req.body.dateDebut, dateFin : req.body.dateFin, duree : req.body.duree, distance : req.body.distance, user_id : req.body.user_id });
    newErrand.save(function (err, result) {
      if (err) return handleError(err);

      console.log(result);
      res.end();
    });
  });

/*
  Delete errand 
  */
  app.post('/deleteErrand', function (req, res) {
    Errand.findById(req.body.id, function (err, user) {
      errand.remove(function (err, removedErrand) {
        if (err) return handleError(err);
        console.log('Object deleted !');

        res.end();
      })
    })
  });

/* 
  Update errand 
  */
  app.post('/updateErrand', function (req, res) {
    console.dir('[updateErrand] called');


    Errand.findById(req.body.id, function (err, errand) {
      if(err)
        res.send(err);
      // Model.update (user found by id, new user, null, function)
      Errand.update(errand, req.body, null, function(error, result){
        res.end();
      })
    })
  });



//Select the port 8080 if the serve is launch in local
var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END ERRAND WEBSERVICES //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////