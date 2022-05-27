import express from 'express';
import 'dotenv/config'
import routerApi from './routes/index.Routes.js';
import { chatHandler } from './daos/index.daos.js';
import { connectSession } from './config/configDB.js';
import { Server as HttpServer } from 'http';
import { connect, socket } from './sockets.js';

const app = express();



const httpServer = new HttpServer(app);
const io = connect(httpServer);

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './public/views')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectSession(app);
routerApi(app);

socket.io.on('connection', (socket)=>{
    console.log('a user connected');
})

// on("connection", async(socket)=>{
//     console.log("user connected");

//     socket.emit("incommingMessage", await chatHandler.getAll());

//     socket.on("newMessage", async(msg)=>{
//         await chatHandler.saveData(msg);
//         socket.emit("incommingMessage", await chatHandler.getAll());
//     });
// });


    


httpServer.listen( process.env.PORT, ()=> console.log('Server corriendo en puerto', process.env.PORT))

