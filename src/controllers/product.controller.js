const catchError = require('../utils/catchError');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const { page, limit, search, category, zone } = req.query
    const offset = (page - 1) * limit
    const results = await Product.allProductsPagination(limit, offset, search, category, zone)
    const totalPagesData = await Product.countProducts(search, category)
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
    });
});

const getAllProductsReceta = catchError(async(req, res) => {
    const { page, limit, search } = req.query
    const offset = (page - 1) * limit
    const results = await Product.allProductsPaginationReceta(limit, offset, search)
    const totalPagesData = await Product.countProductsReceta(search)
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
    });
});

const getProductsByBrands = catchError(async(req, res) => {
    const { array } = req.query
    const results = await Product.getProductsByBrands(array)
    return res.status(200).json({
        data: results[0]
    });
});

const getBrands = catchError(async(req, res) => {
    const results = await Product.getBrands()
    return res.status(200).json({
        data: results
    })
})

const getBrandsBySearch = catchError(async(req, res)=>{
    const { page, limit, search } = req.query
    const offset = (page - 1) * limit
    const totalPagesData = await Product.countBrands(limit, search)
    const totalPages = Math.ceil(totalPagesData[0][0]?.count / limit)
    const results = await Product.findBrandsBySearch(limit, offset, search)
    return res.status(200).json({
        data: results[0],
        pagination: {
            page: +page,
            limit: +limit,
            totalPages: totalPages,
            totalBrands: totalPagesData[0][0]?.count
        }
    })
})

const getBrandById = catchError(async(req, res) => {
    const { id } = req.params
    const results = await Product.getBrandById(id)
    return res.status(200).json({
        data: results
    });
});

const getByCategory = catchError(async(req, res) => {
    const { array } = req.query
    const results = await Product.productsByCategory(array)
    return res.status(200).json({
        data: results[0]
    });
});

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Product.findById(id)
    return res.status(200).json(result[0])
})

const getSearch = catchError(async(req, res)=>{
    const { search } = req.query
    const results = await Product.findByUserSearch(search)
    return res.status(200).json({
        data: results[0],
    })
})

module.exports = {
    getAll,
    getAllProductsReceta,
    getOne,
    getSearch,
    getByCategory,
    getBrands,
    getProductsByBrands,
    getBrandById,
    getBrandsBySearch
}