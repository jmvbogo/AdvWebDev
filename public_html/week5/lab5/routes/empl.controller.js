
var Empl = require('./Empl.model');
var debug = require('debug')('lab5:Employee');

function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.emplReadAll = function(req, res) {
        
    debug('Getting all Employees');
    Empl
     .find()
     .exec()
     .then(function(results){
        sendJSONresponse(res, 200, results);
     })
     .catch(function(err){
        sendJSONresponse(res, 404, err);         
     });
    
};

module.exports.emplReadOne = function(req, res) {
    
    if (req.params && req.params.id) {
        debug('Getting single employee with id =', req.params.id );
        
        Empl
        .findById(req.params.id)
        .exec()
        .then(function(results){
            sendJSONresponse(res, 200, results);
        }).catch(function(err){
            sendJSONresponse(res, 404, {
                "message": "Employee ID not found"
            });
        });

    } else {
        sendJSONresponse(res, 404, {
            "message": "Employee ID not found"
        });
    }
};

module.exports.emplCreate = function(req, res) {
    
    debug('Creating a employee with data ', req.body);
    
    Empl.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary,     
    })
    .then(function(dataSaved){
        debug(dataSaved);
        sendJSONresponse(res, 201, dataSaved);
    })
    .catch(function(err){ 
        debug(err);
        sendJSONresponse(res, 400, err);
    });
     
};

module.exports.emplUpdateOne = function(req, res) {
    
  if ( !req.params.id ) {
    sendJSONresponse(res, 404, {
        "message": "Not found, emplyee ID is required"
    });
    return;
  }
  
  Empl
    .findById(req.params.id)
    .exec()
    .then(function(reviewData) {        
        reviewData.firstName = req.body.firstName,
        reviewData.lastName = req.body.lastName,
        reviewData.department = req.body.department,
        reviewData.startDate = req.body.startDate,
        reviewData.jobTitle = req.body.jobTitle,
        reviewData.salary = req.body.salary;

        return reviewData.save();
    })
    .then(function(data){
        sendJSONresponse(res, 200, data);
    })
    .catch(function(err){
        sendJSONresponse(res, 400, err);
    });
        
};

module.exports.emplDeleteOne = function(req, res) {
  if ( !req.params.id ) {
    sendJSONresponse(res, 404, {
        "message": "Not found, Employee ID is required"
    });
    return;
  }
  
  Empl
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(function(data){
        debug("Employee " + req.params.firstName + " has been deleted");
        debug(data);
        sendJSONresponse(res, 204, null);
    })
    .catch(function(err){
        sendJSONresponse(res, 404, err);
    });
    
};