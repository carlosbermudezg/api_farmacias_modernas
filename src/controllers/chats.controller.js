const catchError = require('../utils/catchError');
const Chat = require('../models/Chat');

const getOne = catchError(async(req, res)=>{
    const { id } = req.query
    const result = await Chat.findById(id)
    return res.status(200).json(result)
})

const getMessagesNoRead = catchError(async(req, res)=>{
    const { id } = req.params
    const result = await Chat.findMessagesNoRead(id)
    return res.status(200).json(result)
})

const updateUnReadMessage = catchError(async(req, res) => {
    const { id } = req.params
    const result = await Chat.updateReadMessage(id);
    return res.status(201).json(result);
});

const create = catchError(async(req, res) => {
    const chat = {
        "usersId": req.body.usersId,
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
    update,
    getMessagesNoRead,
    updateUnReadMessage
}