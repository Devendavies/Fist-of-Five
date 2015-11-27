'use strict';
// Routes requirements
let express  = require('express');
let mongoose = require('mongoose');
let router   = express.Router();
let User     = require('../models/user.js');
let Survey   = require('../models/survey.js');
const expressJwt = require('express-jwt');

router.route('/')

// Check for token authentiction
// .all(expressJwt({
//   secret: secret,
//   userProperty: 'auth'
// }))

// Retrieve and display all of the surveys
  .get((req, res, next) => {
    Survey.find({}, (err, surveys) => {
      if(err) throw err;
      console.log(surveys);
      res.send(surveys);
    });
  })

// Create a new survey...owner_id yet to be determined how it will be passed in
  .post(function(req, res){
    console.log(req.body);
    console.log(Survey);
    var newSurvey = new Survey({
      topic: req.body.topic,
      description: req.body.description
    });


// user.owns.push(newSurvey.id);
    newSurvey.save(function(err){
      if(err){
        console.log(err);
        throw err;
      } else {
      console.log('NEW SURVEY SAVED');
      console.log(newSurvey);
      res.status(200);
      }
    });
  })

//routes using specific surveys
  router.route('/:id')
//retrieve and display a survey based on its id param
  .get(function(req, res, next){
    Survey.findById(req.params.id).exec(function(err, survey){
      if(err) throw err;
    res.send(survey);
    });
  })

//find and update a survey based on its id param
  .put(function(req, res, next){
    Survey.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, function(err, survey){
      if(err) throw err;
      res.send(survey);
    });
  })

//find and delete a survey based on its id param
  .delete(function(req, res, next){
    Survey.findOneAndRemove({_id: req.params.id}, function(err){
      if(err) throw err;
      alert('survey deleted');
      res.send('survey deleted');
    });
  })

// Update a survey with a new vote
  // .vote((req, res, next) => {
  //   Survey.findOneAndUpdate({_id: req.body.id}, {$set: req.body}, function(err, survey){
  //     if(err) throw err;
  //     db.surveys.update({'survey._id':req.body.votes[].value()}, {$inc:{"votes.$.zeroes"}})
  //     res.send(survey);
  //   });
  // })

module.exports = router;
