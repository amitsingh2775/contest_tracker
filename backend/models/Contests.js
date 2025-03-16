const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
  contestId: { type: Number }, // Added for CLIST API
  platform: { type: String, required: true },
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  url: { type: String, required: true, unique: true },
  youtubeUrl: { type: String }
});

module.exports = mongoose.model('Contest', ContestSchema);