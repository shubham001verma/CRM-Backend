const express = require("express");
const { applyLeave, approveLeave, getLevaeRequests,getLeavbyTeamMemberId,getLeavbyUserId,deleteLeave } = require("../controllers/Leave");

const router = express.Router();

// ✅ Apply for Leave
router.post("/apply", applyLeave);

// ✅ Approve/Reject Leave (Admin)
router.put("/approve", approveLeave);

// ✅ Get All Leave Requests (Admin)
router.get("/all", getLevaeRequests);

router.get("/getleavbyteamid/:id", getLeavbyTeamMemberId);



router.get("/getleavbyuserid/:id", getLeavbyUserId);

router.delete("/deleteleave/:id", deleteLeave);

module.exports = router;