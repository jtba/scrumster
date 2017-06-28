var Event = require('./calendar-schema.js');

module.exports.createEvent = function (data) {
    var newEvent = new Event({
        eid: "" + Math.floor((Math.random() * 99999999999) + 1),
        title: data.title,
        start: data.start,
        end: data.end,
        type: data.type
    });
    return newEvent.save();
};

module.exports.getEvents = function (){
    return Event.find({}, function (err, goals) {
        if (err)
            return err;
        return goals;
    });
};

module.exports.updateEvent = function (event) {
    return Event.findOneAndUpdate({eid: event.eid}, event).exec();
};

module.exports.deleteEvent = function (eid) {
    return Event.findOneAndRemove({eid: eid}, function (err) {
        if (err)
            return err;
        return true;
    });
};