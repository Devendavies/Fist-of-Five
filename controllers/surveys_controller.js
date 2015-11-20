'use strict';

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = ('../models/user.js');
let Survey = ('../models/survey.js');

router.route('/')
//will retrieve and display all of the surveys
      .get((req, res, next) => {
        Survey.find({}, (err, surveys) => {
          if(err) throw err;
          console.log(surveys);
          res.send(surveys);
        });
      });
//will create a new survey...owner_id yet to be determined how it will be passed in
      .post((req, res, next) => {
        let newSurvey = new Survey({
          topic: topic,
          description: description,
          owner_id: owner_id
        });
          // user.owns.push(newSurvey.id);
          newSurvey.save((err) => {
            if(err) throw err;
            console.log('NEW SURVEY SAVED');
            alert('you did it! the survey is real');
          });
          res.send('new survey created')
      });
//routes using specific surveys
  router.route('/:id')
//retrieve and display a survey based on its id param
        .get((req, res, next) => {
          Survey.findById(req.params.id).exec(function(err, survey){
            if(err) throw err;
            res.send(survey);
          });
        });
//find and update a survey based on its id param
        .put((req, res, next) => {
          Survey.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, function(err, survey){
            if(err) throw err;
            res.send(survey);
          });
        });
//find and delete a survey based on its id param 
        .delete((req, res, next) => {
          Survey.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) throw err;
            alert('survey deleted');
            res.send('survey deleted');
          });
        });


module.exports = router;
