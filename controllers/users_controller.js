'use strict';
//route requirements and secret
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = require('../models/user.js');
let Survey = require('../models/survey.js')
const secret = "keepitsecretkeepitsafe";
//the following are the routes for '/user'
router.route('/')
//get and find a user by tbd parameters ( will be inside {} in User.find)
      .get((req, res, next) => {
        User.find({}, (err, users) => {
          if(err) throw err;
          console.log(users);
          res.send(users);
        });
      })
// /user post route...allows reation of new users, takes in a number of values tbd by the html form
      .post(function(req, res){
        console.log(req.body);
        var user = new User(req.body.user);
        user.save(function(err){
          if(err){
            console.log(err);
          } else {
            console.log(user);
            res.send(user);
          }
        });
      });
//single-user specific routes including update and delete
  router.route('/:id')
        .get((req, res, next) => {
          User.findById(req.params.id).exec(function(err, user){
            if(err) throw err;
            res.send(user);
          });
        })
//update user...finds user by his id...sets new infoby req.body
        .put((req, res, next) => {
          User.findOneAndUpdate({_id: req.params.id}, { $set: req.body}, function(err, user){
            res.send(user);
          });
        })
//this route deletes and user in user table based on his id.
        .delete((req, res, next) => {
          User.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) console.log(err);
            alert('USER DELETED')
            res.send('User Deleted');
          });
        });


module.exports = router;


// token generation code.
