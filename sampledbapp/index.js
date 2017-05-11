//require the mongoClient from mongodb module

var MongoClient = require('mongodb').MongoClient;



//mongodb configs
//Default port of mongodb 27017

var connectionUrl = 'mongodb://localhost:27017/sampledbapp',

    sampleCollection = 'friends';



//We need to insert these friends into mongoDB

var friends = [{

    'Name': 'Manikanta',

    'Alias': 'Mani',

    'Email': 'mani@computerscan.in'

},{

    'Name': 'Vidyasagar',

    'Alias': 'Sagar',

    'Email': 'sagar@computerscan.in'

}];



MongoClient.connect(connectionUrl, function(err, db) {



  console.log("Connected correctly to server");



  // Get some collection collections are equivalent to the tables in RDBMS

  var collection = db.collection(sampleCollection);



  collection.insert(friends,function(error,result){

    //here result will contain an array of records inserted

    if(!error) {

      console.log("Success :"+result.ops.length+" friends inserted!");

    } else {

      console.log("Some error was encountered!");

    }

    db.close();

  });

});