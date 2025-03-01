const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  teamMember: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  date: { type: Date, required: true },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  totalHours: { type: Number, default: 0 }, // Auto-calculated

  status: {
    type: String,
    enum: ["Present", "Absent", "Half Day"],
    default: "Present"
}, 
leaveType: { 
  type: String, 
  enum: ["Paid Leave", "Unpaid Leave", "Sick Leave", "Casual Leave", "None"],
  default: "None"
},

  isPaidLeave: { type: Boolean, default: false }, // True if paid leave is used
  isHalfDay: { type: Boolean, default: false }, // True if employee checked in late
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
