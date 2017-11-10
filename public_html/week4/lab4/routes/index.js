var express = require('express');
var router = express.Router();
var emplCtrl = require('./empl.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C.R.U.D' });
});

router.post('/', emplCtrl.create);

router.get('/view', emplCtrl.view);

router.get('/update/:id?', emplCtrl.update);

router.post('/update/:id?', emplCtrl.update);

router.get('/delete/:id?', emplCtrl.delete);

module.exports = router;
