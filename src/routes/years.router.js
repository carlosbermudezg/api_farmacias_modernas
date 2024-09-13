const { getAll } = require('../controllers/years.controller')
const express = require('express')
const { verifyJWT } = require('../utils/verifyJWT')

const routerYears = express.Router()

routerYears.route('/')
    .get(verifyJWT, getAll)
    
module.exports = routerYears;