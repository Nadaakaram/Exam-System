const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { getCurrentUser, updateCurrentUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/me', verifyToken, getCurrentUser );
router.put('/me', verifyToken, updateCurrentUser );
router.get('/', verifyToken, getAllUsers); 
module.exports = router;
