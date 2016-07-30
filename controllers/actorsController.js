var actorsController = (function(){
  function searchActors() {
    var userInput = $('#searchTerms').val()

    $('#movies').empty()
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      var personId = response.results[0].id
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&sort_by=vote_average.asc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
      }).done(function(response) {
        var $title = response.results[0].title
        var $year = response.results[0].release_date.split("-")[0]
        var $overview = response.results[0].overview
        var $poster = "http://image.tmdb.org/t/p/w500" + response.results[0].poster_path
        $('#movies').append(`<p> ${$title} </p>`)
        // debugger
        j = 5
        for (var i = 0; i < j; i++) {
          var $title = response.results[i].title
          if (response.results[i].poster_path && !Store.movies.map((m) => m.name).includes($title)){
            var $year = response.results[i].release_date.split("-")[0]
            var $overview = response.results[i].overview
            var $poster = "http://image.tmdb.org/t/p/w500" + response.results[i].poster_path

            var movie = new Movie($title, $year,"its ok", $overview, $poster)

            $('#movies').append(
              `<h3>${movie.name}</h3><br>
              <img src='${movie.poster}'/><br>
              <h4>Released in: ${movie.year}</h4>
              <strong><p>${movie.review}</p></strong><br><br>`
            )
          } else {j +=1}
        }
// constructor(name, year, rating, review, poster, studio, boxOffice) {


      })
    })
  }
  return {
    searchActors
  }
}())
