import express from 'express';
import routerApi from './routes/index.Routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { chatHandler } from './daos/index.daos.js';
const PORT = process.env.PORT || 8080;

const app = express();

routerApi(app);

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
;});

io.on("connection", async(socket)=>{
    console.log("user connected");

    socket.emit("incommingMessage", await chatHandler.getAll());

    socket.on("newMessage", async(msg)=>{
        await chatHandler.saveData(msg);
        socket.emit("incommingMessage", await chatHandler.getAll());
    });
});
    


httpServer.listen( PORT, ()=> console.log('Server corriendo en puerto', PORT))

