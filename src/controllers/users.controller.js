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

const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const logged = await Users.findOne(email);
    if (!logged) return res.status(401).json({ error: "invalid credentials" });

    const isValid = await bcrypt.compare(password, logged.password);
    if (!isValid) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
        { logged },
        process.env.TOKEN,
        { expiresIn: '1d' }
    )

    return res.json({ logged, token });
})

module.exports = {
    getAll,
    getOne,
    login
}