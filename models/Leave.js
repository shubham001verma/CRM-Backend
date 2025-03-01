const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    teamMember: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    leaveDays: { type: Number, required: true }, // Auto-calculated
    leaveType: { 
        type: String, 
        enum: ["Paid Leave", "Unpaid Leave", "Sick Leave", "Casual Leave"], 
        required: true 
    },
    leaveReason: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
      createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }
});

module.exports = mongoose.model("Leave", LeaveSchema);
