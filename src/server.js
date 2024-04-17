const app = require('./app')
const { Server } = require('socket.io')
const { createServer } = require('http')
const Chat = require('./models/Chat')

const port = 3000
const servidor = createServer(app)
const io = new Server(
    servidor, { 
        cors: {
            origin: '*'
        }
    }
)

io.on('connection', async (socket) => {
    // Crea el socket asociado al usuario en la db
    const token = socket.handshake.query.token
    const user = socket.handshake.query.user
    const userParsed = JSON.parse(user)

    //Buscar si el usuario tiene socket
    const findSocket = await Chat.getSocket(userParsed.idusers)
    
    //si el usuario tiene socket lo actualiza y si no tiene lo crea
    findSocket === undefined ? 
        Chat.createSocket(userParsed.idusers, token, socket.id) : 
        Chat.updateSocket(userParsed.idusers, socket.id)

    console.log('Usuario conectado!')

    socket.on('disconnect', () => {
    console.log('an user has disconnected')
})

socket.on('mensaje', async(msg)=>{
    const message = await JSON.parse(msg)
    const strmsg = JSON.stringify(message)
    await Chat.createMessage(message) && console.log('mensaje guardado en la base de datos')
    const id = await Chat.findOne(message.idchat, message.userSend)
    id === undefined ? console.log('Id de Usuario no encontrado') : console.log('Id de Usuario encontrado')
    const e = await Chat.getSocket(id)
    e === undefined ? console.log('el usuario esta desconectado') : console.log('el usuario esta conectado')
    e != undefined ? socket.broadcast.to(e.idsockets).emit('mensaje', strmsg) : 'Usuario no conectado, enviando, notificación'
    console.log('mensaje enviado al receptor')
    socket.emit('mensaje', strmsg)
    console.log('mensaje enviado al emisor')
})
})
servidor.listen(port,()=>{
    console.log('Server is running on port: ' + port)
})