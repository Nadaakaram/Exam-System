const express = require('express');
const router = express.Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/me', verifyToken, getCurrentUser );
router.put('/me', verifyToken, updateCurrentUser );
module.exports = router;
