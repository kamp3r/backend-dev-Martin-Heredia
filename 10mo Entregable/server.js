import express from 'express';
import 'dotenv/config'
import routerApi from './routes/index.Routes.js';
import { connectSession } from './config/configDB.js';
import { Server as HttpServer } from 'http';
import { connect } from './sockets.js';

const app = express();



const httpServer = new HttpServer(app);
connect(httpServer);

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './public/views')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectSession(app);
routerApi(app);


httpServer.listen( process.env.PORT, ()=> console.log('Server corriendo en puerto', process.env.PORT))

