var moment = require('moment');
var Post = require('../models/Post');

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
        Post.find({}, {__v: 0 }, function (err, docs) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
                res.send(docs);
            }
        });
        
    },
    getByTag: function (req, res) {
        Post.find({tags: req.params.tag}, {__v: 0}, function (err, docs) {
            if(err){
                //TODO: real error handling
                res.sendStatus(500);
            }else{
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
                res.send(docs);
            }
        });
    },
    createPost: function (req, res) {
        
        if(req.body.postbody.length < 300){ 
            var body = req.body.postbody;
            var tags = body.match(/#[a-z]+/gi);
            var users = body.match(/@[a-z]+/gi);

            if(tags){
                for(var i = 0; i < tags.length; i++){
                    body = body.replace(tags[i], "["+ tags[i] +"](#/tag/"+tags[i].replace("#","")+")");
                    tags[i] = tags[i].replace("#","");
                }
            }

            if(users){
                for(var i = 0; i < users.length; i++){
                    body = body.replace(users[i], "["+ users[i] +"](#/user/"+users[i].replace("@","")+")");
                }
            }

            var post = new Post({ 
                //TODO: Do dynamic with sign in user
                user:       "oskar",
                body:       body,
                tags:       tags,
                date:       moment.utc().format()
            });
            
            post.save(function (err, doc) {
                if(err){   
                    //TODO: Real error handling
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    Post.find({}, {__v: 0 }, function (err, docs) {
                        if(err){
                            //TODO: real error handling
                            res.sendStatus(500);
                        }else{
                            res.send(docs);
                        }
                    });
                }
                
           });

        }
    }
}