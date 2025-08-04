const catchError = require('../utils/catchError');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const results = await Category.findAllCategory();
    return res.status(200).json(results[0]);
});

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Category.findCategoryById(id)
    return res.status(200).json(result[0])
})

module.exports = {
    getAll,
    getOne
}