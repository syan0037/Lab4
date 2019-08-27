 let express = require('express');
 let bodyParser = require('body-parser'); //import 
 let app = express();

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


//home page
let dataBase = [];

app.get('/', function(req,res){
    res.sendFile(__dirname +'index.html');
});


//new task
app.get('/newtask', function(req,res){
    res.sendFile(__dirname + 'newtask.html');
});

//list task
app.get('/listtasks', function(req,res){
    res.render('listtasks.html', {tasks: dataBase});  // two parameters: first is html, second a object of dataBase
});

app.post('/data', function(req,res){
    let data = {
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
    };
    dataBase.push(data);
    res.sendFile(__dirname +'newtask.html');
});


app.listen("8080");