const IOServer = require('socket.io').Server;
const { chatHandler } = require('../daos');
const logger = require("../logger/logger.js");

const connect = (server) => {
  const io = new IOServer(server);

  io.on('connection', async (socket) => {
  logger.info('user connected');

    socket.emit('incommingMessage', await chatHandler.getAll());

    socket.on('newMessage', async (msg) => {
      await chatHandler.saveData(msg);
      socket.emit('incommingMessage', await chatHandler.getAll());
    });
  });
};

module.exports = { connect };
