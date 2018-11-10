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
var Twit = require('twit')
var moment = require("moment")

var Twitter = new Twit({
	consumer_key: 'WrQ6LEe9WVqQlZY3c8rqSTPpj',
	consumer_secret: 'C4ONlFe2UJ3gsmG892tG684ZNdV6Qn0ADNc3oq4jcwwhgQpLsX',
	access_token: '754173240021397504-8d2tDMtlj6n9z33gHE21r0CczpIaANE',
	access_token_secret: 'JtQnvQiWwjw5O5anEVgzxITXEDxDNfPDHmFMn8PlRMwxg'
})

var options = {
	screen_name:'imVkohli',
	count:5,
	tweet_mode:'extended'
};

// app definitions

// app.use('/public',express.static(__dirname + '/public'));
app.use(express.static(__dirname));
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
		if(result != "entering else")
		{
			res.render(path.join(__dirname+'/results.html'), {results : JSON.stringify(result), length : Object.keys(result).length, width : Object.keys(result[0]).length});
		}
		else
		{
			res.send("No records to show");
		}
	});	
});

app.get('/twitter',function(req,res)
{
	Twitter.get('statuses/user_timeline', options , function(err, data, response)
	{
		var str = "";
		var i;
		var str_temp = "";
		var date = [];
		for(i = 0; i < data.length; i++)
		{
			if(typeof data[i]["quoted_status"] === 'undefined')
			{
				str_temp = data[i]["full_text"]
			}
			else
			{
				str_temp = data[i]["quoted_status"]["full_text"]
			}
			str = str + str_temp + "<br>"
			var tweetTime = moment(data[i]["created_at"], "ddd MMM D HH:mm:ss ZZ YYYY");
			date[i] = new Date(data[i]["created_at"])
			console.log(date[i])
		}
		console.log("------------------------");
		for(i=0;i<data.length;i++)
		{
			console.log(date[i])
		}
		if(date[0]<date[1])
		{
			console.log("this is that")
		}
		else if(date[1]<date[0])
		{
			console.log("that is this");
		}
		var currentDate = new Date();
		console.log(currentDate)
		if(currentDate > date[0])
		{
			console.log("working correctly!!!!!!!!!")
		}
		res.send(str);
	})
});

app.get('/get_results', function(req,res)
{
	response = 
	{
		first_name : req.query.first_name,
		last_name : req.query.last_name
	};
	functions.insertRecord(mongoUri,DB_Name,Collection_Name,response);
	res.send("added the name "+req.query.first_name+" "+req.query.last_name);
});

app.get('/charts',function(req,res)
{	
	res.render(path.join(__dirname+'/charts.html'));
});

app.get('/delete/:name',function(req,res)
{
	functions.deleteRecord(mongoUri,DB_Name,Collection_Name,req.params.name);
	res.send("record with first name "+req.params.name+" deleted");
});

app.listen(port);
console.log("Server listening on "+ port);