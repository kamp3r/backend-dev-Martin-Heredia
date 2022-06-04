import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processRouter = express.Router();

//process argv

const args = process.argv.length > 2 ? process.argv.slice(2).join(',') : 'Null';

const options = [
  {
    argument: args,
    so: process.platform,
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

processRouter.get('/randoms', async(req, res) => {
    const num = req.query.cant || 100;
    const randoms = fork('./utils/calcRandom.js', [num]);
    
    randoms.send("start");
  
    randoms.on("error", (err) => {
      console.log(`Error en child process 'random' ${err}`);
    });
  
    randoms.on("message", (obj) => {
      return res.json(obj);
    });
  });

export default processRouter;
