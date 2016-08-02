var actorsController = (function(){
  var counter = 0

  var personId

  function init() {
    
    var prom = searchActors().then(getMovies).then(getMovieInfo)
    prom.then(appendData)
  }

  function searchActors() {
    // debugger
    //get user input

    var userInput = $('#searchTerms').val()
    //search for person
    return $.ajax({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${userInput}&api_key=bcd69b485671c77289868b4acf21bcf0`
    }).done(function(response){
      personId = response.results[0].id
    })
  }

  function getMovies() {
    return $.ajax({
      //search for movies of that person
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?with_cast=${personId}&vote_count.gte=20&sort_by=vote_average.asc&budget.desc&api_key=bcd69b485671c77289868b4acf21bcf0&include_image_language=en`
    }).done(function(response) {
      // debugger
      //make all movie object for that actor
      response.results.forEach((m) => {
        var $title = m.title
        var $year = m.release_date.split("-")[0]
        var $movieId = m.id
        var $overview = m.overview
        var $poster = "http://image.tmdb.org/t/p/w500" + m.poster_path
        var newMov = new Movie($title, $year, $movieId, $overview, $poster)
        getYoutube(newMov)

      })
      // debugger

    })
  }


  function getMovieInfo(){
    //assign movies more information
    Store.movies.forEach((m) => {
      counter += 1
      console.log(counter)
      $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${m.movieId}?&api_key=bcd69b485671c77289868b4acf21bcf0&append_to_results=imdb_id`
      }).done(function(response) {
        m.revenue = response.revenue
        m.budget = response.budget
        m.imdbId = response.imdb_id
      })
    })

  }

  function getYoutube(m){
    //  debugger
    // Store.movies.forEach((m) => {
      $.ajax({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${m.name.split(" ").join("+")}+trailer&key=AIzaSyDzIKgrZXiQZjPCJT1GcTEggK09QCYESw0`
      }).done(function(yt){
        // debugger
        m.youtubeLink = `http://www.youtube.com/embed/${yt.items[0].id.videoId}`
      })
    // })
  }

//ABOVE THIS WORKS!

  ///////////////////////////////////////////////////


  function filterMovies() {
    //filter movies so that we only have ones with rev, budget, imbd and poster
    return Store.movies.filter((m) => {
      return m.poster.split("/").pop() != "w500null" && parseInt(m.year) < 2016 && m.revenue
    });
    // debugger


  }

  function bottomFive(){
    var list = filterMovies()
    // debugger
    var result = []
    for (i = 0; i < 5; i++){
      result.push(list[i])
    }
    return result
  }

//CANT GET IN HERE
  function appendData(){
    // console.log("in appendData")
    // $("#results").empty()
    bottomFive().forEach((movie) =>{
      var boxOffice
        var phrase = "Loss: "
        var money = movie.budget - movie.revenue
        moneyString = money.toString().split("")
        if (moneyString[0] === "-"){moneyString.shift()}
        j = moneyString.length
        for (i = j - 1; i >= 0; i--){
          if((j - i) % 3 === 0 && moneyString[i] != ","){
            moneyString.splice(i, 0, ",")
          }
        }
        moneyString = moneyString.join("")
        if(money < 0) {
          style = "color: green"
          phrase = "Profit: "
          boxOffice = phrase + "$" + moneyString
        }
        else {
          style = "color: red"
          boxOffice = phrase + "$" + moneyString
        }

      $('#results').append(
      `<div class="col-md-2 movies" id="${movie.movieId}">
        <div class="movieTitles">
          <a target="_blank" href="http://www.imdb.com/title/${movie.imdbId}/">${movie.name}</a>
          <h6>${movie.year}</h6>
        </div>
        <div class="movieMoney">
          <h6 style="${style}">${boxOffice}</h6>
        </div>
        <div class="moviePosters" id="${movie.youtubeLink}">
           <img src="${movie.poster}" class="img-thumbnail" id='poster' style="width:150px;height:150px">
          </a>
        </div>
        <div class="movieOverviews">
           <p>${movie.overview}</p>
        </div>
      </div>`
      )
    })
    Store.movies = []
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
    init,
    searchActors,
    getMovieInfo,
    getYoutube,
    appendData,
    filterMovies,
    bottomFive
  }
}())
