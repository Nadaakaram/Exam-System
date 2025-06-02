const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: String,   
  score: Number   
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  exams: [examSchema]
});

module.exports = mongoose.model("User", userSchema);
