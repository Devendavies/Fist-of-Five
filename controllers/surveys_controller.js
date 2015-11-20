'use strict';

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let User = ('../models/user.js');
let Survey = ('../models/survey.js');

router.route('/')

      .get((req, res, next) => {
        Survey.find({}, (err, surveys) => {
          if(err) throw err;
          console.log(surveys);
          res.send(surveys);
        });
      });
