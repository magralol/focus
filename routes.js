var express = require('express');
var express = require('express');
var fs = require('fs');

var auth = require('./controllers/AuthController').authenticate;

var app = express.Router();



app.get('/', function (req, res) {
  fs.readFile(__dirname + '/views/index.html', 'utf8', function(err, data){
        res.send(data);
  });
});

//User routes
app.post('/register', require('./controllers/AuthController').register);
app.post('/signin', require('./controllers/AuthController').signin);
app.put('/user/filter', require('./controllers/FilterController').setFilter);

//Post routes
app.get('/post/:id', require('./controllers/PostController').getById);
app.get('/post', require('./controllers/PostController').getAll);
app.get('/post/user/:username', require('./controllers/PostController').getUsersPosts);
app.get('/post/tag/:tag', require('./controllers/PostController').getByTag);
app.post('/post', require('./controllers/PostController').createPost);

//User routes
app.get('/user/:username', require('./controllers/UserController').getUser);

//Filter routes
app.get('/filter', require('./controllers/FilterController').getFilters);
app.post('/filter', require('./controllers/FilterController').createFilter);
app.put('/filter/:id', require('./controllers/FilterController').updateFilter);

app.post('/test', function (req, res) {
  
  res.send({});
});

module.exports = app;