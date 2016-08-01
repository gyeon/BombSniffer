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
        url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&sort_by=revenue.asc&vote_average.asc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
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
            // debugger
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
            // debugger
            // AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0
            $.ajax({
              method: "GET",
              url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${$title.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
            }).done(function(yt){

              // debugger
              $youtubeId = yt.items[0].id.videoId
              $(`#posterContainer`).append(`<a href=https://www.youtube.com/watch?v=${$youtubeId}>link</a>`)
              // debugger
            })
            // debugger

          } else {j +=1 }

        }
// constructor(name, year, rating, review, poster, studio, boxOffice)
      })
    })
  }
  return {
    searchActors
  }
}())
