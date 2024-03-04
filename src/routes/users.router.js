const { getAll, getOne} = require('../controllers/users.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerUsers = express.Router();

routerUsers.route('/')
    .get(verifyJWT, getAll)

routerUsers.route('/:id')
    .get(verifyJWT, getOne)
module.exports = routerUsers;