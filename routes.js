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

//Auth routes
app.post('/register', require('./controllers/AuthController').register);
app.post('/signin', require('./controllers/AuthController').signin);
app.put('/user/filter', auth, require('./controllers/FilterController').setFilter);
app.get('/auth/check', auth, function (req, res) {
  res.sendStatus(200);
});

//Post routes
app.get('/post/:id', auth, require('./controllers/PostController').getById);
app.get('/post', auth, require('./controllers/PostController').getAll);
app.get('/post/user/:username', auth, require('./controllers/PostController').getUsersPosts);
app.get('/post/tag/:tag', auth, require('./controllers/PostController').getByTag);
app.post('/post', auth, require('./controllers/PostController').createPost);

//User routes
app.get('/user/:username', auth, require('./controllers/UserController').getUser);
app.get('/username', auth, require('./controllers/UserController').getUserName);

//Filter routes
app.get('/filter', auth, require('./controllers/FilterController').getFilters);
app.post('/filter', auth, require('./controllers/FilterController').createFilter);
app.put('/filter/:id', auth, require('./controllers/FilterController').updateFilter);
app.get('/filter/activate/:id', auth, require('./controllers/FilterController').activateFilter);

module.exports = app;