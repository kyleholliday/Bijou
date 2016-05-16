/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularRoute = require('angular-route');
var moment = require('moment');
require('./service');

var app = angular.module('BijouApp', ['ngRoute', 'FilmModule']);

// Router
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
        // let year = searchedMovies.release_date;
        // $scope.yearResponse = moment(year).format('YYYY');
      });
}]);

//Film View Controller
app.controller('FilmViewController', ['$scope', '$http', 'FilmService', '$routeParams', function($scope, $http, FilmService, $routeParams) {
  FilmService.getFilmById($routeParams.filmId).then(function(stuff) {
    $scope.movie = stuff;
    let poster = stuff.poster_path;
    $scope.poster = "http://image.tmdb.org/t/p/w500" + poster;
    let year = stuff.release_date;
    $scope.yearResponse = moment(year).format('YYYY');
    $scope.actor1 = stuff.credits.cast[0].name;
    $scope.actor2 = stuff.credits.cast[1].name;
    $scope.actor3 = stuff.credits.cast[2].name;
    $scope.trailer = 'https://www.youtube.com/watch?v=' + stuff.trailers.youtube[0].source;
  });
  FilmService.getSimilar($routeParams.filmId).then(function(stuffTwo) {
    $scope.movieTwo = stuffTwo;
    $scope.similar1 = 'http://image.tmdb.org/t/p/w300/' + stuffTwo.results[0].poster_path;
    $scope.similar2 = 'http://image.tmdb.org/t/p/w300/' + stuffTwo.results[1].poster_path;
    $scope.similar3 = 'http://image.tmdb.org/t/p/w300/' + stuffTwo.results[2].poster_path;
    $scope.similar4 = 'http://image.tmdb.org/t/p/w300/' + stuffTwo.results[3].poster_path;
    $scope.similar5 = 'http://image.tmdb.org/t/p/w300/' + stuffTwo.results[4].poster_path;
  });
}]);

//Header Controller
app.controller('HeaderController', ['$scope', '$http', 'FilmService', '$location', function($scope, $http, FilmService, $location) {
  $scope.searchMovie = function() {
    $location.path('/search/' + $scope.searchTerm);
  };
}]);
