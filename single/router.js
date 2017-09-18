const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Canvas} = require('../canvas/models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', function(req, res, next) {
	console.log('hi')
  	//Canvas.create({simple: 'yoyo'}, function(a,b){ console.log(a,b) })
	var obj = {simple: 'yoyo'}; 
	let id = ""; 
  	Canvas.create(obj, function(err, yo){ 
		
		console.log(err)
	       if (err) return; 
		console.log('sup')
		console.log(yo._id)
		id = yo._id; 
	

		res.redirect(`new/canvas/${id}`)

	})
		
});


router.get('/canvas/:id', function(req, res, next) {
	console.log('in heresss') 
	console.log(req.params.id);
	Canvas.find({'_id':req.params.id}, function(err, r){
		console.log('u')
		//console.log(r);
		//res.render('canvas', { canvas: r[0].canvas}); for editing? 
		var data = r;
		res.render('canvas',{title:'ew', canvas:data})
	
	})


})

/*
collection.insert(objectToInsert, function(err){
   if (err) return;
   // Object inserted successfully.
   var objectId = objectToInsert._id; // this will return the id of object inserted
});
*/



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
