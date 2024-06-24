const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    const key = process.env.TOKEN
    jwt.verify(
        token,
        key,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.user = decoded.user
            next()
        }
    )
}

const verifyAdminJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    const key = process.env.ADMIN_TOKEN
    jwt.verify(
        token,
        key,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.user = decoded.user
            next()
        }
    )
}

module.exports = { verifyJWT, verifyAdminJWT };