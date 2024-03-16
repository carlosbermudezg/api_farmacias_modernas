const { getAll, getOne, login} = require('../controllers/users.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(getAll)

routerUsers.route('/login')
    .post(login)

routerUsers.route('/:id')
    .get(getOne)
    
module.exports = routerUsers;