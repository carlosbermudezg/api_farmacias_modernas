const express = require('express');
const routerPermisos = require('./permisos.router');
const routerUsers = require('./users.router');
const router = express.Router();

router.use('/permisos', routerPermisos)
router.use('/users', routerUsers)

module.exports = router;