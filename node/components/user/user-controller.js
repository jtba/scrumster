var User = require('./user-schema.js');
var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports.authUser = function (user) {
    var options = {
        method: "GET",
        url: "<your auth service>",
        headers: {Authorization: user}
    };

    return new Promise(function (resolve, reject) {
        request(options, function (err, res, body) {
            var resbody = JSON.parse(body);
            if (res.statusCode !== 200)
                return reject({status:false,message:"Incorrect Username",data:resbody});
            // --- Check if user is in Mongo ---
            readUserBySam(resbody.user.sAMAccountName).then(function (data) {
                if (data.length !== 0) {
                    resolve({data:data, status:true});
                } else { // --- If not in mongo, create the user ---
                    console.log("executed create user");
                    createUser(resbody).then(function (data) {
                        resolve({data:data,status:true});
                    }, function(err){
                       return reject("Something bad happened:" +err);
                    }); // ---- End of Create a user in mongo ----
                }
            },function(err){
                console.log("I'm in error");
                resolve("Oh noes!!!"+err);
            }); // ---- End of User Find in Mongo ----
        });
    });
};

module.exports.readUsers = function () {
    return User.find({});
};

module.exports.readUser = function (uuid) {
    return User.findOne({uuid: uuid}).exec();
};

module.exports.updateUser = function (uuid, data) {
    return User.findOneAndUpdate({uuid: uuid}, data).exec();
};

module.exports.deleteUser = function (uuid) {
    return User.findOneAndUpdate({uuid: uuid});
};

var readUserBySam = function (user) {
    return User.find({samaccountname: user});
};

var createUser = function (ldap) {
    //create a user in Mongo from the data retrieved by ldap api
    var newUser = new User({
        uuid: "" + Math.floor((Math.random() * 99999999999) + 1),
        created_date: Date(),
        samaccountname: ldap.user.sAMAccountName,
        email: ldap.user.mail,
        firstname: ldap.user.givenName,
        lastname: ldap.user.sn,
        groups: ldap.grps,
        rallyapi: ''
    });
    return newUser.save();
};
