var express = require('express');
var router = require('./router.js')
var app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('img'));
app.set(express.static('view'));
app.use(express.static('css'));

app.use('/', router);
app.listen("8080");
