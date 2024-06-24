const catchError = require('../utils/catchError')
const Recetas = require('../models/Recetas')

const getAll = catchError(async(req, res) => {
    const { page, limit } = req.query
    const offset = (page - 1) * limit
    const results = await Recetas.allRecetasPagination(limit, offset)
    const totalPagesData = await Recetas.countRecetas()
    const totalPages = Math.ceil(totalPagesData[0][0]?.count / limit)
    console.log(totalPages)

    return res.status(200).json({
        data: results[0],
        pagination: {
            page: +page,
            limit: +limit,
            totalPages: totalPages,
            totalRecetas: totalPagesData[0][0]?.count
        }
    })
})

const getByUser = catchError(async(req, res) => {
    const { page, limit, month, year } = req.query
    const { id } = req.params
    const offset = (page - 1) * limit
    const results = await Recetas.allRecetasPaginationUser(id, limit, offset, month, year)
    const totalPagesData = await Recetas.countRecetasByMonthUser(id, month, year)
    const totalPages = Math.ceil(totalPagesData[0][0]?.count / limit)
    console.log(totalPages)

    return res.status(200).json({
        data: results[0],
        pagination: {
            page: +page,
            limit: +limit,
            totalPages: totalPages,
            totalProducts: totalPagesData[0][0]?.count
        }
    })
})

// const getAll = catchError(async(req, res) => {
//     const results = await Recetas.findAll()
//     return res.status(200).json(results[0])
// })

const getByMonth = catchError(async(req, res)=>{
    const { month, year } = req.query
    const result = await Recetas.countRecetasByMonth(month, year)
    return res.status(200).json(result[0])
})

const getByMonthUser = catchError(async(req, res)=>{
    const { month, year, id } = req.query
    const result = await Recetas.countRecetasByMonthUser(month, year, id)
    return res.status(200).json(result[0])
})

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Recetas.findById(id)
    return res.status(200).json(result[0])
})

const create = catchError(async(req, res) => {
    const receta = {
        "iduser": req.body.iduser,
        "idusercreate": req.body.idusercreate,
        "numReceta": req.body.numReceta,
        "fechaHora": req.body.fechaHora,
        "image": req.body.image,
        "medicamentos": JSON.stringify(req.body.medicamentos)
    }
    const result = await Recetas.create(receta)
    return res.status(201).json(result);
})

const update = catchError(async(req, res) => {
    const { id } = req.params
    const receta = {
        "idreceta": id,
        "iduser": req.body.iduser,
        "image": req.body.image,
        "numReceta": req.body.numReceta,
        "medicamentos": JSON.stringify(req.body.medicamentos)
    }
    const result = await Recetas.update(receta);
    return res.status(201).json(result);
})

module.exports = {
    getAll,
    getOne, 
    create,
    update,
    getByUser,
    getByMonth,
    getByMonthUser
}