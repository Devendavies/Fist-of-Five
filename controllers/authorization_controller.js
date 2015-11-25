'use strict';
//route requirements and secret
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = require('../models/user.js');
let Survey = require('../models/survey.js');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = "keepitsecretkeepitsafe";

router.route('/')

      .post(function(req, res){
        var userParams = req.body;
        console.log('this is req.body', userParams.password)

        if(userParams.name == undefined || userParams.password == undefined)
        return res.status(401).send({message: 'Incorrect Name or Password, Please Try Again'});

        User.findOne({ name: userParams.name }, function(err, user){
          if(err) throw err;
          console.log(user)
          if (!user){
            console.log ('whatre you trying to pull')
          } else {user.authenticate(userParams.password, function(err, isMatch){
           console.log("success");
            if(isMatch){
              console.log("success");
              return res.status(200).send({message: 'Success! Welcome', token: jwt.sign(user, secret)});
            } else {
              return res.status(401).send({message: 'Incorrect Name or Password, PLease Try Again'});
            };
          });
        };
        });
      });

module.exports = router;
