/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularFallback = require('angular-fallback-image');
var angularRoute = require('angular-route');
var moment = require('moment');
require('./service');

var app = angular.module('BijouApp', ['ngRoute', 'FilmModule', 'angular-fallback-image']);

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
  .when('/cast/:castId', {
    controller: 'CastViewController',
    templateUrl: 'sections/cast.html',
  })
  .otherwise({
    redirectTo: '/main',
  });
}]);

//Main Feed View controller
app.controller('MainViewController', ['$scope', '$http', 'FilmService', '$location', function($scope, $http, FilmService, $location) {
  $scope.nowPlaying = FilmService.getNowPlaying();
  $scope.upcoming = FilmService.getUpcoming();

  Promise.all([FilmService.getFilmById(270303),FilmService.getFilmById(294963),FilmService.getFilmById(264660),FilmService.getFilmById(295699),FilmService.getFilmById(310131),]).then(function(picks) {
    $scope.picks = picks;
    $scope.$apply();
  });
  Promise.all([FilmService.getFilmById(62),FilmService.getFilmById(348),FilmService.getFilmById(78),FilmService.getFilmById(1091),FilmService.getFilmById(9426),]).then(function(scifi) {
    $scope.scifi = scifi;
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
    $scope.yearResponse = moment(year).format('MMM Do YYYY');
    for (let i = 0; i < stuff.credits.crew.length; i ++) {
      if (stuff.credits.crew[i].job === "Director") {
        $scope.director = stuff.credits.crew[i].name;
      }
    }
    $scope.casts = stuff.credits.cast;
    $scope.trailer = 'https://www.youtube.com/watch?v=' + stuff.trailers.youtube[0].source;
  });
  FilmService.getSimilar($routeParams.filmId).then(function(stuffTwo) {
    $scope.movieTwo = stuffTwo.results;
    $scope.getMovie = function(movie) {
      var title = $location.path('/film/' + movie.id);
    };
  });
  $scope.getCast = function(cast) {
    var newCast = $location.path('/cast/' + cast.id);
  };
  //set ng-click function here
}]);

//Cast View Controller
app.controller('CastViewController', ['$scope', '$http', 'FilmService', '$routeParams', '$location', function($scope, $http, FilmService, $routeParams, $location) {
  FilmService.getFilmsbyCast($routeParams.castId).then(function(castMovie) {
    console.log(castMovie);
    console.log(castMovie.results);
    $scope.castMovie = castMovie.results;
    $scope.nameOne = $routeParams.castId;
    $scope.getMovie = function(movie){
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
