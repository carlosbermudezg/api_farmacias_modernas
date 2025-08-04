const { getAll, getOne, login, create, getUser, changeStatus, getSearch, getDoctors, getDoctorsByZone, update, getByUsername, getAllCursor} = require('../controllers/users.controller');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(verifyJWT, getAll)
    .post(create)
    .put(update)

routerUsers.route('/cursor')
    .get(verifyJWT, getAllCursor)

routerUsers.route('/doctors')
    .get(verifyJWT, getDoctors)

routerUsers.route('/doctorsByZone')
    .get(verifyJWT, getDoctorsByZone)

routerUsers.route('/usersBySearch')
    .get(verifyJWT, getSearch)

routerUsers.route('/login')
    .post(login)

routerUsers.route('/one/:id')
    .get(verifyJWT, getUser)

routerUsers.route('/changeStatus')
    .get(verifyJWT, changeStatus)

routerUsers.route('/getByUsername')
    .get(getByUsername)

routerUsers.route('/:id')
    .get(verifyJWT, getOne)
    
module.exports = routerUsers;