const { getOne, create, update, getMessagesNoRead, updateUnReadMessage } = require('../controllers/chats.controller');
const express = require('express');
const { verifyJWT, verifyAdminJWT } = require('../utils/verifyJWT');

const routerChat = express.Router()
routerChat.route('/')
    .get(verifyAdminJWT, getOne)

routerChat.route('/getMessagesNoRead/:id')
    .get(verifyJWT, getMessagesNoRead)

routerChat.route('/updateMessage/:id')
    .get(verifyJWT, updateUnReadMessage)

routerChat.route('/addchat')
    .post(verifyJWT, create)

routerChat.route('/updatechat')
    .post(verifyJWT, update)
    
routerChat.route('/:id')
    .get(verifyJWT, getOne)

module.exports = routerChat;