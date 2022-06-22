const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const os = require('os');
const processRouter = require('express').Router();

//process argv

const args = process.argv.length > 2 ? process.argv.slice(2).join(',') : 'Null';

const options = [
  {
    argument: args,
    so: process.platform,
    cores: os.cpus().length,
    versionNode: process.version,
    memory: Math.round(process.memoryUsage().rss) / 1024,
    execPath: process.execPath,
    processID: process.pid,
    projectPath: process.cwd(),
  },
];

processRouter.get('/info', (req, res, next) => {
  res.render('info', { options });
});

//random operation

module.exports = processRouter;
