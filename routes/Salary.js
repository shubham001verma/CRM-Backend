const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/Salary');


router.post('/calculate', salaryController.calculateSalary);


router.get('/all', salaryController.getAllSalaries);


router.put('/pay', salaryController.markSalaryAsPaid);
router.delete('/delete/:salaryId', salaryController.deleteSalary);


router.get("/salarybyuserid/:userId", salaryController.getSalaryByUserId);
router.get("/getsalarybyteamid/:id",salaryController.getSalaryByTeamId);
module.exports = router;
