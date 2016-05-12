/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function(){
  var service = angular.module('FilmService', []);

  let movie = [];
  let nowPlaying = [];

  service.factory('FilmService', function ($http) {
    //let all my variables go here
    $http({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=3f5dcd7179e2ff7c3180ca67d78b3936'
    })
    .then(function(response){
      for (let i = 0; i < response.data.results.length; i++) {
        var poster = response.data.results[i].poster_path;
        response.data.results[i].fullPoster = "http://image.tmdb.org/t/p/w300" + poster;
      }
      angular.copy(response.data.results, nowPlaying);
      return response;
    });
    return {
      getNowPlaying: function() {
        return nowPlaying;
      },
      getFilmById: function(id) {
        return $http({
          method: 'get',
          url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=3f5dcd7179e2ff7c3180ca67d78b3936'
        })
        //'stuff' inside of the film view controller is below
        .then(function(result){
          return result.data;
        });
      }
    };
  });
})();
