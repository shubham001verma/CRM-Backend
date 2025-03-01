const express = require('express');
const router = express.Router();
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  loginClient,
  countClients,
  getClientbyuserId,
  countClientbyuserid,
  updateClientProfile
} = require('../controllers/Client'); // Adjust the path as needed
const upload = require('../middleware/multer');
// POST route for creating a new Client
router.post('/createclients', createClient);

// GET route to fetch all Clients
router.get('/allclients', getAllClients);

// GET route to fetch a single Client by ID
router.get('/singleclient/:id', getClientById);

// PUT route to update a Client by ID
router.put('/updateclients/:id',upload.single('image'), updateClient);

// DELETE route to delete a Client by ID
router.delete('/deleteclients/:id', deleteClient);
router.post('/loginclient', loginClient);


router.put('/updateclientprofile/:id',upload.single('image'),updateClientProfile);



router.get('/countclients',countClients);
router.get('/getclientsbyuserid/:id',getClientbyuserId);


router.get('/countclientsbyuserid/:id',countClientbyuserid);



module.exports = router;
