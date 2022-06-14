import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import os from 'os'
const processRouter = express.Router();

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

processRouter.get('/info', isAuthenticated, (req, res, next) => {
  res.render('info', { options });
});

//random operation



export default processRouter;
