const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/Service");

// Define routes
router.post("/createservice", serviceController.createService);
router.get("/allservices", serviceController.getAllServices);
router.get("/singleservice/:id", serviceController.getServiceById);
router.put("/updateservice/:id", serviceController.updateService);
router.delete("/deleteservice/:id", serviceController.deleteService);
router.get("/getservicesbyuserid/:id", serviceController.getRoleByUserId);

router.get("/countservicesbyuserid/:id", serviceController.countServiceByUserId);



module.exports = router;
