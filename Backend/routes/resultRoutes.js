// routes/result.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/verifyToken");  
const User = require("../models/User.js");

// GET /api/results/me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.exams);
  } catch (err) {
    console.error("Error fetching user results:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
