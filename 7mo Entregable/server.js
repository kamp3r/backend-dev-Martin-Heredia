import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import ProductsClass from './class/productsClass.js';
import ChatHandler from './class/chatClass.js';
const PORT = process.env.PORT || 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const storageProducts = new ProductsClass('products_table');
const storageChat = new ChatHandler('chat_db');

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
;});
    

    
io.on('connection', async (socket) => {
    console.log('¡Nuevo cliente conectado!');
    
    socket.emit('products', await storageProducts.getAll());
    
    socket.on('newProd', async (product) => {
        storageProducts.save(product);
        io.sockets.emit('products', await storageProducts.getAll());
    });
    
    socket.emit('messages', await storageChat.getAllFrom());
    
    socket.on('newMessage', async (message) => {
       message.date = new Date().toLocaleString();
        await storageChat.saveChat(message);
        io.sockets.emit('messages', await storageChat.getAllFrom());
    });
});
    

httpServer.listen( PORT, ()=> console.log('Server corriendo en puerto', PORT))

