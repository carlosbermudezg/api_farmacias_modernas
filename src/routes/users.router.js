const { getAll, getOne, login, create, getUser} = require('../controllers/users.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(getAll)

routerUsers.route('/login')
    .post(login)

routerUsers.route('/adduser')
    .post(create)

routerUsers.route('/one/:id')
    .get(getUser)

routerUsers.route('/:id')
    .get(getOne)

    
module.exports = routerUsers;