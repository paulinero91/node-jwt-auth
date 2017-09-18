const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Canvas} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/create', (req, res) => {
  console.log('john')
  return Canvas.create({simple: 'yoyo'})
})
router.get('/', (req, res) => {

  return Canvas
    .find()

    .then(canvases => {res.render("all", {images: canvases, fun: console.log(Date.now()) })})
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};
