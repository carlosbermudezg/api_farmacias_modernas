const { getOne, create, update } = require('../controllers/chats.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerChat = express.Router();
routerChat.route('/')
    .get(getOne)
routerChat.route('/addchat')
    .post(create)
routerChat.route('/updatechat')
    .post(update)
routerChat.route('/:id')
    .get(getOne)
module.exports = routerChat;