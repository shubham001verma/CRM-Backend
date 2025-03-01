const express = require('express');
const router = express.Router();
const leadController = require('../controllers/Lead'); // Adjust the path if needed

// Create a new lead
router.post('/createleads', leadController.createLead);

// Get all leads
router.get('/allleads', leadController.getAllLeads);

// Get a single lead by ID
router.get('/singlelead/:id', leadController.getLeadById);

// Update a lead by ID
router.put('/updateleads/:id', leadController.updateLead);

// Delete a lead by ID
router.delete('/deleteleads/:id', leadController.deleteLead);

router.get('/getleadid/:id',leadController.getLead)

router.get('/countleads',leadController.countLeads)

router.get('/getledsbyuserid/:id',leadController.getLeadsbyuserId)
router.get('/countledsbyuserid/:id',leadController.countLeadbyuserid)

router.get('/countwonledsbyuserid/:id',leadController.countWonLeadsbyuserid)
router.get('/countlostledsbyuserid/:id',leadController.countLostLedsbyuserId)


router.get('/getwonledsbyuserid/:id',leadController.getWonLeadsbyuserId)




module.exports = router;
