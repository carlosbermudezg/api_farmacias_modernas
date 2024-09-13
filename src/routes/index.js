const express = require('express');
const routerRecetas = require('./recetas.router');
const routerUsers = require('./users.router');
const routerChats = require('./chats.router');
const routerZones = require('./zones.router');
const routerYears = require('./years.router');
const router = express.Router();

router.use('/users', routerUsers)
router.use('/chats', routerChats)
router.use('/recetas', routerRecetas)
router.use('/zones', routerZones)
router.use('/years', routerYears)

module.exports = router;