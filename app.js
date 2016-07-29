const Store = {
  actors: [],
  directors: [],
  movies: []
}

$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault()
    //actorsController.searchMovies()
    directorsController.directorsMovies()
  })
})