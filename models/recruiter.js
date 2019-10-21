let mongoose = require('mongoose');

//Article Schema

let RecruiterSchema = mongoose.Schema({
  alumni: {
    type: mongoose.Schema.ObjectId,
    ref: 'Alumni'
  },
  organizationName: {
    type: String,
    required: true
  },
  aboutOrganization: {
    type: String,
    required: true
  },
  jobOpenings: {
    type: String,
    required: false
  },
  hiringCriteria: {
    type: Date,
    required: true
  },
  contact: {
    name: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  }
});

let Recruiter = module.exports = mongoose.model('Recruiter', RecruiterSchema);
