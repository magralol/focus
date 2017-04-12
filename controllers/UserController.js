var User = require('../models/User');
var Post = require('../models/Post');

module.exports = {
    getUser: function (req, res) {
        Post.find({user: req.params.username}, {__v: 0}, function (err, docs) {
            if(err){
                res.sendStatus(500);
            }else{
                res.send({
                    user: req.params.username,
                    posts: docs
                });
            }            
        });
    }
}