var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("Hello world from server.js");
});


app.get('/', function(request, response) {
  response.send('Server is running');
});

app.get('/getUser', function(req, res){

	alert('getUser');
	var user ={
		name : "louis",
		prenom : "sebastien",
		age : "20"
	}
	res.json(user);
});
