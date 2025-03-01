const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,  ref: "User" },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String }
});

module.exports = mongoose.model("Event", eventSchema);