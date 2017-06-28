var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.Promise = global.Promise;
app.use(cors());
app.use(bodyParser.json());
require('./components/goal/goal-routes')(app);
require('./components/user/user-routes')(app);
require('./components/calendar/calendar-routes')(app);

mongoose.connect('mongodb://localhost/scrumster');

app.listen(9000, function () {
	console.log('Listening on 9000');
});
