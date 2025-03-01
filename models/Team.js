const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  role: { type: String, default: "Team" },
  subrole: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  createdAt: { type: Date, default: Date.now },
  address: { type: String },
  image: { type: String },
  profileName: { type: String, default: null },

  // Salary Details
  fixedSalary: { type: Number, required: true }, 
  salaryPerDay: { type: Number, required: true }, 
  finalSalary: { type: Number, default: 0 }, 

  totalPaidLeaves: { type: Number, default: 2 }, // Paid leaves per month
  remainingPaidLeaves: { type: Number, default: 0 }, // Carry-forward leaves

  createdby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Team", TeamMemberSchema);
