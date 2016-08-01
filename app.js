const Store = {
  actors: [],
  directors: [],
  movies: []
}

$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault()
    $("#results").empty()
    var searchType = $("select#searchType").val()
    if(searchType === "actor") {
      actorsController.searchActors()
      
    }
    else {
      // var prom = new Promise (function(resolve){
        directorsController.searchDirectors()

        
      // })
      // prom.then(directorsController.appendData)
    }
  })
  
})
