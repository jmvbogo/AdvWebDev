var express = require('express');
var router = express.Router();
var ctrlEmpl = require('./Empl.controller');

router.get('/employees', ctrlEmpl.emplReadAll);
router.get('/employees/:id', ctrlEmpl.emplReadOne);
router.post('/employees', ctrlEmpl.emplCreate);
router.put('/employees/:id', ctrlEmpl.emplUpdateOne);
router.delete('/employees/:id', ctrlEmpl.emplDeleteOne);


module.exports = router;
