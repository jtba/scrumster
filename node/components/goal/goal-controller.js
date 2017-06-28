var Goal = require('./goal-schema.js');
//URI: api/v1/goals/user/:uuid
//Method: Post
module.exports.createGoal = function (data) {
    var newGoal = new Goal({
        gid: "" + Math.floor((Math.random() * 99999999999) + 1),
        created_date: Date(),
        uuid: data.uuid,
        status: data.status,
        type: data.type,
        source: data.source,
        goal: data.goal,
        worked_on: data.worked_on
    });
    return newGoal.save();
};
//URI: api/v1/goals/user/:uuid/:method
//Method: Get
module.exports.getGoalsByMethod = function (uuid, method) {
    switch (method) {
        case 'all':
            return Goal.find({uuid: uuid}, function (err, goals) {
                if (err)
                    return err;

                return goals;
            });
            break;
        case 'active':
            return Goal.find({uuid: uuid}, function (err, goals){
                if (err)
                    return err;
                
                return goals;
            }).where('status').ne('Archived');
            break;
        case 'today':
            return Goal.find({uuid: uuid}, function (err, goals) {
                if (err)
                    return err;

                return goals;
            });
            break;
        case 'yesterday':
            console.log("Today");
            break;
        case 'backlog':
            console.log("Backlog");
            break;
    }
};

module.exports.readGoals = function () {
    return Goal.find({}, function (err, goals) {
        if (err)
            return err;
        return goals;
    });
};

module.exports.readGoalsByUser = function (user) {
    return Goal.find({created_by: user}, function (err, goals) {
        if (err)
            return err;
        return goals;
    });
};

module.exports.readGoal = function (uid) {
    return Goal.find({uid: uid}, function (err, goal) {
        if (err)
            return err;
        return goal;
    });
};

module.exports.updateGoal = function (goal) {
    return Goal.findOneAndUpdate({uuid: goal.uuid, gid: goal.gid}, goal).exec();
};

module.exports.updateGoalHistory = function (uuid, update) {
    return Goal.findOneAndUpdate(
            {uuid: uuid},
            {$push: {"change_history": update}},
            {safe: true, upsert: true, new : true}, function (err, object) {
        if (err)
            return err;
        console.log(object);
        return object;
    });
};

module.exports.deleteGoal = function (uuid, gid) {
    return Goal.findOneAndUpdate({uuid: uuid, gid: gid}, {status:'Archived'}).exec();
    /*return Goal.findOneAndRemove({uuid: uuid, gid: gid}, function (err) {
        if (err)
            return err;
        return true;
    });*/
};