const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  questionText: String,
  options: [String],
  correctAnswer: Number, 
});

module.exports = mongoose.model("Question", questionSchema);
