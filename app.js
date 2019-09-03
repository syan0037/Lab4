 let express = require('express');
 let bodyParser = require('body-parser'); //import 
 let app = express();
 let mongodb = require("mongodb"); //get an instance of MongoDB
 let morgan = require("morgan");

 app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

// res.render ()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('img'));
app.set(express.static('view'));
app.use(express.static('css'));
app.use(morgan('common'));

app.listen("8080");

//configure MongoDB
let MongoClient = mongodb.MongoClient;


//connect URL to the MongoDB server
let url = "mongodb://localhost:27017/";

//reference to the dataBase
let db;

//connect to mongoDB server
MongoClient.connect(url,{useNewUrlParser:true},
    function (err, client){
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("fit2095db");
        }
    })



//home page
app.get('/', function(req,res){
    res.sendFile(__dirname +'/views/index.html');
});


//new task 
//insert new task
app.get('/newtask', function(req,res){
    res.sendFile(__dirname + '/views/newtask.html');
});


app.post('/data', function(req,res){
    let taskDetails = req.body;
    taskDetails.taskID = getNewId();

    db.collection('tasks').insertOne({taskID: taskDetails.taskID, taskName: taskDetails.taskName, assignTo: taskDetails.assignTo, taskDue: taskDetails.taskDue, taskStatus: taskDetails.taskStatus, taskDesc: taskDetails.taskDesc});
    res.redirect('/listtasks');
});

function getNewId (){
    return (Math.floor(100000 + Math.random() * 900000));
}



//list task
app.get('/listtasks', function(req,res){
    db.collection('tasks').find({}).toArray(function(err,data){
       res.render('listtasks', {taskDB: data});  
    });
});


//update task
app.get('/updatetask', function(req,res){
    res.sendFile(__dirname + '/views/updatetask.html');
});

app.post('/updatetaskdata', function (req, res){
    let taskDetails = req.body;
    db.collection('tasks').updateOne({taskID:parseInt(taskDetails.taskID)}, {$set: {taskStatus: req.body.taskStatus}},
    function (err, result){
        res.redirect('/listtasks');
    });
});


//delete task 
app.get('/deletetask', function(req, res){
    res.sendFile(__dirname + '/views/deletetask.html');
});

app.post('/deletetaskdata', function(req, res){
    let taskDetails = req.body;
    db.collection ("tasks").deleteOne({taskID: parseInt(taskDetails.taskID)}, function (err, result){
    res.redirect('/listtasks');
    });
});


//delete all the completed tasks
app.get('/deletecompletedtasks', function(req, res){
    res.sendFile(__dirname + '/views/deletecompletedtasks.html')
});

app.post('/deletetaskdataCompleted', function(req, res){
    let taskDetails = req.body;
    db.collection ("tasks").deleteMany({taskStatus: 'Complete'});
    res.redirect('/listtasks');
});


//delete all old complete tasks
app.get('/deleteOldcomplete', function(req, res){
    res.sendFile(__dirname + '/views/deleteOldcomplete.html')
});

app.get('/deleteOldcompletetasks', function(req, res){
    let taskDetails = req.body;
    let Date = '3/9/2019';
    let query = {taskDue: {$gte: Date}};
    db.collection ("task").find(query).deleteMany({taskStatus: 'Complete'});
    res.redirect('/listtasks');
});
