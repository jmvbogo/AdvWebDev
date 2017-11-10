var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HELLO WORLD' });
});

router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Form' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});


router.post('/form', function(req, res, next) {
  res.render('results', { title: 'Results', title1: req.body.name, title2: req.body.email, title3: req.body.comment });
});


module.exports = router;
