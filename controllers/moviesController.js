var moviesController = (function(){
  function youtubeFrame(link) {
    $('#youtubeFrame').empty()
    $('#youtubeFrame').append(
      `<iframe style="margin: auto" width="100%" height="540px" src="${link}?autoplay=1"></iframe>`
      )
    }

  return {
    youtubeFrame
  }
}())
