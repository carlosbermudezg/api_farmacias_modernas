const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = catchError(async(req, res) => {
    const results = await Users.findAll();
    return res.status(200).json(results[0]);
});

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Users.findById(id)
    return res.status(200).json(result[0])
})

const login = catchError(async (req, res) => {
    const { user, password } = req.body;
    const logged = await Users.findOne(user);
    if (!logged[0][0]) return res.status(401).json({ error: "invalid credentials user" });

    const isValid = await bcrypt.compare(password, logged[0][0].password);
    if (!isValid) return res.status(401).json({ error: "invalid credentials pass" });

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
    login
}