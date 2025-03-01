const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

exports.applyLeave = async (req, res) => {
    try {
        const { teamMemberId, startDate, endDate, leaveType,  leaveReason, createdby } = req.body;

        // Validate request
        if (!teamMemberId || !startDate || !endDate || !leaveType || !leaveReason) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Calculate number of leave days
        const leaveDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

        // Save leave request
        const leave = new Leave({
            teamMember: teamMemberId,
            startDate,
            endDate,
            leaveDays,
            leaveType,
            leaveReason,
            createdby,
            status: "Pending"
        });

        await leave.save();
        res.json({ message: "Leave request submitted", leave });

    } catch (error) {
        console.error("Error applying leave:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.approveLeave = async (req, res) => {
    try {
        const { leaveId, status } = req.body;
        if (!leaveId || !["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Update leave status
        const leave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });

        if (status === "Approved") {
            // Mark attendance as "Leave" for leave period
            for (let d = new Date(leave.startDate); d <= new Date(leave.endDate); d.setDate(d.getDate() + 1)) {
                await Attendance.findOneAndUpdate(
                    { teamMember: leave.teamMember, date: d },
                    { status: "Leave", leaveType: leave.leaveType, isPaidLeave: leave.leaveType === "Paid Leave" },
                    { upsert: true, new: true }
                );
            }
        }

        res.json({ message: `Leave ${status}`, leave });

    } catch (error) {
        console.error("Error approving leave:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getLevaeRequests = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("teamMember");
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getLeavbyTeamMemberId = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.find({teamMember:id}).populate("teamMember");

    if (!leave) {
      return res.status(404).json({ message: 'leave not found' });
    }
    res.status(200).json({ leave });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave', details: error.message });
  }
};
exports.getLeavbyUserId = async (req, res) => {
    try {
      const { id } = req.params;
      const leave = await Leave.find({createdby:id}).populate("teamMember");

  
      if (!leave) {
        return res.status(404).json({ message: 'leave not found' });
      }
      res.status(200).json({ leave });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leave', details: error.message });
    }
  };
exports.deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findByIdAndDelete(id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        res.json({ message: 'Leave deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}