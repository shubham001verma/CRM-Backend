const express = require('express');
const router = express.Router();
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
  countTeamMembers,
  getTeamMemberbyuserId,
  countTeamMembersbyuserid ,
  loginTeam,
  updateTeamMemberProfile,
  getuseridbyteammember
} = require('../controllers/Team'); // Adjust the path as needed
const upload = require('../middleware/multer');
// POST route for creating a new Team Member
router.post('/createteam',upload.single('image'), createTeamMember);

// GET route to fetch all Team Members
router.get('/allteam', getAllTeamMembers);

// GET route to fetch a single Team Member by ID
router.get('/singleteam/:id', getTeamMemberById);

// PUT route to update a Team Member by ID
router.put('/updateteam/:id',upload.single('image'), updateTeamMember);

// DELETE route to delete a Team Member by ID
router.delete('/deleteteam/:id', deleteTeamMember);

router.get('/countteam', countTeamMembers);

router.get('/getteammemberbyuserid/:id', getTeamMemberbyuserId);

router.get('/getcountteammemberbyuserid/:id', countTeamMembersbyuserid);

router.post('/teamlogin', loginTeam);

router.put('/updateteammemberprofile/:id',upload.single('image'), updateTeamMemberProfile);

router.get('/getuseridbyteammember/:id', getuseridbyteammember);



 
module.exports = router;
