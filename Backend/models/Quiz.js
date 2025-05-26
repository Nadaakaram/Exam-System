const mongoose = require("mongoose");

const optionShcema = new mongoose.Schema({
  optionText: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionShcema],
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  // category: String,
  icon: {type : String, default: ""},
  score: { type: Number, default: 0},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // لو بتحبي تعملي ارتباط بالـ admin
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
