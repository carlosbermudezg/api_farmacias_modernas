const catchError = require('../utils/catchError');
const Permisos = require('../models/Permisos');

const getAll = catchError(async(req, res) => {
    const results = await Permisos.findAll();
    return res.status(200).json(results[0]);
});

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Permisos.findById(id)
    return res.status(200).json(result[0])
})

module.exports = {
    getAll,
    getOne
}