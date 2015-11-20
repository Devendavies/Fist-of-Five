var mongoose   = require('mongoose'),
    UserSchema = require('./users.js').schema;

var UserSchema = new mongoose.Schema({
  name:     String,
  img_url:  String,
  birthday: Date,
  bio:      String,
  surveys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    }]
});

var User = mongoose.model('User', UserSchema)
module.exports = User;
