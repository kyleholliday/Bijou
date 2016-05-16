/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularRoute = require('angular-route');
var moment = require('moment');
require('./service');

var app = angular.module('BijouApp', ['ngRoute', 'FilmModule']);

//Router
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/main', {
    controller: 'MainViewController',
    templateUrl: 'sections/main.html',
  })
  .when('/search/:query', {
    controller: 'SearchViewController',
    templateUrl: 'sections/search.html',
  })
  .when('/film/:filmId', {
    controller: 'FilmViewController',
    templateUrl: 'sections/film.html',
  })
  .otherwise({
    redirectTo: '/main',
  });
}]);

//Main Feed View controller
app.controller('MainViewController', ['$scope', '$http', 'FilmService', '$location', function($scope, $http, FilmService, $location) {
  $scope.nowPlaying = FilmService.getNowPlaying();
  $scope.upcoming = FilmService.getUpcoming();
  $scope.picks = [1,2,3];
  Promise.all([FilmService.getFilmById(270303),FilmService.getFilmById(205596),FilmService.getFilmById(37799),FilmService.getFilmById(264644),FilmService.getFilmById(295699),]).then(function(picks) {
    $scope.picks = picks;
    $scope.$apply();
  });
  $scope.getMovie = function(search) {
    var title = $location.path('/film/' + search.id);
  };
}]);

//Search View Controller
app.controller('SearchViewController', ['$scope', '$http', 'FilmService', '$location', '$routeParams', function($scope, $http, FilmService, $location, $routeParams) {
  FilmService.searchBy($routeParams.query).then(function(searchedMovies) {
    $scope.searched = searchedMovies;
    $scope.queryOne = $routeParams.query;
    $scope.getMovie = function(movie) {
      var title = $location.path('/film/' + movie.id);
    };
  });
}]);

//Film View Controller
app.controller('FilmViewController', ['$scope', '$http', 'FilmService', '$routeParams', '$location', function($scope, $http, FilmService, $routeParams, $location) {
  FilmService.getFilmById($routeParams.filmId).then(function(stuff) {
    $scope.movie = stuff;
    console.log(stuff);
    let poster = stuff.poster_path;
    $scope.poster = "http://image.tmdb.org/t/p/w500" + poster;
    let year = stuff.release_date;
    $scope.yearResponse = moment(year).format('YYYY');
    $scope.director = stuff.credits.crew[0].name;
    $scope.actor1 = stuff.credits.cast[0].name;
    $scope.actor2 = stuff.credits.cast[1].name;
    $scope.actor3 = stuff.credits.cast[2].name;
    $scope.actor4 = stuff.credits.cast[3].name;
    $scope.trailer = 'https://www.youtube.com/watch?v=' + stuff.trailers.youtube[0].source;
  });
  FilmService.getSimilar($routeParams.filmId).then(function(stuffTwo) {
    $scope.movieTwo = stuffTwo.results;
    console.log(stuffTwo);
    $scope.getMovie = function(movie) {
      var title = $location.path('/film/' + movie.id);
    };
  });
}]);

//Header Controller
app.controller('HeaderController', ['$scope', '$http', 'FilmService', '$location', function($scope, $http, FilmService, $location) {
  $scope.searchMovie = function() {
    $location.path('/search/' + $scope.searchTerm);
  };
}]);
