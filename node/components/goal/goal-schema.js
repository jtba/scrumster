var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    gid: {type: String, required: true},
    created_date: {type: Date, required: true},
    uuid: {type: String, required: true},
    status: {type: String, required: true},
    type: {type: String, required: true},
    source: {type: String, required: true},
    goal: {type: String, required: true},
    worked_on:{type: Date, required: true},
    completed_date: Date,
    change_history:[{date: Date, from_state: String, to_state: String}],
    updated_on: Date
});


var Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;