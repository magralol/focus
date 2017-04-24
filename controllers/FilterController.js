var User = require('../models/User');
var Filter = require('../models/Filter');

module.exports = {
    createFilter: function (req, res) {
        if(req.body.name.length < 100){
            var filter = new Filter({
                user:           "oskar",
                name:           req.body.name,
                allawedtags:    req.body.tags,
                active:         false
            });

            filter.save(function (err, docs) {
                if(err){
                    //TODO: real Error Handling
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    res.send(docs);
                }
            });

        }
    },
    getFilters: function (req, res) {
        var user = "58e61f9d567e801443c6d4db";
        User.findById(user, {__v: 0, password: 0}, function (err, doc) {
            if(err){
                //TODO Error handling
                res.sendStatus(500);
            }else{
                Filter.find({user: doc.username}, {__v: 0}, function (err, docs) {
                    if(err){
                        //TODO Error handling
                        res.sendStatus(500);
                    }else{
                        res.send(docs);
                    }
                });
            }
        });
        
    },
    updateFilter: function (req, res) {
        var user = "58e61f9d567e801443c6d4db";
        User.findById(user, {__v: 0, password: 0}, function (err, doc) {
            if(err){
                //TODO error handling
                res.sendStatus(500);
            }else{
                Filter.update({_id: req.params.id, user: doc.username}, {allawedtags: req.body.tags}, function (err, doc) {
                    if(err){
                        //TODO Error handling
                        res.sendStatus(500);
                    }else{
                        res.sendStatus(200);
                    }
                });
            }
        });
    },
    setFilter: function (req, res) {
        var user = "58e61f9d567e801443c6d4db";
        User.update({_id: user}, {defaultfilter: req.body.filter}, function (err, doc) {
            if(err){
                //TODO error handling
                console.log(err);
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });
    },
    activateFilter: function (req, res) {
        var user;
        User.findById(req.user.id, function (err, doc) {
            user = doc.username;
            if(err){
                //TODO: real error handling
                console.log(err);
                res.sendStatus(500);
            }else{
                Filter.update({user: user, active: true}, {active: false}, function (err, status) {
                    if(err){
                        //TODO error handling
                        console.log(err);
                        res.sendStatus(500);
                    }else{

                        Filter.findOneAndUpdate({_id: req.params.id, user: user}, {active: true}, { new: true },function(err, doc){  
                            if(err){
                                //TODO error handling
                                console.log(err);
                                res.sendStatus(500);
                            }else{

                                Filter.find({user: user}, {__v:0}, function (err, docs) {
                                    if(err){
                                        //TODO error handling
                                        console.log(err);
                                        res.sendStatus(500);
                                    }else{
                                        //Filter.find({});
                                        res.send(docs);
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