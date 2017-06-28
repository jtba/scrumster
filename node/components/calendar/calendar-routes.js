var calendar = require('./calendar-controller.js');

module.exports = function (app) {

    app.route('/api/v1/calendar')
            .get(function (req, res) {
                calendar.getEvents().then(function (output) {
                    res.send(output);
                });
            })
            .post(function (req, res) {
                calendar.createEvent(req.body).then(function (output) {
                    res.send(output);
                }, function (err) {
                    res.send(err);
                });
            })
            .put(function (req, res) {
                calendar.updateEvent(req.body).then(function (output) {
                    console.log(output);
                    res.send(output);
                });
            });
    app.route('/api/v1/calendar/:eid')
            .delete(function (req, res) {
                calendar.deleteEvent(req.params.uuid).then(function (res) {
                    res.send(res);
                });
            });
};