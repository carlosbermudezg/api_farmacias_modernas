const { getAll, getOne} = require('../controllers/category.controller');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(verifyJWT, getAll)

routerCategory.route('/:id')
    .get(verifyJWT, getOne)

module.exports = routerCategory;