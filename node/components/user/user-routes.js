var user = require('./user-controller.js');
module.exports = function (app) {

    app.route('/api/v1/users')
            .get(function (req, res) {
                user.readUsers().then(function (output) {
                    res.send(output);
                });
            });
    app.route('/api/v1/users/auth')
            .get(function (req, res) {
                if(req.header('Authorization')){
                    user.authUser(req.header('Authorization')).then(function (data){
                        res.send(data);
                    }, function (response){
                        res.send(response);
                    });
                } else {
                    res.status(400).send({status:false,data:'Authorization Header Missing'});
                }
                
            });
    app.route('/api/v1/users/:id')
            .get(function (req, res) {
                user.readUser(req.params.id).then(function (output) {
                    res.send(output);
                }, function (err) {
                    res.send(err);
                });
            })
            .put(function (req, res) {
                console.log(req.body);
                user.updateUser(req.params.id, req.body).then(function (output){
                    res.send(output);
                });
                //res.send(user.updateUser(req.params.id, req.body));
            })
            .delete(function (req, res) {
                user.deleteUser(req.params.id).then(function (output) {
                    res.send(output);
                });
            });
};