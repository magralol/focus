var User = require('../models/User');
var Post = require('../models/Post');

module.exports = {
    getUser: function (req, res) {
        Post.find({user: req.params.username}, {__v: 0}, function (err, docs) {
            if(err){
                res.sendStatus(500);
            }else{
                docs = docs.sort(function(a,b) { 
                    return new Date(b.date).getTime() - new Date(a.date).getTime() 
                });
                res.send({
                    user: req.params.username,
                    posts: docs
                });
            }            
        });
    },
    getUserName: function (req, res) {
        User.findById(req.user.id, {__v:0, password: 0}, function (err, doc) {
           if(err){
               /* TODO: Real error handling */
               res.sendStatus(500);
           }else{
               res.send({username: doc.username});
           }
        });
    }
}