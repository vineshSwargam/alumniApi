let mongoose = require('mongoose');

let JobSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['job', 'internship'],
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  workFromHome: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  closed: {
    type: Boolean,
    default: false
  }
});

let Job = module.exports = mongoose.model('Job', JobSchema);
