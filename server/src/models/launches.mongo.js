const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: [true, "Flight number is required"],
    unique: [true, "Duplicate flight numbers are not allowed"],
  },
  launchDate: {
    type: Date,
    required: [true, "We need a launch date..."],
  },
  mission: {
    type: String,
    required: [true, "You must name the mission..."],
  },
  rocket: {
    type: String,
    required: [
      true,
      "I'm taking a little trip in my favorite... rocket ship with no name... ",
    ],
  },
  target: {
    type: String,
  },
  details: {
    type: String,
    trim: true
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
  customers: [String],
});

module.exports = mongoose.model("Launch", launchesSchema);
