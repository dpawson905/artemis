const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: [true, "Flight number is required"],
    unique: [true, "Duplicate flight numbers are not allowed"],
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: mongoose.Types.ObjectId,
    ref: "Planet",
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
