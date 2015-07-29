var express = require('express');
var app = express();


app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "http://localhost:3002 ");

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);


	app.get('/', function(request, response) {

	 var user ={
	 	nom : "Louis",
	 	prenom : "Sebastien",
	 	age : "20"
	 };

	 request.json(user);

	});
