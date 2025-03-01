const express = require('express');

const { addBanner, getAllBanners, updateBanner, deleteBanner,getBannerByUserId,getBannerById } = require('../controllers/Banner');
const upload = require('../middleware/multer');
const router = express.Router();


router.post('/addbanner', upload.single('image'), addBanner);
router.get('/allbanners', getAllBanners);
router.get('/singlebanner/:id', getBannerById);
router.put('/updatebanner/:id', upload.single('image'), updateBanner);
router.delete('/deletebanner/:id', deleteBanner);
router.get('/getbannerbyuserid/:id', getBannerByUserId);



module.exports = router;
