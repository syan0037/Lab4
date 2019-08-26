 let express = require('express');
 let router = express.Router();
//  let bodyParser = require('body-parser');
//  let app = express();


//home page
let dataBase = [];

router.get('/', function(req,res){
    res.render('index.html');
});


//new task
router.get('/newtask', function(req,res){
    res.render('newtask.html');
});

//list task
router.get('/listtasks', function(req,res){
    res.render('listtasks.html', {tasks: dataBase});
});

router.post('/data', function(req,res){
    let data = {
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
    };
    dataBase.push(data);
    res.render('newtask.html');
});


module.exports = router;