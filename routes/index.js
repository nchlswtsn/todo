var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/Task');

router.get('/tasks', function(req, res, next){
  Task.find(function(err, tasks){
    if(err){
      return next(err);
    }
    res.json(tasks);
  });
});

router.post('/tasks', function(req, res, next){
  var task = new Task(req.body);

  task.save(function(err, task){
    if(err){
      return next(err);
    }
    res.json(task);
  });
});

// router.param('task', function(req, res, next, id) {
//   var query = Task.findById(id);
//
//   query.exec(function(err, task){
//     if (err) {
//       return next(err);
//     }
//     if (!task) {
//       return next(new Error('Can\'t find task'));
//     }
//     req.task = task;
//     return next();
//   });
// });

router.put('/tasks/:taskId', function(req, res, next){
  console.log('WORKING');
  Task.findById(req.params.taskId, function(err, task){
    task.complete = !task.complete;
    task.save(function(err, savedTask){
      res.send(savedTask);
    });
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
