const User = require("../models/User");
exports.getCurrentUser = (req, res) => {
    console.log(req.user);
  res.json({
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar || null,
  });
};


exports.updateCurrentUser = async (req, res) => {
  try {
    const { name, avatar } = req.body; 

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { name, avatar },
      { new: true } 
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." }); // من المفترض عدم حدوث هذا لأن المستخدم مصادق عليه
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update profile." });
  }
};