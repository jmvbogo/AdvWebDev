
var Empl = require('./Empl.model');
var debug = require('debug')('lab4:Employee');



module.exports.create = function(req, res){
    // debug(req.body)
    
     var msg = '';
        
        Empl.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary,
        })
        .then(function(){
            msg = 'Employee add.';
            return;
        })
        .catch(function(err){        
            msg = 'Error: 0110001001100001011100110110100101100011 - Employee was NOT saved. Please make sure all fields are filled.';
            return err.message;
        }).then(function(err){ //finally
            debug(msg)
            debug(err)
            res.render('index', { 
                title: 'C.R.U.D',
                message : msg,
                error: err
             });
        });   
    
}

module.exports.view = function(req, res){
    
    Empl
        .find()
        .exec()
        .then(function(results){
            debug(results)
             res.render('view', { 
                 title: 'View Results',
                 results : results
             });
        });

};

module.exports.update = function(req, res){
    
    var id = req.params.id;
    var msg = '';
    
    if (req.method === 'POST') {
         
        id = req.body._id;

        Empl
            .findById(id)
            .exec() 
            .then(function(reviewData) {
                // figure out why the data is not saving.
                debug(req.body);
                reviewData.firstName = req.body.firstName;
                reviewData.lastName = req.body.lastName;
                reviewData.department = req.body.department;
                reviewData.startDate = new Date(req.body.startDate + ' EST');
                reviewData.jobTitle = req.body.jobTitle;
                reviewData.salary = req.body.salary;

                return reviewData.save();
                                
            })
            .then(function(){                
                msg = 'Employee has been updated.';
                return
            })
            .catch(function(err){              
                msg = 'Error: 0110001001100001011100110110100101100011 - Employee data has NOT been updated';
                return
            })           
            .then(function(){
                finish()
            });
    }else {
        finish()
    }
     
     function finish(){ 
        Empl
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

module.exports.delete = function(req, res){
    
    var id = req.params.id,
         removed = '';
 
    Empl.remove({ _id: id })
        .then(function(){            
            removed = `${id} has been removed`;
            return;
        })
        .catch(function (err) {            
            removed = `${id} has not been removed`;
            return err; 
        })      
        .then( (err)=> {
            res.render('delete', { 
                removed : removed
            });
        });
};