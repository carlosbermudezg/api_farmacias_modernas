const { getOne, create, update, getMessagesNoRead, updateUnReadMessage } = require('../controllers/chats.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerChat = express.Router();
routerChat.route('/')
    .get(getOne)
routerChat.route('/getMessagesNoRead/:id')
    .get(getMessagesNoRead)
routerChat.route('/updateMessage/:id')
    .get(updateUnReadMessage)
routerChat.route('/addchat')
    .post(create)
routerChat.route('/updatechat')
    .post(update)
routerChat.route('/:id')
    .get(getOne)
module.exports = routerChat;