const { getAll, getOne, create, update, getByUser, getByMonth, getByMonthUser} = require('../controllers/recetas.controller');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerRecetas = express.Router();

routerRecetas.route('/')
    .get(verifyJWT, getAll)
    .post(create)

routerRecetas.route('/getByUser/:id')
    .get(verifyJWT, getByUser)

routerRecetas.route('/getByMonth')
    .get(verifyJWT, getByMonth)

routerRecetas.route('/getByMonthUser')
    .get(verifyJWT, getByMonthUser)

routerRecetas.route('/:id')
    .get(verifyJWT, getOne)
    .put(verifyJWT, update)
    
module.exports = routerRecetas;