const Quiz = require("../models/Quiz");
const User = require('../models/User');
const Result = require("../models/Result");


const iconMap = {
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  next:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
};

function getIconByTitle(title) {
  title = title.toLowerCase();
  for (const keyword in iconMap) {
    if (title.includes(keyword)) {
      return iconMap[keyword];
    }
  }
  return "https://placehold.co/50x50?text=Quiz";
}

exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    const newQuiz = new Quiz({
      title,
      questions,
      score: 0,
      icon: getIconByTitle(title)
    });

    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.status(200).json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.submitQuiz = async (req, res) => {

  const quizId = req.params.id;
  const userId = req.user.id;
  const { answers } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });



    let score = 0;
    quiz.questions.forEach((question, index) => {
  const correctIndex = question.options.findIndex(opt => opt.isCorrect === true);
  if (answers[index] === correctIndex) {
    score++;
  }
});

    const result = new Result({
      userId,
      quizId,
      score,
      totalQuestions: quiz.questions.length,
      answers,
      percentage: (score / quiz.questions.length) * 100
    });
    await result.save();

    await User.findByIdAndUpdate(userId, {
      $push: {
        exams: {
          name: quiz.title,
          score: score,
          total: quiz.questions.length
        }
      }
    });

    res.status(200).json({ 
      score,
      total: quiz.questions.length,
      percentage: (score / quiz.questions.length) * 100
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error('Error deleting quiz:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



