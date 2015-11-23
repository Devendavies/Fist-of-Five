'use strict'
// Declare server Globals
let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let expressJWT = require('express-jwt');
let jwt = require('jsonwebtoken');

// Set Server Listener
let server = app.listen(3000, function () {
  console.log("This app is running on Port 3000")
})
// Use these npm tools

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public' )))

// Connect to mongo database
mongoose.connect('mongodb://localhost/fistOfFive', function (err) {
  if(err){
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});
let db = mongoose.connection
// make a secret.
const secret = "keepitsecretkeepitsafe";

// Controller Routes
let userRoutes = require('./controllers/users_controller');
let surveyRoutes = require('./controllers/surveys_controller');
app.use('/users', userRoutes);
app.use('/surveys', surveyRoutes);
