var express = require('express');
var app = express();



	app.get('/', function(request, response) {
	 var user ={
	 	nom : "Louis",
	 	prenom : "Sebastien",
	 	age : "20"
	 };

	 request.json(user);


	});
