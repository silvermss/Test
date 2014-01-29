var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.send('Hello World\n');
});

app.get('/about', function(req, res) {
    res.send('Here is NOTHING')
});

app.get('/test', function(req, res) {  //different routes
    res.send('YES, TEST')
});

app.get('/name/:myname', function(req, res) {
    res.send('My Name is '+ req.params.myname)
});


app.listen(8000);