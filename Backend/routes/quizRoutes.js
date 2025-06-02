// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// POST: Create quiz
router.post('/', quizController.createQuiz);

// GET: Get all quizzes
router.get('/', quizController.getAllQuizzes);

// GET: Get quiz by ID
router.get('/:id', quizController.getQuizById);
// DELETE: Delete quiz by ID
router.delete('/:id', quizController.deleteQuiz);
// PUT: Update quiz by ID
router.put('/:id', quizController.updateQuiz);

module.exports = router;
