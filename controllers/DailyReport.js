
const DailyReport = require('../models/DailyReport'); 

exports.submitReport = async (req, res) => {
  try {
   
    const {teamMember, tasksCompleted, issuesFaced, nextDayPlan, createdby } = req.body;

    const newReport = new DailyReport({
      teamMember, 
      tasksCompleted,
      issuesFaced,
      nextDayPlan,
      createdby
    });

    await newReport.save();
    res.status(201).json({ message: 'Daily report submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while submitting report' });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    
    const reports = await DailyReport.find().populate('teamMember', 'name email');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
};

exports.markReportReviewed = async (req, res) => {
  try {
   

    const report = await DailyReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });

    report.status = 'Reviewed';
    await report.save();

    res.status(200).json({ message: 'Report marked as reviewed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.deleteReport = async (req, res) => {
    try {
      const report = await DailyReport.findById(req.params.id);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
  
      await report.deleteOne(); // Deletes the report
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error while deleting report' });
    }
  };
  exports.getReportsByTeamMember = async (req, res) => {
    try {
      const { id } = req.params; // Get team member ID from request params
  
      // Fetch reports for the given team member
      const reports = await DailyReport.find({ teamMember: id }).populate('teamMember', 'name email');
  
      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this team member' });
      }
  
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching reports' });
    }
  };
  
  exports.getReportsByUserId = async (req, res) => {
    try {
      const { id } = req.params; // Get team member ID from request params
  
      // Fetch reports for the given team member
      const reports = await DailyReport.find({ createdby: id }).populate('teamMember', 'name email');
  
      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this team member' });
      }
  
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching reports' });
    }
  };