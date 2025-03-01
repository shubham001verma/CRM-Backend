const express = require('express');
const router = express.Router();
const roleController = require('../controllers/Role');

router.post('/createroles', roleController.createRole);  // Create a role
router.get('/allroles', roleController.getRoles);  // Get all roles
router.get('/singleroles/:id', roleController.getRoleById);  // Get a single role
router.put('/updateroles/:id', roleController.updateRole);  // Update a role
router.delete('/deleteroles/:id', roleController.deleteRole);  // Delete a role

router.get('/getrolesbyuserid/:id', roleController.getRoleByUserId); 



module.exports = router;
