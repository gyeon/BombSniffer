var directorsController = (function(){
  function searchDirectors() {
    var userInput = $('#searchTerms').val()

    $('#movies').empty()
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      var personId = response.results[0].id
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?with_crew=${personId}&sort_by=revenue.asc&vote_average.asc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
      }).done(function(response) {
        j = 5
        for (var i = 0; i < j; i++) {
          var $title = response.results[i].title
          if (response.results[i].poster_path && !Store.movies.map((m) => m.name).includes($title)){
            var $year = response.results[i].release_date.split("-")[0]
            var $overview = response.results[i].overview
            var $poster = "http://image.tmdb.org/t/p/w500" + response.results[i].poster_path

            var movie = new Movie($title, $year,"its ok", $overview, $poster)
           $('#movieTitles').append(
              // `<h3>${movie.name}</h3><br>
              // <img src='${movie.poster}'/><br>
              // <h4>Released in: ${movie.year}</h4>
              // <strong><p>${movie.review}</p></strong><br><br>`
              `<div class="col-md-2">
                <h5>${movie.name}</h5>
                <h6>${movie.year}</h6>
              </div>`
            )
            $('#moviePosters').append(
              `<div class="col-md-2">
                <img src="${movie.poster}" class="img-thumbnail" style="width:150px;height:150px">
              </div>`
            )
            $('#movieReviews').append(
              `<div class="col-md-2">
                <p>${movie.review}</p>
              </div>`
            )
          } else {j +=1}
        }
// constructor(name, year, rating, review, poster, studio, boxOffice) {


      })
    })
  }
  return {
    searchDirectors
  }
}())
