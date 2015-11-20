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

SurveySchema.pre('save', (next) => {
  let now = new Date();
  // Only set updated_at if there is created_at
  this.updated_at = now;
  if ( !this.created_at ){
    this.created_at = now;
  }
  next();
});

// Store Survey Schema and export to controller
var Painting = mongoose.model('Painting', PaintingSchema);
module.exports = Painting;
