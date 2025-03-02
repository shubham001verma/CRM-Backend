const Salary = require("../models/Salary");
const Attendance = require("../models/Attendance");
const Team = require("../models/Team");
const Leave = require("../models/Leave");

exports.calculateSalary = async (req, res) => {
  try {
    const { createdby, teamMemberId, month, year } = req.body;

    // Get Team Member details
    const teamMember = await Team.findById(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    const totalDays = new Date(year, month, 0).getDate(); // Total days in the month
    const salaryPerDay = teamMember.salaryPerDay;
    let availablePaidLeaves = teamMember.remainingPaidLeaves || teamMember.totalPaidLeaves || 0;

    // Fetch Attendance records for the month
    const attendances = await Attendance.find({
      teamMember: teamMemberId,
      date: { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${month + 1}-01`) }
    });

    let presentDays = 0;
    let halfDays = 0;
    let absentDays = 0;

    attendances.forEach((attendance) => {
      if (attendance.status === "Present") presentDays++;
      if (attendance.status === "Half Day") halfDays++;
      if (attendance.status === "Absent") absentDays++;
    });

    // Fetch Approved Leaves for the month
    const leaves = await Leave.find({
      teamMember: teamMemberId,
      startDate: { $gte: new Date(`${year}-${month}-01`) },
      endDate: { $lt: new Date(`${year}-${month + 1}-01`) },
      status: "Approved"
    });

    let paidLeavesUsed = 0;
    let unpaidLeaveDays = 0;

    leaves.forEach((leave) => {
      if (leave.leaveType === "Paid Leave") {
        paidLeavesUsed += leave.leaveDays;
      } else {
        unpaidLeaveDays += leave.leaveDays;
      }
    });

    // Adjust paid leaves based on available balance
    const excessUnpaidLeaves = Math.max(0, paidLeavesUsed - availablePaidLeaves);
    paidLeavesUsed = Math.min(paidLeavesUsed, availablePaidLeaves); // Use only available paid leaves
    unpaidLeaveDays += excessUnpaidLeaves; // Convert excess paid leaves into unpaid leaves

    // Calculate deductionDays (Absent + Unpaid Leaves)
    const deductionDays = absentDays + unpaidLeaveDays;

    // Calculate Final Salary
    const finalSalary =
      (presentDays * salaryPerDay) +
      (halfDays * (salaryPerDay / 2)) +
      (paidLeavesUsed * salaryPerDay) - 
      (deductionDays * salaryPerDay); // Deduct unpaid leaves & absents

    // **Update remaining paid leaves**
    const remainingPaidLeaves = Math.max(0, availablePaidLeaves - paidLeavesUsed);

    // **Update Team Member's final salary and remaining paid leaves**
    await Team.findByIdAndUpdate(teamMemberId, { finalSalary, remainingPaidLeaves });

    // Save Salary Record
    const salary = new Salary({
      teamMember: teamMemberId,
      createdby,
      month,
      year,
      totalDays,
      presentDays,
      halfDays,
      paidLeavesUsed,
      unpaidLeaveDays,
      absentDays,
      deductionDays,
      totalPaidLeavesAtThatTime: availablePaidLeaves,
      remainingPaidLeaves,
      finalSalary
    });

    await salary.save();
    res.status(201).json({ 
      message: "Salary calculated successfully", 
      salary, 
      updatedTeamMember: { finalSalary, remainingPaidLeaves } 
    });

  } catch (error) {
    console.error("Error calculating salary:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};










// ✅ Get all salaries
exports.getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('teamMember', 'name email');
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSalaryByUserId = async (req, res) => {
  try {
      const { userId } = req.params;
      
      if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      const salary = await Salary.find({ createdby: userId }).populate('teamMember', 'name email');

      if (!salary || salary.length === 0) {
          return res.status(404).json({ message: "No salary records found for this user" });
      }

      res.json(salary);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
// ✅ Mark salary as paid
exports.markSalaryAsPaid = async (req, res) => {
    try {
        const { salaryId } = req.body;
        const salary = await Salary.findById(salaryId);

        if (!salary) return res.status(404).json({ message: "Salary not found" });

        salary.status = 'Paid';
        await salary.save();
        res.json({ message: "Salary marked as paid" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteSalary = async (req, res) => {
    try {
        const { salaryId } = req.params;
        const salary = await Salary.findById(salaryId);

        if (!salary) return res.status(404).json({ message: "Salary record not found" });

        await Salary.findByIdAndDelete(salaryId);
        res.json({ message: "Salary record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSalaryByTeamId = async (req, res) => {

  try {
      const id = req.params.id;
      const salary = await Salary.find({teamMember:id}).populate('teamMember')
      if (!salary) {
          return res.status(404).json({ message: 'salary not found' });
      }
      res.status(200).json(salary);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching salary', error: error.message });
  }
};
