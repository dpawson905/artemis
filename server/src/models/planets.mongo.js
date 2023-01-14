const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: [true, 'Planet must be defined']
  }
}, { timestamps: true });

module.exports = mongoose.model("Planet", planetSchema);