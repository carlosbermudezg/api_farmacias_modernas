const express = require('express')
const router = require('./routes')
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express()

app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/api/v1', router)
app.get('/', (req, res) => {
    return res.send("Welcome to Api FM");
})


module.exports = app