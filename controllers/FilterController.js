var sanitizer = require('sanitizer');

var User = require('../models/User');
var Filter = require('../models/Filter');

module.exports = {
    createFilter: function (req, res) {
        if(req.body.name.length < 100){
            User.findById(req.user.id, function (err, doc) {
                if(err){
                    //TODO: real Error Handling
                    console.log(err);
                    res.sendStatus(500);
                }else{
                    
                    var filter = new Filter({
                        user:           doc.username,
                        name:           sanitizer.sanitize(req.body.name),
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
            });

        }
    },
    getFilters: function (req, res) {
        User.findById(req.user.id, {__v: 0, password: 0}, function (err, doc) {
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
        User.findById(req.user.id, {__v: 0, password: 0}, function (err, doc) {
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
    removeFilter: function (req, res) {
      User.findById(req.user.id, function (err, doc) {
          if(err){
              //TODO Error handling
              res.sendStatus(500);
          }else{
              Filter.findOneAndRemove({_id: req.params.id, user: doc.username}, function(err, doc){
                if(err){
                    //TODO Error handling
                    res.sendStatus(500);
                }else{
                    if(doc){
                        Filter.find({user: doc.username}, {__v: 0}, function (err, docs) {
                            if(err){
                                //TODO Error handling
                                res.sendStatus(500);
                            }else{
                                res.send(docs);
                            }
                        });
                    }else{
                        res.sendStatus(401)
                    }
                }
              });
          }
      });  
    },
    setFilter: function (req, res) {
        User.update({_id: req.user.id}, {defaultfilter: req.body.filter}, function (err, doc) {
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