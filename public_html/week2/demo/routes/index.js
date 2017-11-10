var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jordan-Michael' });
});

router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Jordan-Michael' });
});

router.post('/form', function(req, res, next) {
  res.render('form', { title: req.body.email });
});

module.exports = router;
