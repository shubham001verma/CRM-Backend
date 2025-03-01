const express = require('express');
const upload = require('../middleware/multer');
const userController = require('../controllers/User');

const router = express.Router();

router.post('/create', upload.single('image'), userController.createUser); // Add image upload
router.put('/update/:id', upload.single('image'), userController.updateUser); // Add image upload
router.get('/alluser', userController.getAllUsers);
router.get('/singleuser/:id', userController.getUserById);
router.delete('/delete/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.get('/userid', userController.getProfile)
router.get('/countuser', userController.countUsers)


module.exports = router;