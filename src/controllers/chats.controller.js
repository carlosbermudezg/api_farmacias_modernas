const catchError = require('../utils/catchError');
const Chat = require('../models/Chat');

const getOne = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Chat.findById(id)
    return res.status(200).json(result[0])
})

const create = catchError(async(req, res) => {
    const chat = {
        "iduser1": req.body.iduser1,
        "iduser2": req.body.iduser2,
        "content": JSON.stringify(req.body.content)
    }
    const result = await Chat.create(chat);
    return res.status(201).json(result);
});

const update = catchError(async(req, res) => {
    const chat = {
        "idchats": req.body.idchats,
        "content": JSON.stringify(req.body.content)
    }
    const result = await Chat.update(chat);
    return res.status(201).json(result);
});


module.exports = {
    getOne,
    create,
    update
}