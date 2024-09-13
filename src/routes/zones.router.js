const { getAll, getById, create, update, getMyZones} = require('../controllers/zones.controller')
const express = require('express')
const { verifyJWT, verifyAdminJWT } = require('../utils/verifyJWT')

const routerZones = express.Router()

routerZones.route('/')
    .get(getAll)
    .post(verifyAdminJWT, create)
    .put(verifyAdminJWT, update)

routerZones.route('/getMyZones')
    .get(verifyJWT, getMyZones)

routerZones.route('/:id')
    .get(getById)
    
module.exports = routerZones;