const catchError = require('../utils/catchError');
const Zones = require('../models/Zones');

const getAll = catchError(async(req, res) => {
    const results = await Zones.findAll();
    return res.status(200).json(results[0]);
})

const getById = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Zones.findById(id)
    return res.status(200).json(result[0])
})

const getMyZones = catchError(async(req, res)=>{
    const { zones } = req.query
    const result = await Zones.getAllMyZones(zones)
    return res.status(200).json(result[0])
})

const create = catchError(async(req, res) => {
    const zone = {
        "name": req.body.name,
    }
    const result = await Zones.create(zone)
    return res.status(201).json(result)
})

const update = catchError(async(req, res)=>{
    const data = req.body
    const result = await Zones.update(data)
    return res.status(200).json(result[0])
})

module.exports = {
    getAll,
    getById,
    create,
    update,
    getMyZones
}