const pool = require('../utils/connMySql2')

const findById = async(id)=>{
    const result = await pool.query('SELECT * from chats WHERE usersId LIKE "%'+id+'%" ORDER BY idchats')
    let response = []
    const query = await Promise.all(
        result[0].map(async(element)=>{
            let users = element.usersId.split(',')
            const userIdFind = users.find( user => user != id )
            const resultUser = await pool.query('SELECT name from users WHERE idusers='+userIdFind)
            const messages = await pool.query('SELECT * from messages WHERE idchat='+element.idchats)
            element.user = resultUser[0][0]
            if(messages[0][0] === undefined){
                element.messages = []
            }else{
                element.messages = [messages[0]]
            }
            response.push( element )
        })
    )
    return response
}

const findOne = async(idchats, userId)=>{
    const result = await pool.query('SELECT usersId from chats WHERE idchats='+idchats)
    let users = result[0][0].usersId.split(',')
    const userIdFind = users.find( user => user != userId )
    return userIdFind
}

const findMessagesNoRead = async(idchat)=>{
    const result = await pool.query(`SELECT * from messages WHERE idchat='${idchat}' AND chatRead=0 ORDER BY idmessages desc limit 5 `)
    return result
}

const create = async(usersId)=>{
    const result = await pool.query(
        `INSERT INTO chats(usersId) VALUES('${usersId}')`
    );
    return result
}

const createMessage = async(message)=>{
    const image = JSON.stringify(message.image)
    const result = await pool.query(
        `INSERT INTO messages(idchat,userSend,date,content,chatRead,image) VALUES('${message.idchat}','${message.userSend}','${message.date}','${message.content}','${message.read}','${image}')`
    );
    return result
}

const updateReadMessage = async(id) => {
    const result = await pool.query(
        `UPDATE messages SET chatRead=1 WHERE idmessages=${id}`
    );
    return result
}

const createSocket = async(idusers, token, socket) => {
    const result = await pool.query(
        `INSERT INTO sockets(idsockets, iduser, token) VALUES('${socket}','${idusers}','${token}')`
    );
    return result
}

const updateSocket = async(idusers, socket) => {
    const result = await pool.query(
        `UPDATE sockets SET idsockets='${socket}' WHERE iduser=${idusers}`
    );
    return result
}

const getSocket = async(id)=>{
    const result = await pool.query('SELECT idsockets from sockets WHERE iduser='+id)
    return result[0][0]
}

const update = async(chat)=>{
    const content = JSON.stringify(chat.content)
    const result = await pool.query(
        `UPDATE chats SET content='${content}' WHERE idchats=${chat.idchats}`
    )
    return result
}


module.exports = {
    findById,
    create,
    update, 
    findOne,
    createSocket,
    getSocket,
    updateSocket, 
    createMessage,
    findMessagesNoRead,
    updateReadMessage
}