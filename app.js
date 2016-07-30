const Store = {
  actors: [],
  directors: [],
  movies: []
}

$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault()
    var searchType = $("select#searchType").val()
    if(searchType === "actor") {
      actorsController.searchActors()
    }
    else {
      directorsController.searchDirectors()
    }
  })
})