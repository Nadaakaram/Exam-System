const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  questionText: String,
  options: [String],
  correctAnswer: Number, // index of the correct option
});

module.exports = mongoose.model("Question", questionSchema);
