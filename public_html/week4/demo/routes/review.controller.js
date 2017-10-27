
var Review = require('./review.model');
var debug = require('debug')('demo:review');

module.exports.home = function(req, res){
        
    if (req.method === 'POST') {
        
       var msg = '';
        
        Review.create({ //creates new document in the db table "Review"
          author: req.body.name,
          rating: req.body.rating,
          reviewText: req.body.review
        })
        .then(function(){ //try
            msg = 'Review was Saved';
            return;
        })
        .catch(function(err){ //catch          
            msg = 'Review was not Saved';
            return err.message;
        }).then(function(err){ //finally
            res.render('index', { 
                title: 'home',
                message : msg,
                error: err
             });
        });   
              
    } else { //move on
        res.render('index', { 
            title: 'home',
            message : ''
        }); 
    }
     
};

module.exports.view = function(req, res){
    
    Review
        .find()
        .exec()
        .then(function(results){
             res.render('view', { 
                 title: 'View Results',
                 results : results
             });
        });

};

module.exports.delete = function(req, res){
    
    var id = req.params.id,
         removed = '';
 
    Review.remove({ _id: id })
        .then(function(){            
            removed = `${id} has been removed`;
            return;
        })
        .catch(function (err) {            
            removed = `${id} has not been removed`;
            return err; 
        })
        //newer way to create/call a function        
        .then( (err)=> {
            res.render('delete', { 
                removed : removed
            });
        });
};


module.exports.update = function(req, res){
    
    var id = req.params.id;
    var msg = '';
    
    if (req.method === 'POST') {
         
        id = req.body._id;

        Review
            .findById(id)
            .exec() 
            .then(function(reviewData) {
                // figure out why the data is not saving.
                debug(req.body);
                reviewData.author = req.body.name;
                reviewData.rating = req.body.rating;
                reviewData.reviewText = req.body.review;

                return reviewData.save();
                                
            })
            .catch(function(){
                msg = 'data has NOT been updated';
                return
            })
            .then(function(){
                msg = 'data has been updated';
                return
            })
            .then(function(){
                finish()
            });
    }else {
        finish()
    }
     
     function finish(){ 
        Review
        .findOne({ '_id': id })
        .exec()
        .then(function(results){    
            res.render('update', { 
                title: 'Update Results',
                message: msg,
                results : results
            });
        })
        .catch(function(){
            res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        });
     }
};