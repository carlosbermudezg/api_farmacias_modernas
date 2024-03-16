const app = require('./app');

const port = 3000
const server = async ()=>{
    app.listen(port)
    console.log('Server Running')
}

server()