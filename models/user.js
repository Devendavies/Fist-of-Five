// Initialize from npm tools
var mongoose   = require('mongoose')
var SurveySchema = require('./surveys.js').schema;

// Define the User objects
var UserSchema = new mongoose.Schema({
  name:     String,
  img_url:  String,
  birthday: Date,
  bio:      String,
  surveys: [{ // Users can 'own' posts
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    }]
});

// Store model in var and export to the corresponding controller
var User = mongoose.model('User', UserSchema)
module.exports = User;
