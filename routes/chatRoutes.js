const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { isAuthenticated } = require('./middleware/authMiddleware');

router.get('/chat', isAuthenticated, chatController.renderChatPage);
router.post('/chat', isAuthenticated, chatController.handleChatMessage);

module.exports = router;