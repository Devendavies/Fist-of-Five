// Define mongoose obj
var mongoose = require('mongoose');

// Define Survey Object
var SurveySchema = new mongoose.Schema({
  topic:       String,
  description: String,
  votes:       Number,
  voters:      [Number],
  created_at:  Date,
  updated_at:  Date
});

// Store Survey Schema and export to controller
var Painting = mongoose.model('Painting', PaintingSchema);
module.exports = Painting;
