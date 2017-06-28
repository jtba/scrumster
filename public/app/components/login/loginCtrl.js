app.controller("loginCtrl", function ($scope, $http,growl) {
    $scope.login = "";
    $scope.usedetails;


    var setUserSession = function (data) {
        return new Promise(function (resolve, reject) {
            try {
                localStorage.setItem("uuid", data.uuid);
                localStorage.setItem("firstname", data.firstname);
                localStorage.setItem("email", data.email);
                localStorage.setItem("lastname", data.lastname);
                localStorage.setItem("rallyapi", data.rallyapi);
                resolve(true);
            }
            catch(err) {
                reject(err);
            }
        });
    };

    $scope.userLogin = function () {
        var user = $scope.login.user + "@dish.com";
        var basicauth = "Basic " + btoa(user + ":" + $scope.login.password);

        var req = {
            method: "GET",
            url: 'http://localhost:9000/api/v1/users/auth',
            headers: {
                Authorization: basicauth
            }
        };

        $http(req).then(function (output) {
            //Hack for now. Need to send back an appropriate response instead of using data.data[0].
            setUserSession(output.data.data[0]).then(function (output) {
                
                if(!output){
                    growl.error("Error: " + output, {ttl: 2000});
                } else {
                    document.location.href = "/";
                }
            });
        }, function (err) {
            growl.error("Error: " + err.data, {ttl: 2000});
        });
    };



});