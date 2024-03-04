const catchError = require('../utils/catchError');
const Users = require('../models/Users');

const getAll = catchError(async(req, res) => {
    const results = await Users.findAll();
    return res.status(200).json(results[0]);
});

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findById(id)
    return res.status(200).json(result[0])
})

const getSearch = catchError(async(req, res)=>{
    const { search } = req.params
    const result = await Users.findByProduct(decodeURIComponent(search))
    return res.status(200).json(result[0])
})

module.exports = {
    getAll,
    getOne,
    getSearch
}