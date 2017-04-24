var crypto = require('crypto');
var sanitizer = require('sanitizer');

var User = require('../models/User');
var jwt = require('jsonwebtoken');

var secret = crypto.createHmac('sha256', new Date().toString() + new Date().toString()).update(new Date().toString() + new Date().toString()).digest('hex');

module.exports = {
    register: function (req, res) {
        if(req.body.email.length < 100 && req.body.password.length < 100 && req.body.username.length < 100){
            
            var user = new User({ 
                username:       sanitizer.sanitize(req.body.username),
                password:       User.generateHash(req.body.password),
                email:          sanitizer.sanitize(req.body.email)
            });
            
            user.save(function (err, doc) {
                if(err){   
                    //TODO: Real error handling
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    res.sendStatus(200);
                }
                
           });
        }
    },
    signin: function (req, res) {
        User.findOne({email: req.body.email}, { __v: 0 }, function(err, doc) {

            if(err){
                res.sendStatus(500);
            }else{
                if(User.validatePassword(doc.password, User.generateHash(req.body.password))){
                    var token = {id: doc._id};
                    res.send(jwt.sign(token, secret, { expiresIn: '1d' }));
                }else{
                    res.send({});
                }
            }

        });
    },
    authenticate: function (req, res, next) {
        if(req.header("Authorization")){
            var token = req.header("Authorization").replace("Bearer ", "");
            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    res.sendStatus(401);
                }else{
                    req.user = { id: decoded.id };
                    next();
                } 
            });
        }
    }
}