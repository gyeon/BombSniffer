var actorsController = (function(){
  function searchActors() {
    // debugger
    //get user input 
    var userInput = $('#searchTerms').val()
    //search for person 
    $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      //debugger

      var personId = response.results[0].id
      $.ajax({
        //search for movies of that person 
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&sort_by=vote_average.asc&revenue.asc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
      }).done(function(response) {
        // debugger
        //make all movie object for that actor 
        response.results.forEach((m) => {
          var $title = m.title
          var $year = m.release_date.split("-")[0]
          var $movieId = m.id
          var $overview = m.overview
          var $poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
          new Movie($title, $year, $movieId, $overview, $poster)
          
        })
        // debugger
        
      }).then(getMovieInfo)
      // debugger
      
    })
    // debugger
  }


  function getMovieInfo(){
    //debugger
    //assign movies more information 
    Store.movies.forEach((m) => {
          // debugger
      $.ajax({
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${m.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
        }).done(function(response) {
          console.log(response.revenue)
          m.revenue = response.revenue 
          m.budget = response.budget
          m.imdbId = response.imdb_id
          getYoutube(m)
          appendData()
        })

        // debugger
        
      })

    
  }

  function getYoutube(m){
    //assign movies youtube
    // debugger
    // var prom
    // Store.movies.forEach((m) => {
      $.ajax({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${m.name.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
      }).done(function(yt){
        // debugger
        m.youtubeLink = `https://youtube.com/watch?v=${yt.items[0].id.videoId}`
      })
    // })
    // debugger 

    
    // prom.done(appendData)
    
  }

//ABOVE THIS WORKS! 

  ///////////////////////////////////////////////////


  function filterMovies() {
    //filter movies so that we only have ones with rev, budget, imbd and poster
    return Store.movies.filter((m) => { 
      return m.revenue > 0 && m.budget > 0 && m.imdbId != "" && m.poster.split("/").pop() != "w500null"
    });
    // debugger
    
     
  }

  function bottomFive(){
    var list = filterMovies()
    //debugger
    var result = []
    for (i = 0; i < 5; i++){
      result.push(list[i])
    }
    return result
  }

//CANT GET IN HERE 
  function appendData(){
    console.log("in appendData")
    $("#results").empty()
    bottomFive().forEach((movie) =>{
      var boxOffice
        var phrase = "Box Office Loss: "
        var money = movie.budget - movie.revenue
        if(money < 0) {
          phrase = "Box Office Gain: "
          money = money*(-1)
          boxOffice = phrase + money
        }
        else {
          boxOffice = phrase + money 
        }
      $('#results').append(
      `<div class="col-md-2" id="${movie.movieId}">
        <div class="movieTitles">
          <h5>${movie.name}</h5>
          <h6>${movie.year}</h6>
        </div>
        <div class="movieMoney">
          <h6>Budget: ${movie.budget}</h6>
          <h6>Revenue: ${movie.revenue}</h6>
          <h6>${boxOffice}</h6>
        </div>
        <div class="moviePosters">
          <a target="_blank" href="${movie.youtubeLink}">
           <img src="${movie.poster}" class="img-thumbnail" id='poster' style="width:150px;height:150px">
          </a>
        </div>
        <div class="movieOverviews"> 
           <p>${movie.overview}</p>
        </div>
      </div>`
      )
    })
  }
  // debugger


        //only want movies with bad reviews and existing revenue
            
          
            

              
               // $(`#${$movieId}`).append(
               //  `<div class="movieImdb">
               //    <h6>${imdb_id}</h6>
               //  </div>
               //  <div class="money">
               //    <h6> Budget: ${budget}</h6>
               //    <h6> Revenue:${revenue}</h6>
               //  </div>`)
// constructor(name, year, rating, review, poster, studio, boxOffice) {


      
  return {
    searchActors,
    getMovieInfo,
    getYoutube,
    appendData,
    filterMovies,
    bottomFive
  }
}())