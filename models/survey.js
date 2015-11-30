'use strict'
// Define mongoose obj
const mongoose = require('mongoose');
var UserSchema = require('./user.js').schema;

// Define Survey Object
var SurveySchema = new mongoose.Schema({
  topic:       String,
  description: String,
  votes:       [Number,
                Number,
                Number,
                Number,
                Number,
                Number],
  voters:      [Number],
  owner_id:    Number,
  created_at:  Date,
  updated_at:  Date
});

// Set creation or update date
// SurveySchema.pre('save', next) => {
//   let now = new Date();
//   // Only set updated_at if there is created_at
//   this.updated_at = now;
//   if ( !this.created_at ){
//     this.created_at = now;
//   }
//   next();
// });

// Store Survey Schema and export to controller
// var Survey = mongoose.model('Survey', SurveySchema);
module.exports = mongoose.model('Survey', SurveySchema);

module.exports.addVote = function(id, fistType, callback) {
  Survey.findById(id, function(err, survey) {
      if(err) throw err;

      // res.send(survey)

      switch(fistType) {
        case 'fist0':
          survey.votes[0] += 1;
          break;
        case 'fist1':
          survey.votes[1] += 1;
          break;
        case 'fist2':
          survey.votes[2] += 1;
          break;
        case 'fist3':
          survey.votes[3] += 1;
          break;
        case 'fist4':
          survey.votes[4] += 1;
          break;
        case 'fist5':
          survey.votes[5] += 1;
      }
    survey.save(function(err) {
      if(err) throw err;
    });
  });
}
