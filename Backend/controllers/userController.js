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
      return res.status(404).json({ message: "User not found." }); 
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update profile." });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
