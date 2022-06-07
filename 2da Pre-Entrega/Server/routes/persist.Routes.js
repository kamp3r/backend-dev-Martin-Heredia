import { Router } from 'express';
import { promises as fs } from 'fs';
import 'dotenv/config';
import configDB from '../config/configDB.js';

const persistRoute = Router();

persistRoute.get('/', async (req, res) => {
  res.json(configDB.DBSwitch);
});

persistRoute.post('/', async (req, res) => {
  const db = req.body.persist;
  const write = await fs.writeFile('.env', `DATABASE=${db}`);
});

export default persistRoute;
