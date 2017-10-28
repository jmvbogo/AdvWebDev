var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var size = req.body.gridSize;
    
        console.log(req.body.gridSize);
    
      var cells = [
        {colors: 'testclr'+size},
        {colors: 'testclr2'},
        {colors: 'testclr3'},
        {colors: 'testclr4'},
        {colors: 'testclr5'},
        {colors: 'testclr6'},
        {colors: 'testclr7'},
        {colors: 'testclr8'},
        {colors: 'testclr9'}
    ];
    res.render('index', {title: "Rando Colors", results : cells});
});



module.exports = router;
