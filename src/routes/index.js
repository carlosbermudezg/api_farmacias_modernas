const express = require('express');
const routerRecetas = require('./recetas.router');
const routerUsers = require('./users.router');
const routerChats = require('./chats.router');
const router = express.Router();

router.use('/users', routerUsers)
router.use('/chats', routerChats)
router.use('/recetas', routerRecetas)

module.exports = router;