var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    uuid: {type: String, required: true},
    created_date: {type: Date, required: true},
    samaccountname:{type: String, required: true},
    email:String,
    firstname:String,
    lastname:String,
    rallyapi:String,
    groups:[],
    updated_on: Date
});


var User = mongoose.model('User', UserSchema);

module.exports = User;