var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HELLO WORLD' });
});

router.get('/form.pug', function(req, res, next) {
  res.render('form', { title: 'Form' });
});

router.get('/about.pug', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/results.pug', function(req, res, next) {
  res.render('results', { title: 'Results' });
});

router.post('/results.pug', function(req, res, next) {
  res.render('results', { title1: req.body.name });
});

router.post('/results.pug', function(req, res, next) {
  res.render('results', { title2: req.body.email });
});

router.post('/results.pug', function(req, res, next) {
  res.render('results', { title3: req.body.comment });
});


module.exports = router;
