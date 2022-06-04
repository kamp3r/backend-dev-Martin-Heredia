import express from 'express';
import 'dotenv/config';
import { PORT } from './config/configDB.js';
import { Server as HttpServer } from 'http';
import { connect } from './sockets/sockets.js';
import appMiddlewares from './middlewares/appMiddlewares.js';

import './passport/auth-local.js';

const app = express();
const httpServer = new HttpServer(app);
connect(httpServer);
appMiddlewares(app);


httpServer.listen(PORT, () =>
  console.log('Server corriendo en puerto', PORT)
);
