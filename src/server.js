const app = require('./app');

const port = 80
const server = async ()=>{
    app.listen(port)
    console.log('Server Running')
}

server()