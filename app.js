 let express = require('express');
 let bodyParser = require('body-parser'); //import 
 let app = express();
 let mongodb = require("mongodb"); //get an instance of MongoDB
 let morgan = require("morgan");
//  var mongoose = require('mongoose');
 let mongoose = require('mongoose');

//rederencing schemas
 let Tasks = require('./models/tasks');
 let Developers = require('./models/developers');


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
// let MongoClient = mongodb.MongoClient;


//connect URL to the MongoDB server
let url = "mongodb://localhost:27017/fit2095db";

//reference to the dataBase
let db = mongoose.connections;

// //connect to mongoDB server
mongoose.connect('mongodb://localhost:27017/fit2095db', function(err){
    if(err){
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});




//home page
app.get('/', function(req,res){
    res.sendFile(__dirname +'/views/index.html');
});

app.get('/getAssignTo', function(err,res){
    Developers.find().populate('developerSchema').exec((err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result);
    });
})


//***insert new task
app.get('/newtask', function(req,res){
    res.sendFile(__dirname + '/views/newtask.html');
});


app.post('/data', function(req,res){
    let taskDetails = req.body;
    taskDetails.taskID = getNewId();

    // let task = new Tasks({
    //     taskID: taskDetails.taskID,
    //     taskName: taskDetails.taskName,
    //     // assignTo: taskDetails._id,
    //     // assignTo: developer._id,
    //     taskDue: taskDetails.taskDue,
    //     taskStatus: taskDetails.taskStatus,
    //     taskDesc: taskDetails.taskDesc,
    // });
    

    let task = new Tasks({
        taskID: taskDetails.taskID,
        taskName: taskDetails.taskName,
        assignTo: taskDetails.assignTo,
        taskDue: taskDetails.taskDue,
        taskStatus: taskDetails.taskStatus,
        taskDesc: taskDetails.taskDesc,
    });

    task.save(function(err){
        if (err) throw err;
        console.log('task successfully add to DB');
    });
    
    res.redirect('/listtasks');
});

function getNewId (){
    return (Math.floor(100000 + Math.random() * 900000));
}


//***list task 
app.get('/listtasks', function(req, res){
    Tasks.find({}, function(err, data){
       res.render('listtasks', {taskDB: data});  
    });
});


//***update task
app.get('/updatetask', function(req,res){
    res.sendFile(__dirname + '/views/updatetask.html');
});

app.post('/updatetaskdata', function (req, res){
    let taskDetails = req.body;
    Tasks.updateOne({taskID:parseInt(taskDetails.taskID)}, {$set: {taskStatus: req.body.taskStatus}},
    function (err, doc){
        console.log(doc);
        res.redirect('/listtasks');
    });
});


//***delete task 
app.get('/deletetask', function(req, res){
    res.sendFile(__dirname + '/views/deletetask.html');
});

app.post('/deletetaskdata', function(req, res){
    let taskDetails = req.body;
    Tasks.deleteOne({taskID: parseInt(taskDetails.taskID)}, function (err, doc){
        console.log(doc);
        res.redirect('/listtasks');
    });
});


//***delete all the completed tasks
app.get('/deletecompletedtasks', function(req, res){
    res.sendFile(__dirname + '/views/deletecompletedtasks.html')
});

app.post('/deletetaskdataCompleted', function(req, res){
    // let taskDetails = req.body;
    Tasks.deleteMany({taskStatus: 'Complete'}, function(err){
        res.redirect('/listtasks')
    });
});





//***insert new Developer 
app.get('/newdeveloper', function(req,res){
    res.sendFile(__dirname + '/views/newdeveloper.html');
});

app.post('/newDeveloper', function(req,res){
    let developersDetails = req.body;
    // Developers.inserOne({_id: developersDetails._id, firstName: developersDetails.firstName, lastName: developersDetails.lastName, level: developersDetails.level, state: developersDetails.state, suburb: developersDetails.suburb, street: developersDetails.street, unit: developersDetails.unit});
    // res.redirect('/listdevelopers');
    let developer = new Developers({
        _id: mongoose.Types.ObjectId(),

        name: {
            firstName: developersDetails.firstName,
            lastName: developersDetails.lastName,
        },

        level: developersDetails.level,
       

        address:{
            state: developersDetails.state,
            suburb: developersDetails.suburb,
            street: developersDetails.street,
            unit: developersDetails.unit,
        },
    });

    developer.save(function(err){
        if (err) throw err;

        console.log('developer successfully add to DB');

    })
    res.redirect('/listdevelopers');
});


//list Developers
app.get('/listdevelopers', function(req, res){
    // Developers.find({}).toArray(function(err,date){
    //     res.render('/listdevelopers',{taskDB: date});
    // })
    Developers.find({}, function(err, data){
        res.render('listdevelopers', {developerDB: data});
    });
});

console.log(test);
