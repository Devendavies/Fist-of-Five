'use strict'
// Define mongoose obj
const mongoose = require('mongoose');
var UserSchema = require('./user.js').schema;

// Define Survey Object
var SurveySchema = new mongoose.Schema({
  topic:       String,
  description: String,
  votes:       [{ zeroes: Number },
                { ones:   Number },
                { twos:   Number },
                { threes: Number },
                { fours:  Number },
                { fives:  Number }],
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
