const { fork } = require('child_process');
const { pid } = require('process');
const { PORT } = require('../config/configDB');

const random = require('express').Router();

random.get('/randoms', (req, res) => {
  let qty = req.query.cant || 100000000;

  const randoms = fork('./utils/calcRandom.js', ['--QTYRECIBED', qty]);

  randoms.on('message', (response) => {
    res.json(
      {"PID": pid,"PORT": PORT,"Randoms Numbs": response});
  });
});

module.exports = random;
