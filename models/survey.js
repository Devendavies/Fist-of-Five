'use strict'
// Define mongoose obj
const mongoose = require('mongoose');
var UserSchema = require('./user.js').schema;

// Define Survey Object
var SurveySchema = new mongoose.Schema({
  topic:       String,
  description: String,
  votes:       [{ fist0: Number },
                { fist1:   Number },
                { fist2:   Number },
                { fist3: Number },
                { fist4:  Number },
                { fist5:  Number }],
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
let Survey = module.exports = mongoose.model('Survey', SurveySchema);


module.exports.addVote = function(id, fistType, callback) {
  Survey.findById(id, function(err, survey) {
      if(err) throw err;

      // res.send(survey)

      switch(fistType) {
        case 'fist0':
          survey.votes.fist0 += 1;
          break;
        case 'fist 1':
          survey.votes.fist1 += 1;
          break;
        case 'fist 2':
          survey.votes.fist2 += 1;
          break;
        case 'fist 3':
          survey.votes.fist3 += 1;
          break;
        case 'fist 4':
          survey.votes.fist4 += 1;
          break;
        case 'fist 5':
          survey.votes.fist5 += 1
      }
    survey.save(function(err) {
      if(err) throw err;
      

    });
  });
}
