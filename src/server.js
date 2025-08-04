const app = require('./app')
const { Server } = require('socket.io')
const { createServer } = require('http')
const Chat = require('./models/Chat')
require('dotenv').config();

const port = 4000
const servidor = createServer(app)

const io = new Server(servidor, {
    cors: {
      origin: '*',
    }
  });
  
io.on('connection', (socket) => {
    console.log('Usuario conectado');
  
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
    });
  
    socket.on('send_message', async (data) => {
      io.to(`user_${data.receiver_id}`).emit('receive_message', data);

      console.log(data)

      const msg = await Chat.createMessage({
        receiver_id: data.receiver_id,
        sender_id: data.sender_id,
        content: data.content
      });
  
      const notification = await Chat.createNotification({
        user_id: data.receiver_id,
        from_user_id: data.sender_id,
        content: data.content
      });
  
      io.to(`user_${data.receiver_id}`).emit('new_notification', notification);
    });
  
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
});

servidor.listen(port,()=>{
    console.log('Server is running on port: ' + port)
})