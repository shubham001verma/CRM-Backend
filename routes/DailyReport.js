const express = require('express');
const {
  submitReport,
  getAllReports,
  markReportReviewed,
  deleteReport,
  getReportsByTeamMember,
  getReportsByUserId
}  = require('../controllers/DailyReport');


const router = express.Router();

// 📌 1. Submit Daily Report (Team Members)
router.post('/submit', submitReport);

// 📌 2. Get All Reports (Admin Only)
router.get('/all',  getAllReports);

// 📌 3. Mark Report as Reviewed (Admin Only)
router.put('/review/:id',markReportReviewed);
router.delete('/delete/:id', deleteReport);
router.get('/team/:id', getReportsByTeamMember);

router.get('/user/:id', getReportsByUserId);
module.exports = router;
