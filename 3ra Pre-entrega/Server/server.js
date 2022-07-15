const express = require("express");
const appMiddleware = require("./middlewares/app.middleware");
const { PORT } = require("./config/config");
const { connect } = require("./sockets/sockets.js");
const logger = require("./logger/logger.js");
const os = require("os");
const HttpServer = require("http").Server;
const cluster = require("cluster");

const app = express();
const clusterProcess = process.argv[3] == "cluster";

if (cluster.isPrimary && clusterProcess) {
  logger.info(`Cluster Primario con PID ${process.pid} esta inicializado`);

  //fork workers
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  //listen for dying workers
  cluster.on("exit", (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} se ha muerto`);
  });
} else {
  appMiddleware(app);
  const httpServer = new HttpServer(app);
  connect(httpServer);

  httpServer.listen(PORT, () =>
    logger.info(
      `Server corriendo en el puerto ${PORT}, con el PID ${process.pid}`
    )
  );
}
