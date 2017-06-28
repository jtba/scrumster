var app = angular.module('Scrumster', ['ui.router', 'angular-growl', 'xeditable', 'ui.bootstrap','angularMoment','ui.calendar']);

app.run(function (editableOptions, $rootScope) {
    editableOptions.theme = 'bs3';

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && !localStorage.getItem('uuid')) {
            event.preventDefault();

            document.location.href = "/login.html";
            // get me a login modal!
        }
    });

});