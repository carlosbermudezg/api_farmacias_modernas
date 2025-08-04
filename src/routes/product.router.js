const { getAll, getAllProductsReceta, getOne, getSearch, getByCategory, getBrands, getProductsByBrands, getBrandById, getBrandsBySearch } = require('../controllers/product.controller')
const express = require('express')
const { verifyJWT } = require('../utils/verifyJWT')

const routerProduct = express.Router()

routerProduct.route('/')
    .get(verifyJWT, getAll)

routerProduct.route('/getProductsReceta')
    .get(verifyJWT, getAllProductsReceta)

routerProduct.route('/brands')
    .get(getBrands)

routerProduct.route('/brandsBySearch')
    .get(getBrandsBySearch)

routerProduct.route('/brands/:id')
    .get(verifyJWT, getBrandById)

routerProduct.route('/byBrands')
    .get(verifyJWT, getProductsByBrands)

routerProduct.route('/getByCategory')
    .get(verifyJWT, getByCategory)

routerProduct.route('/search')
    .get(verifyJWT, getSearch)

routerProduct.route('/:id')
    .get(verifyJWT, getOne)
    
module.exports = routerProduct;