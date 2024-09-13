const catchError = require('../utils/catchError');
const Years = require('../models/Years');

const getAll = catchError(async(req, res) => {
    const results = await Years.findAll();
    return res.status(200).json(results[0]);
})

module.exports = {
    getAll
}