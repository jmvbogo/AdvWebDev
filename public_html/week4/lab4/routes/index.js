var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C.R.U.D' });
});

router.get('/view', function(req, res, next) {
  res.render('view', { title: 'View' });
});

router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update' });
});

router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Delete' });
});

module.exports = router;
