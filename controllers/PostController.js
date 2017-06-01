var moment = require('moment');
var sanitizer = require('sanitizer');

var Post = require('../models/Post');
var Filter = require('../models/Filter');
var User = require('../models/User');

var socket = require('../socket')();

module.exports = {
    getById: function (req, res) {
        Post.findById(req.params.id, { __v: 0 }, function (err, doc) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
                res.send(doc);
            }
        });
    },
    getAll: function (req, res) {
        User.findById(req.user.id, function (err, doc) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
                Filter.findOne({user: doc.username, active: true}, function (err, doc) {
                    if(err){
                        //TODO: real error handling
                        res.sendStatus(500);
                    }else{
                        var query;
                        if(doc){
                            query = {tags: { $in : doc.allawedtags }};
                        }else{
                            query = {};
                        }

                        Post.find(query, {__v: 0 }, function (err, docs) {
                            if(err){
                                //TODO: real error handling
                                res.sendStatus(500);
                            }else{
                                docs = docs.sort(function(a,b) {
                                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                                });

                                res.send(docs);
                            }
                        });
                    }
                });
            }
        });
        /*Post.find({}, {__v: 0 }, function (err, docs) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
                docs = docs.sort(function(a,b) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                });
                res.send(docs);
            }
        });*/

    },
    getByTag: function (req, res) {
        Post.find({tags: req.params.tag}, {__v: 0}, function (err, docs) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
                docs = docs.sort(function(a,b) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                });
                res.send(docs);
            }
        });
    },
    //Might not need, its in /user/:username now
    getUsersPosts: function (req, res) {
        Post.find({user: req.params.username}, {__v: 0 }, function (err, docs) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
                docs = docs.sort(function(a,b) {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                });
                res.send(docs);
            }
        });
    },
    createPost: function (req, res) {

        var username;
        var resentpost;
        if(req.body.postbody.length < 300){ 
            var body = req.body.postbody;
            var tags = body.match(/#[a-z]+/gi);
            var users = body.match(/@[a-z]+/gi);

            if(tags){
                for(var i = 0; i < tags.length; i++){
                    body = body.replace(tags[i], "["+ tags[i] +"](#/)");
                    tags[i] = tags[i].replace("#","");
                }
            }

            if(users){
                for(var i = 0; i < users.length; i++){
                    body = body.replace(users[i], "["+ users[i] +"](#/user/"+users[i].replace("@","")+")");
                }
            }

            User.findById(req.user.id, function (err, doc) {
                    if(err){
                        //TODO: Real error handling
                        console.log(err);
                        res.sendStatus(500);
                    }else{
                        username = doc.username;

                        var post = new Post({ 
                            user:       doc.username,
                            body:       sanitizer.sanitize(body),
                            tags:       tags,
                            date:       moment.utc().format()
                        });

                        post.save(function (err, doc) {
                            if(err){
                                //TODO: Real error handling
                                console.log(err);
                                res.sendStatus(500);
                            }else{
                                resentpost = doc;
                                User.findById(req.user.id, function (err, doc) {
                                    if(err){
                                        //TODO: real error handling
                                        res.sendStatus(500);
                                    }else{
                                        Filter.findOne({user: doc.username, active: true}, function (err, doc) {
                                            if(err){
                                                //TODO: real error handling
                                                res.sendStatus(500);
                                            }else{
                                                var query;
                                                if(doc){
                                                    query = {tags: { $in : doc.allawedtags }};
                                                }else{
                                                    query = {};
                                                }
                                                
                                                Post.find(query, {__v: 0 }, function (err, docs) {
                                                    if(err){
                                                        //TODO: real error handling
                                                        res.sendStatus(500);
                                                    }else{
                                                        docs = docs.sort(function(a,b) {
                                                            return new Date(b.date).getTime() - new Date(a.date).getTime()
                                                        });
                                                        socket.emit("new post", true);
                                                        socket.emit("new post user " + username, resentpost);
                                                        
                                                        res.sendStatus(200);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }

                    });
                    }
            });

        }
    }
}
