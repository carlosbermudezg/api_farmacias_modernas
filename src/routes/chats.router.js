const chatController = require('../controllers/chats.controller');
const express = require('express');
const { verifyJWT, verifyAdminJWT } = require('../utils/verifyJWT');

const routerChat = express.Router()

routerChat.get('/:userId', verifyJWT, chatController.getMessages);
routerChat.post('/', verifyJWT, chatController.sendMessage);

module.exports = routerChat;