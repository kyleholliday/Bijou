/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function(){
  var service = angular.module('FilmService', []);

  let movies = [];
  let nowPlaying = [];

  service.factory('FilmService', function ($http) {
    //let all my variables go here
    $http({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=3f5dcd7179e2ff7c3180ca67d78b3936'
    })
    .then(function(response) {
      console.log(response.data);
      for (let i = 0; i < response.data.results.length; i++) {
        console.log(response.data.results[i].poster_path);
        var poster = response.data.results[i].poster_path;
        // response.data.results[i].fullPoster = //eventual URL to make full url for each and every object
        response.data.results[i].fullPoster = "http:image.tmdb.org/t/p/w500/" + poster;
        // the purpose of this is to go into the templates and be able to say "item.fullPoster" and have it be the image
        console.log(response.data.results[i].fullPoster = "http:image.tmdb.org/t/p/w500/" + poster);
      }
      angular.copy(response, nowPlaying);
      return response;
    });
    //create another request here
    return {
      getNowPlaying: function() {
        return nowPlaying;
      }
    };
  });
})();
