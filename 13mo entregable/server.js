const express = require('express');
require('dotenv').config();
const { PORT } = require('./config/configDB.js');
const HttpServer = require('http').Server;
const { connect } = require('./sockets/sockets.js');
const os = require('os')
const appMiddlewares = require('./middlewares/appMiddlewares.js');
const cluster = require('cluster')
require('./passport/auth-local.js');


const clusterProcess = process.argv[3] == 'cluster'

if (cluster.isPrimary && clusterProcess) {
  console.log(`Cluster Primario con PID ${process.pid} esta inicializado`);

  //fork workers
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  //listen for dying workers
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} se ha muerto`);
  });
} else {
  const app = express();
  const httpServer = new HttpServer(app);
  connect(httpServer);
  appMiddlewares(app);

  httpServer.listen(PORT, () =>
    console.log(`Server corriendo en el puerto ${PORT}, con el PID ${process.pid}`)
  );
}
