const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: String,   
  score: Number   ,
  total: Number
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  exams: [examSchema]
});

module.exports = mongoose.model("User", userSchema);
