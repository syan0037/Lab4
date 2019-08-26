 let express = require('express');
 let router = express.Router();
 let bodyParser = require('body-parser');
 let app = express();

 app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('img'));
app.set(express.static('view'));
app.use(express.static('css'));


//home page
let dataBase = [];

app.get('/', function(req,res){
    res.render('index.html');
});


//new task
app.get('/newtask', function(req,res){
    res.render('newtask.html');
});

//list task
app.get('/listtasks', function(req,res){
    res.render('listtasks.html', {tasks: dataBase});
});

app.post('/data', function(req,res){
    let data = {
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
    };
    dataBase.push(data);
    res.render('newtask.html');
});


app.listen("8080");