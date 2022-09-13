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

//placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", async function(req, res) {

  
    /*
     * Requires the MongoDB Node.js Driver
     * https://mongodb.github.io/node-mongodb-native
     */
    
    const agg = [
      {
        '$project': {
          'bedrooms': 1, 
          '_id': 0
        }
      }, {
        '$limit': 10
      }
    ];
    
    const client = await MongoClient.connect(
         MONGODB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const coll = client.db('sample_airbnb').collection('listingsAndReviews');
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    await client.close();

    console.log(result);

    var ejsResult=[];
    result.forEach(el => {
        console.log(el);
        ejsResult.push("bedrooms:"+ el.bedrooms)
    });
    

    res.render("index", { task: ejsResult, complete: complete });
});

//set app to listen on port 3000
app.listen(process.env.PORT || 3000, function() {

    console.log("server is running on port ", process.env.PORT || 3000);
});

