'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = "keepitsecretkeepitsafe";
function auth(req, res){

  var userParams = req.body.user;
  console.log(req.body.user);
  // Validation for undefined email or password
  if (userParams.email == undefined || userParams.password == undefined)
  return res.status(401).send({message: "Please provide correct credentials"});

  User.findOne({ email: userParams.email }, function(err, user) {
    console.log(user);
    /* mongoose method with similar name! */
    user.authenticate(userParams.password, function (err, isMatch) {
      if (err) throw err;
      /* let's check if the password match then generate a token! */
      if (isMatch) {
        return res.status(200).send({message: "Valid Credentials", token: jwt.sign(user, secret)});
      } else {
        return res.status(401).send({message: "Invalid Credentials"});
      }
    });
  });
}

module.exports = {
  auth: auth
}
