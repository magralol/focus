var express = require('express');
var path = require("path");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
mongoose.connect('mongodb://localhost/focus');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', require("./routes"));


var server = require('http').createServer(app);
var io = require('./socket')(server);

server.listen(3000, function () {
    console.log("App listning on: http://localhost:3000");
});

module.exports = app;