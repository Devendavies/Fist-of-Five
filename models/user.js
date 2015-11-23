'use strict'
// Initialize from npm tools
const mongoose   = require('mongoose')
var SurveySchema = require('./survey.js').schema;
const bcrypt = require('bcrypt');
// Define the User objects
var UserSchema = new mongoose.Schema({
  name:     String,
  password: String,
  img_url:  String,
  birthday: Date,
  bio:      String,
  surveys: [{ // Users can 'own' posts
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    }]
});

//when password is to be saved, first salt the password (if it has not already been salted)
UserSchema.pre('save', function (next){
  let user = this;

  if (!user.ismodified('password')) return next();
  bcrypt.genSalt(7, (err, salt) =>{
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next (err);
      user.password=hash;
      next();
    })
  })
})
// create functionality to compare the first password to the salted password, return bool.
User.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    callback(null, isMatch);
  });
};

// Store model in var and export to the corresponding controller
var User = mongoose.model('User', UserSchema)
module.exports = User;
