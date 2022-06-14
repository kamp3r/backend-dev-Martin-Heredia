import express from 'express';
import { fork } from 'child_process';

const random = express.Router();

random.get('/randoms', (req, res) => {
  let qty = req.query.cant || 100000000;

  const randoms = fork('./utils/calcRandom.js', ['--QTYRECIBED', qty]);

  randoms.on('message', (response) => {
    res.json(response);
  });
});

export default random;
