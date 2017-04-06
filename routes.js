var express = require('express');
var express = require('express');
var fs = require("fs");

var app = express.Router();



app.get('/', function (req, res) {
  fs.readFile(__dirname + '/views/test.html', 'utf8', function(err, data){
        res.send(data);
  });
});

//User routes
app.post('/user', require('./controllers/UserController').createUser);

//Post routes
app.get('/post/:id', require('./controllers/PostController').getById);
app.get('/post', require('./controllers/PostController').getAll);
app.get('/post/user/:username', require('./controllers/PostController').getUsersPosts);
app.post('/post', require('./controllers/PostController').createPost);

module.exports = app;