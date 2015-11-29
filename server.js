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
app.use(logger('dev'));

// Connect to mongo database
mongoose.connect('mongodb://localhost/fistOfFive', function (err) {
  if(err){
    console.log('Connection error', err);
  } else {
    console.log('Connection successful');
  }
});
let db = mongoose.connection

// Controller Routes
let userRoutes = require('./controllers/users_controller');
let surveyRoutes = require('./controllers/surveys_controller');
let authRoutes = require('./controllers/authorization_controller');
app.use('/users', userRoutes);
app.use('/surveys',surveyRoutes);
app.use('/authorization', authRoutes);

// Socket stuff
let io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
	io.emit('chat message', msg);
  });
});
