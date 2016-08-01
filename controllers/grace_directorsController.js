var grace_directorsController = (function(){
  function searchDirectors() {
    var userInput = $('#searchTerms').val()
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      var personId = response.results[0].id
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?with_crew=${personId}&sort_by=revenue.asc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
      }).done(function(response) {
        j = 5
        for (var i = 0; i < j; i++) {
          var mov = response.results[i]
          var $title = mov.title
          var $movieId = mov.id
          var $year = mov.release_date.split("-")[0]
          var $overview = mov.overview
          var $poster = "http://image.tmdb.org/t/p/w500" + mov.poster_path
          var $youtubeId
           if (mov.poster_path && !Store.movies.map((m) => m.name).includes($title)){
            var movie = new Movie($title, $year, $movieId, $overview, $poster)

            $('#results').append(
              `<div class="col-md-2" id="${$movieId}">
                <div class="movieTitles">
                  <h5>${movie.name}</h5>
                  <h6>${movie.year}</h6>
                </div>
                <div class="moviePosters">
                   <img src="${movie.poster}" class="img-thumbnail" id='poster' style="width:150px;height:150px">
                </div>
                <div class="movieOverviews"> 
                   <p>${movie.overview}</p>
                </div>
              </div>`
            );
          } else {j +=1}
          $.ajax({
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${$movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
            }).done(function(response) {
            if (mov.poster_path && !Store.movies.map((m) => m.name).includes($title)){
              var movie = new Movie($title, $year, $movieId, $overview, $poster)

              var revenue = response.revenue
              var budget = response.budget
              var imdb_id = response.imdb_id
               $(`#${$movieId}`).append(
                `<div class="movieImdb">
                  <h6>${imdb_id}</h6>
                </div>
                <div class="money">
                  <h6> Budget: ${budget}</h6>
                  <h6> Revenue:${revenue}</h6>
                </div>`)
            })
        }
// constructor(name, year, rating, review, poster, studio, boxOffice) {


      })
    })
  }
  return {
    searchDirectors
  }
}())
