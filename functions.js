var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

module.exports = 
{
	getAllRecords : function(mongoUri,DB_Name,Collection_Name,callback)
	{
		console.log("came here");

		MongoClient.connect(mongoUri,function(err,db)
		{
			if(err)
			{
				throw(err)
			}
			var dbo = db.db(DB_Name);
			dbo.collection(Collection_Name).find({}).toArray(function(err, result) 
			{
			    if (err)
			    {
			    	throw err;
			    } 
			    console.log("came till the end");
			    console.log(typeof Object.keys(result) + Object.keys(result).length);
			    if(typeof Object.keys(result) !== 'undefined' && Object.keys(result).length > 0)
			    {
			    	console.log("entering here");
			    	callback(result);
			    }
			    else
			    {
			    	console.log("entering else");
			    	callback("entering else");
			    }
			});
		});
	},

	deleteNullRecords : function(mongoUri,DB_Name,Collection_Name)
	{
		MongoClient.connect(mongoUri, function(err, db) 
		{
		  if (err) throw err;
		  var dbo = db.db(DB_Name);
		  var myquery = { first_name : null };
		  dbo.collection(Collection_Name).deleteMany(myquery, function(err, obj) 
		  {
		    if (err) throw err;
		    console.log(obj.result.n + " document(s) deleted");
		    db.close();
		  });
		});
	},

	deleteRecord : function(mongoUri,DB_Name,Collection_Name,first_name)
	{
		MongoClient.connect(mongoUri, function(err, db) 
		{
		  if (err) throw err;
		  var dbo = db.db(DB_Name);
		  var myquery = { first_name : first_name };
		  dbo.collection(Collection_Name).deleteMany(myquery, function(err, obj) 
		  {
		    if (err) throw err;
		    console.log(obj.result.n + " document(s) deleted");
		    db.close();
		  });
		});
	},

	insertRecord : function(mongoUri,DB_Name,Collection_Name,response)
	{
		MongoClient.connect(mongoUri,function(err,db)
		{
			if(err)
			{
				throw(err)
			}

			dbo = db.db(DB_Name);
			dbo.collection(Collection_Name).insertOne(response,function(err,rest)
			{
				if(err)
				{
					console.log(err.message)
				}
				console.log("document inserted")
				console.log(rest.insertedCount);
			});
		});
	},

	createCollection : function(mongoUri,DB_Name,Collection_Name)
	{
		try
		{
			MongoClient.connect(mongoUri,function(err,db)
			{
				if(err)
				{
					throw(err)
				}
				var dbo = db.db(DB_Name);
		  		dbo.createCollection(Collection_Name, function(err, res)
		  		{
		  			if(err)
		  			{
		  				throw(err)
		  			}
		  			console.log("collection created")
		  		});
				console.log("database created")
				// db.close();
			});
		}
		catch(err)
		{
			console.log(err.message)
		}
	}
}