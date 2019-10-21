let mongoose = require('mongoose');

let AlumniSchema = mongoose.Schema({
  firstName: {
    type: String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },  
  username: {
    type : String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  class: {
    type: Number,
    required: true
  },
  profile: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile'
  },
  events: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Event'
  }],
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Recruiter'
  }
});

let Alumni = module.exports = mongoose.model('Alumni', AlumniSchema);
