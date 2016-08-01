var moviesController = (function(){
  
  function imdbFrame(id) {
    $('#imdbFrame').empty()
    $('#imdbFrame').append(
      `<iframe src="http://www.imdb.com/title/${id}/"></iframe>`
      )
    }
  return {
    imdbFrame
  }
}())