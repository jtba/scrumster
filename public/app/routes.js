app.config(function ($stateProvider) {
    $stateProvider
            .state('home', {
                url: "",
                templateUrl: "app/components/home/home.html",
                controller: "homeCtrl",
                data:{requireLogin:true}
            })
            .state('tracker', {
                url: "tracker",
                templateUrl: "app/components/tracker/tracker.html",
                controller: "trackerCtrl",
                data:{requireLogin:true}
            })
            .state('history', {
                url: "history",
                templateUrl: "app/components/history/history.html",
                controller: "historyCtrl",
                data:{requireLogin:true}
            })
            .state('profile', {
                url: "profile",
                templateUrl: "app/components/profile/profile.html",
                controller: "profileCtrl",
                data:{requireLogin:true}
            })
            .state('bauschedule', {
                url: "bauschedule",
                templateUrl: "app/components/bauschedule/bauschedule.html",
                controller: "bauscheduleCtrl",
                data:{requireLogin:true}
            });
});