var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  date: {type: String},
  task: {type: String, required: true, default: "New Task"},
  complete: {type: Boolean, default: false}
});

module.exports = mongoose.model('Task', TaskSchema);
