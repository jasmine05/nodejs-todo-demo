//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URL = process.env.MONGODB_URL;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//post route for adding new task 
app.post("/addtask",async function(req, res) {

    const doc = JSON.parse(req.body.newtask);

    const client = await MongoClient.connect(
      MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const coll = client.db('faber').collection('todos');
    const result = await coll.insertOne(doc);
    await client.close();

    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", async function(req, res) {

    var validTodos = await getValidToDos();
    var completeTodos = await getFinishedToDos();
    
    res.render("index", { task: validTodos, complete: completeTodos });
});

//set app to listen on port 3000
app.listen(process.env.PORT || 3000, function() {

    console.log("server is running on port ", process.env.PORT || 3000);
});

async function getValidToDos() {
  const agg = [
    {
      '$limit': 10
    }, {
      '$project': {
        '_id': 0
      }
    }, {
      '$match': {
        'status': {
          '$ne': 'FINISHED'
        }
      }
    }
  ];

  const client = await MongoClient.connect(
    MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('faber').collection('todos');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  var ejsResult = [];
  result.forEach(el => {
    ejsResult.push(JSON.stringify(el));
  });
  return ejsResult;
}

async function getFinishedToDos() {
  const agg = [
    {
      '$limit': 10
    }, {
      '$project': {
        '_id': 0
      }
    }, {
      '$match': {
        'status': 'FINISHED'
      }
    }, {
      '$project': {
        'status': 0
      }
    },
  ];

  const client = await MongoClient.connect(
    MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('faber').collection('todos');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  var ejsResult = [];
  result.forEach(el => {
    ejsResult.push(JSON.stringify(el));
  });
  return ejsResult;
}

