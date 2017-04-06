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
            var post = new Post({ 
                //TODO: Do dynamic with sign in user
                user:       "oskar",
                body:       req.body.postbody,
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