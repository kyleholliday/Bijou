var angular = require('angular');
var angularRoute = require('angular-route');
require('./service');

var app = angular.module('BijouApp', ['ngRoute', 'FilmService']);

// Router
app.config(['$routeProvider', function ($routeProvider){
  $routeProvider
    .when('/main', {
      controller: 'MainViewController',
      templateUrl: 'sections/main.html',
    })
    .when('/search', {
      controller: 'SearchViewController',
      templateUrl: 'sections/search.html',
    })
    .when('/film', {
      controller: 'FilmViewController',
      templateUrl: 'sections/film.html',
    })
    .when('/buzz', {
      controller: 'BuzzViewController',
      templateUrl: 'sections/buzz.html',
    })
    .otherwise({
      redirectTo: '/main',
    });
}]);
//Main Feed controller
app.controller('MainViewController', ['$scope', '$http', 'FilmService', function ($scope, $http, FilmService) {

}
]);
//Search View Controller
app.controller('SearchViewController', ['$scope', '$http', 'FilmService', function ($scope, $http, FilmService) {

}
]);
//Film View Controller
app.controller('FilmViewController', ['$scope', '$http', 'FilmService', function ($scope, $http, FilmService) {

}
]);
//Buzz View Controller
app.controller('BuzzViewController', ['$scope', '$http', 'FilmService', function ($scope, $http, FilmService) {

}
]);
