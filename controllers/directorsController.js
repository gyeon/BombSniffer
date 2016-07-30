var directorsController = (function(){
  function directorsMovies() {
    var userInput = $('#searchTerms').val()

    $('#movies').empty()
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      debugger
      var personId = response.results[0].id
      debugger
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?with_crew=${personId}&sort_by=vote_average.asc&api_key=bcd69b485671c77289868b4acf21bcf0`
      }).done(function(response) {
        debugger
        var $title = response.results[0].title
        var $year = response.results[0].release_date.split("-")[0]
        var $overview = response.results[0].overview
        var $poster = "http://image.tmdb.org/t/p/w500" + response.results[0].poster_path
        $('#movies').append(`<p> ${$title} </p>`)
// constructor(name, year, rating, review, poster, studio, boxOffice) {
        new Movie($title, $year, $overview, $poster)
      })
    })
  }
  return {
    directorsMovies
  }
}())
