let mongoose = require('mongoose');

let ProfileSchema = mongoose.Schema({
  alumni: {
    type: Schema.ObjectId,
    required: true
  },
  bio: {
    type: String,
  },
  education: [{
    instituteName: {
      type: String
    },
    startingYear: {
      type: Number
    },
    graduationYear: {
      type: Number
    },
    degree: {
      type: String
    },
    department: {
      type: String
    }
  }],
  basicInformation: {
    currentLocation: String,
    homeLocation: String,
    birthday: Date,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    relationshipStatus: String
  },
  contact: {
    phone: Number,
    email: String,
    address: String
  },
  expertise: String,
  work: [{
    title: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    from: {
      month: Number,
      year: Number
    },
    to: {
      month: Number,
      year: Number
    },
    current: {
      type: Boolean,
      default: false,
      required: true
    },
    achievements: {
      type: String
    }
  }],
  network: [{
    type: Schema.ObjectId,
    ref: 'Alumni'
  }]
});

let Profile = module.exports = mongoose.model('Profile', ProfileSchema);
