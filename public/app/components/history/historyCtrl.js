app.controller("historyCtrl", function ($scope, $http, Config) {
    var uuid = localStorage.getItem("uuid");
    $scope.goals = [];
    
    $scope.getGoals = function () {
        var req = {
            url: Config.apiURL + "goals/user/"+uuid+"/all",
            method: "GET"
        };
        $http(req).then(function (res){
            $scope.goals = angular.copy(res.data);
        });
    };

});