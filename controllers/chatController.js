const axios = require('axios');

exports.renderChatPage = (req, res) => {
  res.render('chat', { user: req.session.userId });
};

exports.handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(`${process.env.API_BASE_URL}/chat`, { message });
    const io = req.app.get('io');
    io.emit('chat message', { user: req.session.userId, message: response.data });
    res.json(response.data);
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
};