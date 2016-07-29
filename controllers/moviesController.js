var moviesController = (function(){
  function searchMovies() {
    var userInput = $('#searchTerms').val()
    // constructor(name, year, rating, review, poster, studio, boxOffice) {
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      var personId = response.results[0].id
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&sort_by=vote_average.asc&api_key=bcd69b485671c77289868b4acf21bcf0`
      }).done(function(response) {
        $('#movies').append(`<p> ${response.results[0].title} </p>`)
      })
    })
  }
  return {
    searchMovies
  }
}())