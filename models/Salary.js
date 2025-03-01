const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  teamMember: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  month: { type: String, required: true }, // Example: "2024-02"
  year: { type: Number, required: true }, // Ensure year is included
  totalDays: { type: Number, required: true }, // Total working days in the month
  presentDays: { type: Number, required: true },
  halfDays: { type: Number, required: true },
  paidLeavesUsed: { type: Number, required: true },
  deductionDays: { type: Number, required: true },
  totalPaidLeavesAtThatTime: { type: Number, required: true }, // Ensure this exists
  finalSalary: { type: Number, required: true },
status:{
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },

  createdAt: { type: Date, default: Date.now },
    createdby:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', }
});

module.exports = mongoose.model("Salary", SalarySchema);
