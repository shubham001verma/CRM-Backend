const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  countProjects,
  getProjectbyuserId,
  countProjectbyuserid,
  getProjectByClientId,
  countProjectbyclientid,
  // sendExpirationEmails
  sendExpirationEmailForProject,
  countCompletedProjectbyclientid
} = require('../controllers/Project'); // Adjust the path as needed

// POST route for creating a new Project
router.post('/createprojects', createProject);

// GET route to fetch all Projects
router.get('/allprojects', getAllProjects);

// GET route to fetch a single Project by ID
router.get('/singleproject/:id', getProjectById);

// PUT route to update a Project by ID
router.put('/updateprojects/:id', updateProject);

// DELETE route to delete a Project by ID
router.delete('/deleteprojects/:id', deleteProject);


router.get('/countprojects', countProjects);

router.get('/getprojectbyuserid/:id',getProjectbyuserId);


router.get('/countprojectsbyuserid/:id',countProjectbyuserid);

router.get('/getprojectbyclientid/:id',getProjectByClientId);

router.get('/countprojectsbyclientid/:id',countProjectbyclientid);
router.get('/countcompletedprojectsbyclientid/:id',countCompletedProjectbyclientid);
// router.get('/send-expiration-emails', sendExpirationEmails);

router.post("/send-expiration-email/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Call function to send email for this project
    await sendExpirationEmailForProject(id);

    res.status(200).json({ message: `Expiration email sent for project ID: ${id}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to send expiration email", details: error.message });
  }
});

module.exports = router;
