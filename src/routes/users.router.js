const { getAll, getOne, login, create, getUser, changeStatus, getSearch, getDoctors, update, validateToken, getByUsername} = require('../controllers/users.controller');
const express = require('express');
const { verifyJWT, verifyAdminJWT } = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(verifyAdminJWT, getAll)
    .post(create)
    .put(verifyAdminJWT, update)

routerUsers.route('/doctors')
    .get(verifyJWT, getDoctors)

routerUsers.route('/validateToken')
    .get(validateToken)

routerUsers.route('/usersBySearch')
    .get(verifyJWT, getSearch)

routerUsers.route('/login')
    .post(login)

routerUsers.route('/one/:id')
    .get(verifyJWT, getUser)

routerUsers.route('/changeStatus')
    .get(verifyAdminJWT, changeStatus)

routerUsers.route('/getByUsername')
    .get(getByUsername)

routerUsers.route('/:id')
    .get(getOne)
    
module.exports = routerUsers;