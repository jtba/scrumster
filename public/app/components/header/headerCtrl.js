app.controller("headerCtrl", function ($scope) {
    $scope.firstname = localStorage.getItem("firstname");
    $scope.lastname = localStorage.getItem("lastname");
    $scope.rallyapi = localStorage.getItem("rallyapi");

    $scope.logout = function () {
        localStorage.clear();
        document.location.href = '/login.html';
    };


});