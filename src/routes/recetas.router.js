const { getAll, getOne, create, update, getByUser, getByMonth, getByMonthUser, updatePayment, getAllByUser} = require('../controllers/recetas.controller');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerRecetas = express.Router();

routerRecetas.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create)

routerRecetas.route('/getAllByUser/:id')
    .get(verifyJWT, getAllByUser)

routerRecetas.route('/getByUser/:id')
    .get(verifyJWT, getByUser)

routerRecetas.route('/getByMonth')
    .get(verifyJWT, getByMonth)

routerRecetas.route('/getByMonthUser')
    .get(verifyJWT, getByMonthUser)

routerRecetas.route('/updatePayment')
    .put(verifyJWT, updatePayment)

routerRecetas.route('/:id')
    .get(verifyJWT, getOne)
    .put(verifyJWT, update)
    
module.exports = routerRecetas;