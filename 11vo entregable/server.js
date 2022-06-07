import express from 'express';
import 'dotenv/config';
import { Server as HttpServer } from 'http';
import { connect } from './sockets/sockets.js';
import appMiddlewares from './middlewares/appMiddlewares.js';

import './passport/auth-local.js';

const app = express();
const httpServer = new HttpServer(app);
connect(httpServer);
appMiddlewares(app);

httpServer.listen(process.env.PORT, () =>
  console.log('Server corriendo en puerto', process.env.PORT)
);
