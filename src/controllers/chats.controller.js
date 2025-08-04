const catchError = require('../utils/catchError');
const Chat = require('../models/Chat');

const getMessages = catchError(async (req, res) => {
    const { userId } = req.params;
    const { cursor } = req.query;
  
    try {
      const messages = await Chat.getMessages(userId, cursor);
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err });
    }
});
  
const sendMessage = catchError(async (req, res) => {
const { sender_id, receiver_id, content } = req.body;

try {
    const message = await Chat.createMessage({ sender_id, receiver_id, content });
    res.status(201).json(message);
} catch (err) {
    res.status(500).json({ error: 'Error sending message' });
}
});

const getUserNotifications = catchError(async (req, res) => {
    const userId = req.params.userId;

    try {
        const notifications = await notificationModel.getNotifications(userId);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching notifications' });
    }
});

const markNotificationAsRead = catchError(async (req, res) => {
    const { notificationId } = req.body;

    try {
        await notificationModel.markAsRead(notificationId);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error updating notification' });
    }
});


module.exports = {
    getMessages,
    sendMessage,
    getUserNotifications,
    markNotificationAsRead
}