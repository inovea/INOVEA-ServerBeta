var User = mongoose.model('users', {name : String, firstname : String});




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
    var newUser = new User({ name : req.body.name, firstname : req.body.firstname });
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
