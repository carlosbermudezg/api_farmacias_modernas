const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllCursor = catchError(async (req, res) => {
    const { limit = 10, cursorDate = null, cursorId = null, search = '' } = req.query;

    // Llamar a la función para obtener los resultados
    const results = await Users.findAllCursor(limit, cursorDate, cursorId, search);

    // Si no hay resultados, regresar una respuesta vacía
    if (results.length === 0) {
        return res.status(200).json({
            data: [],
            pagination: {
                limit: +limit,
                nextCursor: null,
                hasMore: false
            }
        });
    }

    // Nuevo cursor para la siguiente página
    const newCursorDate = results[results.length - 1].last_message_date;
    const newCursorId = results[results.length - 1].idusers;

    return res.status(200).json({
        data: results,
        pagination: {
            limit: +limit,
            nextCursor: newCursorDate && newCursorId ? { date: newCursorDate, id: newCursorId } : null,
            hasMore: results.length === +limit
        }
    });
}); 

const getAll = catchError(async(req, res) => {
    const { page, limit, search } = req.query
    const offset = (page - 1) * limit
    const results = await Users.findAll(limit, offset, search)
    const totalPagesData = await Users.countUsers(search)
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

const getByUsername = catchError(async(req, res)=>{
    const { username } = req.query
    const result = await Users.findOne(username)
    if(result[0][0]) return res.status(200).json({ response: true })
    return res.status(200).json({ response: false })
})

const getUser = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findById(id)
    return res.status(200).json(result[0])
})

const getDoctors = catchError(async(req, res)=>{
    const result = await Users.findDoctors()
    return res.status(200).json(result[0])
})

const getDoctorsByZone = catchError(async(req, res)=>{
    const { zones } = req.query
    const result = await Users.findDoctorsByZone(zones)
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
        "residencia": req.body.ciudad,
        "type": req.body.type,
        "brands": req.body.brands,
        "zones": req.body.zones
    }
    const result = await Users.create(user)
    if(!result) return res.status(401).json({error: 'El usuario ya existe'})
    // const idUserRegistered = result[0].insertId
    // const data = "1,"+idUserRegistered+""
    // const resultChat = await Chat.create(data)
    // console.log(resultChat)
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
    
    delete logged[0][0].password

    const token = jwt.sign(
        { user: logged[0][0] },
        process.env.TOKEN,
        { expiresIn: '1h' }
    )

    return res.status(200).json( token );
})

module.exports = {
    getAll,
    getAllCursor,
    getOne,
    login,
    create,
    getUser,
    changeStatus,
    getSearch,
    getDoctors,
    getDoctorsByZone,
    update,
    getByUsername
}