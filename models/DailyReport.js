const mongoose = require("mongoose");

const dailyReportSchema = new mongoose.Schema({
  teamMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team', 
    required: true,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  },
  tasksCompleted: {
    type: String, 
    required: true,
  },
  issuesFaced: {
    type: String,
    default: '',
  },
  nextDayPlan: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed'],
    default: 'Pending',
  },
    createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }
});

module.exports = mongoose.model('DailyReport', dailyReportSchema);

