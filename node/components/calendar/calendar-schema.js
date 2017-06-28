var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    eid: {type: String, required: true},
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: false},
    type: {type: String, required: true}
});


var Event = mongoose.model('Event', EventSchema);

module.exports = Event;