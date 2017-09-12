var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'asdf' });
});

router.get('/canvas', function(req, res, next) {
  res.render('canvas', { title: 'Start a New Project' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Add to a Project' });
});


module.exports = router;
