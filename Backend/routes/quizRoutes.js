// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

const authMiddleware = require('../middlewares/auth');

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);
router.put('/:id', quizController.updateQuiz);
router.post('/:id/submit', authMiddleware, quizController.submitQuiz);
router.get('/results', authMiddleware, quizController.getUserResults);

module.exports = router;
