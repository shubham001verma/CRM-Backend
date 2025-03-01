const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project',},
   client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  startDate:{type: String },
  Dedline:{ type: String,},
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  lables:{
    type: String,
  },
  clientnotes:{
    type: String,
  },
  teamnotes:{
    type: String,
  },
   createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);