app.controller("bauscheduleCtrl", function ($scope, $http, growl, Config, moment, $uibModal) {

    $scope.new_event = {};
    $scope.events = [];

// -------- CRUD Services --------- //
    $scope.createEvent = function () {
        var req = {
            url: Config.apiURL + 'calendar',
            method: "POST",
            data: $scope.new_event
        };
        $http(req).then(function (res) {
            growl.success("Added Event", {ttl: 2000});
            $scope.getEvents();
        });
    };

    $scope.getEvents = function () {
        $http.get(Config.apiURL + 'calendar').then(function (res) {
            angular.copy(res.data, $scope.events);
        });
    };

    $scope.eventModal = function (event) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/components/bauschedule/calendarModal.html',
            controller: 'calendarModal',
            resolve: {
                eventObj: function () {
                    return event;
                }
            }
        });
        modalInstance.result.then(function (output) {
            // Add functionality based on what is returned
            switch (output) {
                case "update":
                    $scope.getEvents();
                    growl.success("Updated Event", {ttl: 2000});
                    break;
                case "delete":
                    $scope.getEvents();
                    growl.danger("Removed Event", {ttl: 2000});
                    break;
            }
            console.log('Promise Resolve:' + output);
        }, function (dismissed_msg) {
            console.log("Modal Dismissed with: " + dismissed_msg);
        });
    };

    $scope.dropUpdateEvent = function (event) {
        var req = {
            url: Config.apiURL + "calendar",
            method: "PUT",
            data: event
        };
        $http(req).then(function (res) {
            $scope.getEvents();
            growl.success("Updated Event", {ttl: 2000});
        });
    };

    // -------- Date Picker -------- //

    $scope.start = "";
    $scope.start_popup = {};
    $scope.end_popup = {};

    $scope.start_picker = function () {
        $scope.start_popup.opened = true;
    };

    $scope.end_picker = function () {
        $scope.end_popup.opened = true;
    };
// -------- Calendar -------- //
    $scope.calendarDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log(event.start._d);
        console.log("Delta: " + delta);
        console.log(event);
    };

    $scope.uiConfig = {
        calendar: {
            height: 800,
            editable: true,
            eventDrop: $scope.dropUpdateEvent,
            eventClick: $scope.eventModal
        }
    };

    $scope.eventSources = [$scope.events];
});

app.controller("calendarModal", function ($scope, $http, Config, moment, $uibModalInstance, eventObj) {

    $scope.event = eventObj;

    // -------- Date Picker -------- //

    //$scope.start = "";
    $scope.start_popup = {};
    $scope.end_popup = {};

    $scope.start_picker = function () {
        $scope.start_popup.opened = true;
    };

    $scope.end_picker = function () {
        $scope.end_popup.opened = true;
    };


    $scope.updateEvent = function () {
        console.log(event);
        var req = {
            url: Config.apiURL + "calendar",
            method: "PUT",
            data: event
        };
        $http(req).then(function (res) {
            $uibModalInstance.close('update');
        });
    };

    $scope.deleteEvent = function () {
        var req = {
            method: "DELETE",
            url: Config.apiURL + "calendar/"+event.eid,
            headers: {"Content-Type": "application/json;charset=utf-8"}
            //data: {eid: event.eid}
        };
        $http(req).then(function (res) {
            $uibModalInstance.close('delete');
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss("Send something back in a rejected state");
    };


});