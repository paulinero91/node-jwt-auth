const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Simple} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/create', (req, res) => {
  console.log('john')
  return Simple.create({simple: 'yoyo'})
})
router.get('/', (req, res) => {

  return Simple
    .find()

    .then(simples => res.render("index", {title: simples}))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};
