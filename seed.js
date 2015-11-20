'use strict'
var User = require('./models/users.js'),
  Survey = require('./models/surveys.js'),
  mongoose = require('mongoose');

//Connect to mongodb
mongoose.connect('mongodb://localhost/ User-DB-Path-NAME-HERE', function(err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var names = ['Deven Davies', 'Jeffery Macks'];
var passwords = ['password'];
var photo = [
  "http://i.telegraph.co.uk/multimedia/archive/01773/pablo-deven_1773978b.jpg",
  "http://www.artcyclopedia.org/art/van-gogh-self.jpg"
            ]
var birthday = [1881, 1853]
var bio = [
  "Tech Savy gaming savant.",
  "Dashing, controller killin, m&m lovin Web Dev."
          ]
var owns = [];

var surveys = [
  // No starting surveys init'd ["The Starry Night", "Cafe Terrace at Night"]
              ]

var deven = new User({
  name: names[0],
  password: passwords[0],
  img_url: photo[0],
  birthday: birthday[0],
  bio: bio[0],
  surveys: owns[0]
});

deven.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    // var deven1 = new User({
    //   title: surveys[0][0],
    //   img_url: survey_photo[0][0],
    //   year_made: year_made[0][0]
    // });
    // deven1.save(function(err) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     deven.surveys.push(deven1._id);
    //     var deven2 = new Survey({
    //       title: surveys[0][1],
    //       img_url: survey_photo[0][1],
    //       year_made: year_made[0][1]
    //     });
    //   }
    // });
  }
});

var jeff = new User({
  name: names[1],
  password: passwords[0],
  img_url: photo[1],
  birthday: birthday[1],
  bio: bio[1],
  surveys: owns[1]
});

jeff.save(function(err) {
  if (err) {
    console.log(err)
  } else {
    // var p3 = new Survey({
    //   title: surveys[1][0],
    //   img_url: survey_photo[1][0],
    //   year_made: year_made[1][0]
    // });
    // p3.save(function(err) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     jeff.surveys.push(p3._id)
    //     var p4 = new Survey({
    //       title: surveys[1][1],
    //       img_url: survey_photo[1][1],
    //       year_made: year_made[1][1]
    //     });
    //
    //   }
    // });
  }
});
