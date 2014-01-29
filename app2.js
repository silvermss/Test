var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.compress());

/* DB */
var db = require('./models/db');
var User = db.User;
var connect = db.connect;

/* Jade */
app.set('view_engine', 'jade');
app.set('views', __dirname + '/views');

connect.once('open', function callback() {

    app.get('/', function(req,res) {
        res.send('Hello World\n');
    });

    app.get('/home', function(req,res){
 		res.sendfile(__dirname + '/public/home.html');
	}); 
	app.get('/index', function(req,res){
 		res.sendfile(__dirname + '/public/index.html');
	}); 


    app.get('/about', function(req, res){
        res.send('Here is a little about me');
    });

    app.get('/test', function(req, res){
        res.send('Test passed, A+!');
    });

    app.get('/name/:myname', function(req, res) {
        res.send('My name is ' + req.params.myname);
    });

    app.get('/database/:user/:password', function(req, res) {
        var newUser = new User({
                        "username": req.params.user,
                        "password": req.params.password });
        newUser.save(function (e) {
        if (e) {
            console.log(e);
            res.send('FAIL!');
            }
        else {
            res.send('SUCCESS!');
            }
        });
    });
    
    app.get('/findMe/:user', function (req, res) {
        User.findOne( { "username" : req.params.user }, function (err, user) {
            if (err) {
                res.send('failure...');
                }
            else {
                res.send('Your password is ' + user.password);
                }
        });
    });
 }); 
        

app.listen(8000);