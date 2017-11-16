var express = require('express');
var router = express.Router();
var ctrlEmpl = require('./Empl.controller');

router.get('/Empl', ctrlEmpl.emplReadAll);
router.get('/Empl/:id', ctrlEmpl.emplReadOne);
router.post('/Empl', ctrlEmpl.emplCreate);
router.put('/Empl/:id', ctrlEmpl.emplUpdateOne);
router.delete('/Empl/:id', ctrlEmpl.emplDeleteOne);


module.exports = router;
