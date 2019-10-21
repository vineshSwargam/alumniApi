let mongoose = require('mongoose');

let ApplicantSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  applier: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
});

let Applicant = module.exports = mongoose.model('Applicant', ApplicantSchema);
