const { getAll, getOne} = require('../controllers/permisos.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerPermisos = express.Router();

routerPermisos.route('/')
    .get(verifyJWT, getAll)

routerPermisos.route('/:id')
    .get(verifyJWT, getOne)
module.exports = routerPermisos;