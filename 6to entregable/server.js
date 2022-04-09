const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer} = require('socket.io');
const ApiRestful = require('./controllers/apicontrolers.js');
const FileHandler = require('./controllers/fileHandler.js');
const PORT = 8080 || process.env.PORT;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    
const products = new ApiRestful();
const msgSaved = new FileHandler('messageStorage.json');
    
io.on('connection', async (socket) => {
    console.log('¡Nuevo cliente conectado!');
    
    socket.emit('products', products.getObjects());
    
    socket.on('newProd', (product) => {
        products.addObject(product);
        io.sockets.emit('products', products.getObjects());
    });
    
    socket.emit('messages', await msgSaved.getAllFrom());
    
    socket.on('newMessage', async (message) => {
       message.date = new Date().toLocaleString();
        await msgSaved.save(message);
        io.sockets.emit('messages', await msgSaved.getAllFrom());
    });
});
    

httpServer.listen( PORT, ()=> console.log('Server corriendo en puerto', PORT))

