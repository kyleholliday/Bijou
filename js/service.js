/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function() {
  var service = angular.module('FilmModule', []);

  let movie = [];
  let nowPlaying = [];
  let newSearch = [];
  let upcoming = [];

  service.factory('FilmService', function($http) {
    // Now Playing
    $http({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=3f5dcd7179e2ff7c3180ca67d78b3936'
      })
      .then(function(response) {
        for (let i = 0; i < response.data.results.length; i++) {
          var poster = response.data.results[i].poster_path;
          response.data.results[i].fullPoster = "http://image.tmdb.org/t/p/w300" + poster;
        }
        angular.copy(response.data.results, nowPlaying);
        console.log(response);
        return response;
      });
    // Upcoming
    $http({
        method: 'get',
        url: 'http://api.themoviedb.org/3/movie/upcoming?api_key=3f5dcd7179e2ff7c3180ca67d78b3936'
      })
      .then(function(response) {
        for (let i = 0; i < response.data.results.length; i++) {
          var poster = response.data.results[i].poster_path;
          response.data.results[i].fullPoster = "http://image.tmdb.org/t/p/w300" + poster;
        }
        angular.copy(response.data.results, upcoming);
        console.log(response);
        return response;
      });

    return {
      getNowPlaying: function() {
        return nowPlaying;
      },
      getUpcoming: function() {
        return upcoming;
      },
      getFilmById: function(id) {
        return $http({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=3f5dcd7179e2ff7c3180ca67d78b3936&append_to_response=trailers,credits,reviews'
          })
          .then(function(result) {
            return result.data;
          });
      }, //end of getFilmById
      getFilmsbyCast: function(castId) {
        return $http({
            method: 'get',
            url: 'http://api.themoviedb.org/3/discover/movie?api_key=3f5dcd7179e2ff7c3180ca67d78b3936&with_cast=' + castId + '&sort_by=popularity.desc'
          })
          .then(function(result) {
            return result.data;
          });
      }, //end of getFilmsbyCast
      getBio: function(castId) {
        return $http({
            method: 'get',
            url: 'https://api.themoviedb.org/3/person/' + castId + '?api_key=3f5dcd7179e2ff7c3180ca67d78b3936'
          })
          .then(function(bio) {
            return bio.data;
          });
      },
      getDirector: function(id) {
        return $http({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie?api_key=3f5dcd7179e2ff7c3180ca67d78b3936&with_crew=' + id + '&sort_by=popularity.desc'
          })
          .then(function(director) {
            return director.data;
          });
      },
      getSimilar: function(id) {
        return $http({
            method: 'get',
            url: 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=3f5dcd7179e2ff7c3180ca67d78b3936&append_to_response=trailers,credits'
          })
          .then(function(similarResult) {
            return similarResult.data;
          });
      }, //end of getSimilar
      searchBy: function(query) {
          return $http({
            method: 'get',
            url: 'http://api.themoviedb.org/3/search/movie?api_key=3f5dcd7179e2ff7c3180ca67d78b3936&query=' + query
          }).then(function(searchMovies) {
            for (let i = 0; i < searchMovies.data.results.length; i++) {
              var newTitles = searchMovies.data.results;
              angular.copy(newTitles, newSearch);
              return newTitles;
            }
          });
        } //end of searchBy
    }; //end of return
  });
})();
