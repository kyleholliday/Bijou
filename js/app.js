/* jslint browser: true */
/* jslint esnext: true */
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
    // .when('/film', {
    //   controller: 'FilmViewController',
    //   templateUrl: 'sections/film.html',
    // })
    .when('/film/:filmId', {
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
app.controller('MainViewController', ['$scope', '$http', 'FilmService', '$location', function ($scope, $http, FilmService, $location) {
  $scope.nowPlaying = FilmService.getNowPlaying();

  $scope.getMovie = function(movie) {
    // FilmService.setMovie(movie);
    console.log(movie.id);
      var title = $location.path('/film/' + movie.id);
  };
}

]);
//Search View Controller
app.controller('SearchViewController', ['$scope', '$http', 'FilmService', function ($scope, $http, FilmService) {

}
]);

//Film View Controller
app.controller('FilmViewController', ['$scope', '$http', 'FilmService', '$routeParams', function ($scope, $http, FilmService, $routeParams) {
  $routeParams.filmId;
  FilmService.getFilmById($routeParams.filmId).then(function(stuff) {
    console.log(stuff);
    //all the scope stuff is in here
    $scope.movie = stuff;
    let poster = stuff.poster_path;
    $scope.poster = "http://image.tmdb.org/t/p/w500" + poster;
    });
}
]);

//Buzz View Controller
app.controller('BuzzViewController', ['$scope', '$http', 'FilmService', function ($scope, $http, FilmService) {

}
]);
