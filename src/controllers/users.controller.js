const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = catchError(async(req, res) => {
    const results = await Users.findAll();
    return res.status(200).json(results[0]);
});

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findOne(id)
    if(result[0][0]) return res.status(401).json({ error: "El usuario ya existe" })
    return res.status(200).json({ msg: "ok" })
})
const getUser = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findById(id)
    return res.status(200).json(result[0])
})

const create = catchError(async(req, res) => {
    const user = {
        "name": req.body.name,
        "username": req.body.username,
        "password": await bcrypt.hash(req.body.password, 10),
        "telefono": req.body.telefono,
        "type": req.body.type
    }
    const result = await Users.create(user);
    const idUserRegistered = result[0].insertId
    const data = "1,"+idUserRegistered+""
    const resultChat = await Chat.create(data)
    console.log(resultChat)
    return res.status(201).json(result);
});

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
        { expiresIn: '1d' }
    )

    return res.status(200).json({ user: logged[0][0], token });
})

module.exports = {
    getAll,
    getOne,
    login,
    create,
    getUser
}