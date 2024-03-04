const express = require('express')
const router = require('./routes')

const app = express()

app.use('/api/v1', router)
app.get('/', (req, res) => {
    return res.send("Welcome to Api FM");
})


module.exports = app