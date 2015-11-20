// Declare server Globals
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Set Server Listener
var server = app.listen(3000, function () {
  console.log("This app is running on Port 3000")
})

// Use these npm tools
app.use(express.static('public'))
app.use(bodyParser());
app.use(logger('dev'))

// Connect to mongo database
mongoose.connect('mongodb://localhost/museumrApp', function (err) {
  if(err){
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});


//Controllers

//Root
app.get("/", function (req, res) {
});
