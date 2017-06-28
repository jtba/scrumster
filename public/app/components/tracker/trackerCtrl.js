app.controller("trackerCtrl", function ($scope, $http, growl, $sce, Config, moment) {
    var uuid = localStorage.getItem("uuid");
    $scope.data = {};
    $scope.manualsave = false;
    $scope.goals_today = [];
    $scope.goals_yesterday = [];
    $scope.goals_backlog = [];

    $scope.getGoals = function () {
        $http.get(Config.apiURL + 'goals/user/' + uuid + '/active').then(function (res) {
            $scope.data.all = res.data;
            sortData();
        }, function errorCallback(res) {
            growl.error("Error: Manual save recommended!!!");
        });
    };

    $scope.createGoal = function (time) {
        switch (time) {
            case 'today':
                angular.merge($scope.newgoal_today, {source: 'manual', status: 'In-Complete', uuid: uuid, worked_on: Date()});
                var req = {
                    url: Config.apiURL + "goals",
                    method: "POST",
                    data: $scope.newgoal_today
                };
                break;
            case 'yesterday':
                angular.merge($scope.newgoal_yesterday, {source: 'manual', type: 'Unplanned', uuid: uuid, worked_on: moment().subtract(1, 'days').startOf('day')._d});
                var req = {
                    url: Config.apiURL + "goals",
                    method: "POST",
                    data: $scope.newgoal_yesterday
                };
                break;
        }

        $http(req).then(function (res) {
            growl.success("Goal Created", {ttl: 2000});
            $scope.getGoals();
        });
    };
    
    $scope.removeGoal = function (goal) {
        var req = {
            method: "DELETE",
            url: Config.apiURL + "goals/goal/" +goal.gid,
            headers: {"Content-Type": "application/json;charset=utf-8"},
            data: {uuid:uuid}
        };
        $http(req).then(function (res){
           growl.success("Removed Goal", {ttl: 2000});
           $scope.getGoals();
        });
    };
    
    $scope.updateGoal = function (goal) {
        var req = {
            url: Config.apiURL + "goals/goal/" +goal.gid,
            method: "PUT",
            data: goal
        };
        $http(req).then(function (res){
            growl.success("Successfully Saved", {ttl: 2000});
            $scope.getGoals();
        });
    };
    
    $scope.workOnGoal = function (goal) {
        $scope.updateGoal({uuid:uuid,gid:goal.gid,worked_on:moment()._d});
    };
    
    /// Get all of the user data and sort it into today, yesterday and backlog
    var sortData = function () {
        var goals = $scope.data.all;
        var temp_today = [], temp_yesterday = [], temp_backlog = [];

        for (i = 0; i < goals.length; i++) {
            if (moment(goals[i].worked_on).isSame(moment(),'d')) {
                temp_today.push(goals[i]);
            } else if (moment(goals[i].worked_on).isSame(moment().subtract(1,'days'),'d')) {
                temp_yesterday.push(goals[i]);
            } else {
                if(goals[i].status !== 'Completed'){
                    temp_backlog.push(goals[i]);
                }
            }
        }
        /// Overwrite existing scope with new data, forcing a reload of data
        $scope.goals_today = angular.copy(temp_today);
        $scope.goals_yesterday = angular.copy(temp_yesterday);
        $scope.goals_backlog = angular.copy(temp_backlog);
    };// ---- End of sortData() ----

    $http.get('app/data/rallyUS.json').then(function (res) {
        $scope.rally = res.data.QueryResult.Results;

    }, function errorCallback(res) {
        growl.error("Error: Could not pull Rally data!");
    });

    $scope.convertToHtml = function (string) {
        return $sce.trustAsHtml(string);
    };

    $scope.copyTask = function (goal) {
        let newtask = {goal: goal.goal, type: goal.type, status: ""};
        $scope.data[1].goals.push(newtask);
        $scope.fakeCall();
    };


});