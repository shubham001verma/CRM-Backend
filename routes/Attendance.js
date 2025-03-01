const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/Attendance');

// ✅ Team Member Clock-in
router.post('/clock-in', attendanceController.clockIn);

// ✅ Team Member Clock-out
router.put('/clock-out', attendanceController.clockOut);
router.get("/status/:teamId",attendanceController.getAttendanceStatus);
router.get("/all/:teamId",attendanceController.getAllAttendanceRecords);
router.delete("/deleteattandance/:id",attendanceController.deleteAttandance);

module.exports = router;