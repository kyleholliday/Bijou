/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularFallback = require('angular-fallback-image');
var angularRoute = require('angular-route');
var moment = require('moment');
require('./service');

var app = angular.module('BijouApp', ['ngRoute', 'FilmModule', 'angular-fallback-image']);

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
  .when('/cast/:castId', {
    controller: 'CastViewController',
    templateUrl: 'sections/cast.html',
  })
  .when('/director/:directorId', {
    controller: 'DirectorViewController',
    templateUrl: 'sections/director.html',
  })
  .otherwise({
    redirectTo: '/main',
  });
}]);

// Main Feed View controller
app.controller('MainViewController', ['$scope', '$http', 'FilmService', '$location', function($scope, $http, FilmService, $location) {
  $scope.nowPlaying = FilmService.getNowPlaying();
  $scope.upcoming = FilmService.getUpcoming();

  Promise.all([FilmService.getFilmById(294963),FilmService.getFilmById(264660),FilmService.getFilmById(271714),FilmService.getFilmById(310131),FilmService.getFilmById(295699),FilmService.getFilmById(244786),FilmService.getFilmById(273481),FilmService.getFilmById(270303),FilmService.getFilmById(152603),FilmService.getFilmById(205596)]).then(function(picks) {
    $scope.picks = picks;
    $scope.$apply();
  });

  $scope.getMovie = function(search) {
    var title = $location.path('/film/' + search.id);
  };
}]);

// Search View Controller
app.controller('SearchViewController', ['$scope', '$http', 'FilmService', '$location', '$routeParams', function($scope, $http, FilmService, $location, $routeParams) {
  FilmService.searchBy($routeParams.query).then(function(searchedMovies) {
    $scope.searched = searchedMovies;
    $scope.queryOne = $routeParams.query;
    $scope.getMovie = function(movie) {
      var title = $location.path('/film/' + movie.id);
    };
  });
}]);

// Film View Controller
app.controller('FilmViewController', ['$scope', '$http', 'FilmService', '$routeParams', '$location', function($scope, $http, FilmService, $routeParams, $location) {
  FilmService.getFilmById($routeParams.filmId).then(function(stuff) {
    $scope.movie = stuff;
    let poster = stuff.poster_path;
    $scope.poster = "http://image.tmdb.org/t/p/w500" + poster;
    let year = stuff.release_date;
    $scope.yearResponse = moment(year).format('MMM Do YYYY');

    $scope.directors = [];
    for (let i = 0; i < stuff.credits.crew.length; i ++) {
      if (stuff.credits.crew[i].job === "Director") {
        $scope.directors.push(stuff.credits.crew[i]);
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
  $scope.getDirector = function(director) {
    var newDirector = $location.path('/director/' + director.id);
  };
}]);

// Cast View Controller
app.controller('CastViewController', ['$scope', '$http', 'FilmService', '$routeParams', '$location', function($scope, $http, FilmService, $routeParams, $location) {
  FilmService.getBio($routeParams.castId).then(function(bio){
    $scope.bio = bio;
  });
  FilmService.getFilmsbyCast($routeParams.castId).then(function(castMovie) {
    $scope.castMovie = castMovie.results;
    $scope.getMovie = function(movie){
      var title = $location.path('/film/' + movie.id);
    };
  });
}]);

// Director View Controller
app.controller('DirectorViewController', ['$scope', '$http', 'FilmService', '$routeParams', '$location', function($scope, $http, FilmService, $routeParams, $location){
  FilmService.getBio($routeParams.directorId).then(function(bio){
    $scope.bio = bio;
  });
  FilmService.getDirector($routeParams.directorId).then(function(directorMovie)
  {
    $scope.directorMovie = directorMovie.results;
    $scope.getMovie = function(movie){
      var title = $location.path('/film/' + movie.id);
    };
  });
}]);

// Header Controller
app.controller('HeaderController', ['$scope', '$http', 'FilmService', '$location', function($scope, $http, FilmService, $location) {
  $scope.searchMovie = function() {
    $location.path('/search/' + $scope.searchTerm);
  };
}]);
