const Attendance = require('../models/Attendance');
const Team = require('../models/Team'); // Corrected Model Reference

// ✅ Clock-in Controller
exports.clockIn = async (req, res) => {
    try {
        const { teamMemberId } = req.body;
        const now = new Date();
        const today = new Date().setHours(0, 0, 0, 0);

        // Check if the team member already clocked in today
        const existingAttendance = await Attendance.findOne({
            teamMember: teamMemberId,
            date: { $gte: today }
        });

        if (existingAttendance) {
            if (existingAttendance.clockOut) {
                return res.status(400).json({ message: "You have already clocked out today. Please clock in tomorrow." });
            }
            return res.status(400).json({ message: "You are already clocked in." });
        }

        // Check for late clock-in (after 2 PM)
        const isHalfDay = now.getHours() >= 14;

        const attendance = new Attendance({
            teamMember: teamMemberId,
            date: now,
            clockIn: now,
            status: isHalfDay ? 'Half Day' : 'Present',
            isHalfDay: isHalfDay
        });

        await attendance.save();
        res.status(201).json({ message: "Clock-in successful", attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Clock-out Controller
exports.clockOut = async (req, res) => {
    try {
        const { attendanceId } = req.body;
        const attendance = await Attendance.findById(attendanceId).populate('teamMember');

        if (!attendance) return res.status(404).json({ message: "Attendance not found" });
        if (attendance.clockOut) return res.status(400).json({ message: "You have already clocked out." });

        attendance.clockOut = new Date();
        const hoursWorked = (attendance.clockOut - attendance.clockIn) / (1000 * 60 * 60);
        attendance.totalHours = hoursWorked;

        // Salary Deduction & Paid Leave Handling
        const teamMember = await Team.findById(attendance.teamMember); // Corrected Model Reference
        if (!teamMember) return res.status(404).json({ message: "Team member not found" });

        let salaryDeductionDays = 0;

        if (attendance.status === 'Absent') {
            salaryDeductionDays = 1; // Full-day deduction
        } else if (attendance.status === 'Half Day') {
            salaryDeductionDays = 0.5; // Half-day deduction
        }

        // Check if paid leaves can be used
        if (teamMember.totalPaidLeaves >= salaryDeductionDays) {
            teamMember.totalPaidLeaves -= salaryDeductionDays; // Deduct from paid leaves
            salaryDeductionDays = 0; // No salary cut
        }

        const finalSalaryDeduction = teamMember.salaryPerDay * salaryDeductionDays;
        teamMember.finalSalary -= finalSalaryDeduction;

        await teamMember.save();
        await attendance.save();

        res.json({ message: "Clock-out successful", attendance, salaryDeduction: finalSalaryDeduction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAttendanceStatus = async (req, res) => {
    try {
        const latestAttendance = await Attendance.findOne({ 
            teamMember: req.params.teamId })
          .sort({ clockIn: -1 }) // Get the latest clock-in
          .exec();
    
        res.json(latestAttendance);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch attendance" });
      }
  };

  exports.getAllAttendanceRecords = async (req, res) => {
    try {
        const { teamMemberId } = req.params;
        const { status } = req.query; // Get status from query parameters (optional)

        console.log("Fetching attendance records for:", teamMemberId, "Status:", status);

        let query = { teamMemberId };
        if (status) {
            query.status = status; // Filter by status if provided
        }

        const attendanceRecords = await Attendance.find(query)
            .sort({ status: 1 }) // Sort by status alphabetically (you can modify this if needed)
            .select("clockIn clockOut totalHours status"); // Fetch only necessary fields

        console.log("Filtered Attendance Records:", attendanceRecords);

        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteAttandance = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Attendance.findByIdAndDelete(id);
        if (!leave) {
            return res.status(404).json({ message: 'Attandance not found' });
        }
        res.json({ message: 'Attandance deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  

  