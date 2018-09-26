// all of the initializations
const express = require('express')
const port = 8089
var app = express();
var path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
var http = require('http')
mongoose = require('mongoose')
mongodb = require('mongodb')
fs = require('fs');
var mongoUri = 'mongodb://localhost/noderest';
const JSON_Circular = require('circular-json');
var DB_Name = "mydb";
var Collection_Name = "customers";
var functions = require("./functions.js");

// app definitions

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

// database connection and collection creation
var MongoClient = mongodb.MongoClient;
functions.createCollection(mongoUri,DB_Name,Collection_Name);

// get methods.
app.get('/hello',function(req,res)
{
	res.render(path.join(__dirname+'/form.html'));
});

app.get('/musicians',function(req, res)
{
	functions.getAllRecords(mongoUri,DB_Name,Collection_Name, function(result)
	{
		res.render(path.join(__dirname+'/results.html'), {results : JSON.stringify(result), length : Object.keys(result).length, width : Object.keys(result[0]).length});
	});	
});

app.get('/get_results', function(req,res)
{
	response = 
	{
		first_name : req.query.first_name,
		last_name : req.query.last_name
	};
	functions.insertRecord(mongoUri,DB_Name,Collection_Name,response);
	res.send(JSON.stringify(response));
});

app.listen(port);
console.log("Server listening on "+ port);