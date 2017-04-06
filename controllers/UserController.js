var User = require('../models/User');

module.exports = {
    createUser: function (req, res) {
        if(req.body.email.length < 100 && req.body.password.length < 100 && req.body.username.length < 100){
            
            var user = new User({ 
                username:   req.body.username,
                password:   User.generateHash(req.body.password),
                email:      req.body.email
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
    }
}