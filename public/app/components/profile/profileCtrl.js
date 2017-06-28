app.controller("profileCtrl", function ($scope, $http, growl, Config, moment) {
    $scope.rallyapi = localStorage.getItem("rallyapi");
    $scope.uuid = localStorage.getItem("uuid");
    $scope.firstname = localStorage.getItem("firstname");
    $scope.lastname = localStorage.getItem("lastname");
    $scope.goals_completed = [];
    $scope.goals_backlog = [];
    
    $scope.saveKey = function () {
        var req = {
            method: "PUT",
            url: Config.apiURL + "users/" +$scope.uuid,
            data: {rallyapi:$scope.rallyapi}
        };
        $http(req).then(function (res){
            localStorage.setItem("rallyapi", $scope.rallyapi);
            growl.success("Saved Profile", {ttl: 2000});
        });
    };
    
    $scope.getGoals = function () {
        var req = {
            method: "GET",
            url: Config.apiURL + "goals/user/"+$scope.uuid+"/active"
        };
        $http(req).then(function (res){
            console.log(res.data.length);
           for (i=0;i < res.data.length;i++){
               console.log("Looping through");
               if(moment(res.data[i].worked_on).diff(moment(),'days') < -1 && res.data[i].status !== 'Completed') {
                   $scope.goals_backlog.push(res.data[i]);
                   console.log("backlog added");
               }else if (res.data[i].status === 'Completed') {
                   $scope.goals_completed.push(res.data[i]);
                   console.log("completed added");
               }
           };
        });
    };
    
    $scope.goalsBacklog = function () {
        return 30;
    };
});