let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'Alumni',
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  hours: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  minutes: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  image: {
    type: String,
  }
});

let Event = module.exports = mongoose.model('Event', EventSchema);
