const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Canvas} = require('../canvas/models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', function(req, res, next) {
	console.log('hi')
  	Canvas.create({simple: 'yoyo'})
	
	res.render('canvas', { title: 'new' });
});



/*
router.get('/new', (req, res) => {
  console.log('john')
  return Canvas.create({simple: 'yoyo'})
})
router.get('/', (req, res) => {

  return Canvas
    .find()
    .then(simples => res.render("index", {title: simples}))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});
*/

module.exports = {router};
