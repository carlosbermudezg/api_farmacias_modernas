const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = catchError(async(req, res) => {
    const { page, limit } = req.query
    const offset = (page - 1) * limit
    const results = await Users.findAll(limit, offset)
    const totalPagesData = await Users.countUsers()
    const totalPages = Math.ceil(totalPagesData[0][0]?.count / limit)
    return res.status(200).json({
        data: results[0],
        pagination: {
            page: +page,
            limit: +limit,
            totalPages: totalPages,
            totalUsers: totalPagesData[0][0]?.count
        }
    })
})

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findOne(id)
    if(result[0][0]) return res.status(401).json({ error: false })
    return res.status(200).json({ msg: true })
})

const getUser = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findById(id)
    return res.status(200).json(result[0])
})

const getSearch = catchError(async(req, res)=>{
    const { search } = req.query
    const results = await Users.findByUserSearch(search)
    return res.status(200).json({
        data: results[0],
    })
})

const changeStatus = catchError(async(req, res)=>{
    const { id, state } = req.query
    const result = await Users.changeStatus(id, state)
    return res.status(200).json(result[0])
})

const create = catchError(async(req, res) => {
    const user = {
        "name": req.body.name,
        "username": req.body.username,
        "password": await bcrypt.hash(req.body.password, 10),
        "telefono": req.body.telefono,
        "direccion": req.body.direccion,
        "type": req.body.type,
        "brands": req.body.brands,
        "zones": req.body.zones
    }
    const result = await Users.create(user)
    if(!result) return res.status(401).json({error: 'El usuario ya existe'})
    const idUserRegistered = result[0].insertId
    const data = "1,"+idUserRegistered+""
    const resultChat = await Chat.create(data)
    console.log(resultChat)
    return res.status(201).json(result)
})

const update = catchError(async(req, res)=>{
    const data = req.body
    const result = await Users.update(data)
    return res.status(200).json(result[0])
})

const login = catchError(async (req, res) => {
    const { user, password } = req.body
    const logged = await Users.findOne(user)
    if (!logged[0][0]) return res.status(401).json({ error: "invalid credentials user" })

    const isValid = await bcrypt.compare(password, logged[0][0].password)
    if (!isValid) return res.status(401).json({ error: "invalid credentials pass" })

    const isPermited = logged[0][0].active === 1
    if (!isPermited) return res.status(401).json({ error: "Usuario no autorizado. Contacte el administrador" })

    const token = jwt.sign(
        { user: logged[0][0] },
        process.env.TOKEN,
        { expiresIn: '7d' }
    )

    let admin_token = ''

    const isAdmin = logged[0][0].type === 10

    if(isAdmin){
        admin_token = jwt.sign(
            { user: logged[0][0] },
            process.env.ADMIN_TOKEN,
            { expiresIn: '7d' }
        ) 
    }

    return res.status(200).json({ user: logged[0][0], token, admin_token });
})

module.exports = {
    getAll,
    getOne,
    login,
    create,
    getUser,
    changeStatus,
    getSearch,
    update
}