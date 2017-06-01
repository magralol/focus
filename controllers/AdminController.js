var fs = require('fs');
var socket = require('../socket')();
var User = require('../models/User');
var Post = require('../models/Post');

module.exports = {
    index: function (req, res) {
        
        fs.readFile(__dirname + '/../views/admin.html', 'utf8', function(err, data){
                res.send(data);
        });

    },
    removepost: function (req, res) {

        User.findById(req.user.id, function (err, doc) {
            if(err){
                res.sendStatus(500);
            }else{
                if(doc.email == "magralool@gmail.com"){
                    
                    Post.remove({ _id: req.params.id }, function (err) {
                        if(err){
                            res.sendStatus(500);
                        }else{
                            socket.emit("new post", true);
                            res.send(200);
                        }
                    });


                }else{
                    res.sendStatus(401)
                }
            }
        });
        
    }
}