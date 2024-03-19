const express = require('express');
const routerPermisos = require('./permisos.router');
const routerUsers = require('./users.router');
const routerChats = require('./chats.router');
const router = express.Router();

router.use('/permisos', routerPermisos)
router.use('/users', routerUsers)
router.use('/chats', routerChats)

module.exports = router;