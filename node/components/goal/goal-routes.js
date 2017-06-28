var goal = require('./goal-controller.js');
module.exports = function (app) {

    app.route('/api/v1/goals')
            .post(function (req, res) {
                goal.createGoal(req.body).then(function (output) {
                    res.send(output);
                }, function (err) {
                    res.send(err);
                });
            });

    app.route('/api/v1/goals/user/:uuid/:method')
            .get(function (req, res) {
                goal.getGoalsByMethod(req.params.uuid, req.params.method).then(function (output){
                    res.send(output);
                });
            });

    app.route('/api/v1/goals/goal/:gid')
            .get(function (req, res) {

            })
            .put(function (req, res) {
                goal.updateGoal(req.body).then(function (output){
                    res.send(output);
                });
            })
            .delete(function (req, res) {
                goal.deleteGoal(req.body.uuid, req.params.gid).then(function (output){
                   res.send(output); 
                });
            });
/*
    app.route('/api/v1/goals')
            .get(function (req, res) {
                goal.readGoals().then(function (output) {
                    res.send(output);
                });
                //res.send(goal.readGoals());
            })
            .post(function (req, res) {

            });

    app.route('/api/v1/goals/:goal')
            .get(function (req, res) {
                goal.readGoal(req.params.goal).then(function (output) {
                    res.send(output);
                }, function (err) {
                    res.send(err);
                });
            })
            .put(function (req, res) {
                res.send(goal.updateGoal(req.params.goal, req.body));
            })
            .delete(function (req, res) {
                goal.deleteGoal(req.params.goal).then(function (output) {
                    res.send(output);
                }, function (err) {
                    res.send(err);
                });
            });

    app.route('/api/v1/goals/user/:id')
            .get(function (req, res) {
                goal.readGoalsByUser(req.params.id).then(function (output) {
                    res.send(output);
                }, function (err) {
                    res.send(err);
                });
            });

    app.route('/api/v1/goals/:goal/history')
            .post(function (req, res) {
                res.send(goal.updateGoalHistory(req.params.goal, req.body));
            });*/
};