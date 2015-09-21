
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

var User = mongoose.model('users',
  { name : String, 
    firstname : String, 
    mail : String, 
    password : String,
    phone : String,
    admin : Boolean});

var Errand = mongoose.model('errands',
  { state : Number, 
    prev_startDate : Date, //Format date : 2012-12-19T06:01:17.171Z
    real_startDate : Date, 
    prev_endDate : Date, 
    prev_duree : Number,
    real_duree : Number, 
    prev_distance : Number, 
    real_distance : Number, 
    user_id : String});

var Container = mongoose.model('containers',
  { name : String, 
    lat : Number,
    lng : Number,
    state : Number,
    c_type : Number,
    lastCollect : Date,
    address : String,
    comment : String,
    alert_id : [String],
    area_id : String});

var Zone = mongoose.model('zones',
  { name : String, 
    color : String,
    url_zone : String });

var Alert = mongoose.model('alerts',
  { state : Number,
    description : String,
    startDate : Date,
    endDate : Date,
    user_id : String,
    container_id : String});



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
    var newUser = new User({name : req.body.name, 
      firstname : req.body.firstname, 
      mail : req.body.mail, 
      password : req.body.password,
      phone : req.body.phone,
      admin : req.body.admin});
      newUser.save(function (err, result) {
      if (err) return handleError(err);
      res.send(result);
    });
  });

/* 
  Delete user 
  */
  app.post('/deleteUser', function (req, res) {
    User.findById(req.body._id, function (err, user) {
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


    User.findById(req.body._id, function (err, user) {
      if(err)
        res.send(err);
      // Model.update (user found by id, new user, null, function)
      User.update(user, req.body, null, function(error, result){
        res.end();
      })
    })
  });

  /* 
  Connexion user 
  */
  app.post('/connexion', function(req, res){  
    console.dir('[Connexion] called');
    mongoose.model('users').findOne({mail: req.body.mail, password: req.body.password}, function(err, user){
      if(user){
        console.log("User found");
        res.send(user);
      } else{
        console.log("ERROR : User not found");
        //res.send({req: "connexion", resultCode: 1});
        res.send({});
      }  
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
    var newErrand = new Errand({state : req.body.state, 
      prev_startDate : req.body.prev_startDate, 
      real_startDate : req.body.real_startDate, 
      prev_endDate : req.body.prev_endDate, 
      prev_duree : req.body.prev_duree,
      real_duree : req.body.real_duree, 
      prev_distance : req.body.prev_distance, 
      real_distance : req.body.real_distance, 
      user_id : req.body.user_id });
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
    Errand.findById(req.body._id, function (err, errand) {
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


    Errand.findById(req.body._id, function (err, errand) {
      if(err)
        res.send(err);
      Errand.update(errand, req.body, null, function(error, result){
        res.end();
      })
    })
  });

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END ERRAND WEBSERVICES //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CONTAINER WEBSERVICES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/* 
  Get container
  */
  app.get('/containers', function (req, res) {
  // Connect to the db
  mongoose.model('containers').find(function(err, containers){
    console.dir('[getContainers] called');
    res.send(containers);
  })      

});


/* 
  Add Container
  */
  app.post('/containers', function(req, res){  
    console.dir('[addContainer] called');
    var newContainer = new Container({name : req.body.name, 
      lat : req.body.lat,
      lng : req.body.lng,
      state : req.body.state,
      c_type : req.body.c_type,
      lastCollect : req.body.lastCollect,
      address : req.body.address,
      comment : req.body.comment,
      alert_id : req.body.alert_id,
      area_id : req.body.area_id});
    newContainer.save(function (err, result) {
      if (err) return handleError(err);

      console.log(result);
      res.end();
    });
  });

/* 
  Delete container
  */
  app.post('/deleteContainer', function (req, res) {
    Container.findById(req.body._id, function (err, container) {
      container.remove(function (err, removedContainer) {
        if (err) return handleError(err);
        console.log('Object deleted !');

        res.end();
      })
    })
  });

/* 
  Update container
  TODO : REVOIR LA MANIPULATION DU TABLEAU DES ALERTES
  */
  app.post('/updateContainer', function (req, res) {
    console.dir('[updateContainer] called');


    Container.findById(req.body._id, function (err, container) {
      if(err)
        res.send(err);
      Container.update(container, req.body, null, function(error, result){
        res.end();
      })
    })
  });

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END CONTAINER WEBSERVICES //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ZONE WEBSERVICES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/* 
  Get zone
  */
  app.get('/zones', function (req, res) {
  // Connect to the db
  mongoose.model('zones').find(function(err, zones){
    console.dir('[getZones] called');
    res.send(zones);
  })      

});


/* 
  Add Zone
  */
  app.post('/zones', function(req, res){  
    console.dir('[addZone] called');
    var newZone = new Zone({
      name : req.body.name, 
      color : req.body.color,
      url_zone : req.body.url_zone});

      newZone.save(function (err, result) {
      if (err) return handleError(err);

      console.log(result);
      res.end();
    });
  });

/* 
  Delete Zone
  */
  app.post('/deleteZone', function (req, res) {
    Zone.findById(req.body._id, function (err, zone) {
      zone.remove(function (err, removedZone) {
        if (err) return handleError(err);
        console.log('Object deleted !');

        res.end();
      })
    })
  });

/* 
  Update Zone
  */
  app.post('/updateZone', function (req, res) {
    console.dir('[updateZone] called');


    Zone.findById(req.body._id, function (err, zone) {
      if(err)
        res.send(err);
      Zone.update(zone, req.body, null, function(error, result){
        res.end();
      })
    })
  });

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END ZONE WEBSERVICES //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ALERT WEBSERVICES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/* 
  Get alert
  */
  app.get('/alerts', function (req, res) {
  // Connect to the db
  mongoose.model('alerts').find(function(err, alerts){
    console.dir('[getAlerts] called');
    res.send(alerts);
  })      

});


/* 
  Add alert
  */
  app.post('/alerts', function(req, res){  
    console.dir('[addAlert] called');
    var newAlert = new Alert({
      state : req.body.state,
      description : req.body.description,
      startDate : req.body.startDate,
      endDate : req.body.endDate,
      user_id : req.body.user_id,
      container_id : req.body.container_id});

      newAlert.save(function (err, result) {
      if (err) return handleError(err);

      console.log(result);
      res.end();
    });
  });

/* 
  Delete Alert
  */
  app.post('/deleteAlert', function (req, res) {
    Alert.findById(req.body._id, function (err, alert) {
      alert.remove(function (err, removedAlert) {
        if (err) return handleError(err);
        console.log('Object deleted !');

        res.end();
      })
    })
  });

/* 
  Update Alert
  */
  app.post('/updateAlert', function (req, res) {
    console.dir('[updateAlert] called');


    Alert.findById(req.body._id, function (err, alert) {
      if(err)
        res.send(err);
      Alert.update(alert, req.body, null, function(error, result){
        res.end();
      })
    })
  });

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END ALERT WEBSERVICES //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


//Select the port 8080 if the serve is launch in local
var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

