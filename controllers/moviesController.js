var moviesController = (function(){
  function youtubeFrame(link) {
    $('#youtubeFrame').empty()
    $('#youtubeFrame').append(
      `<iframe width="420" height="315" src="${link}?autoplay=1"></iframe>`
      )
    }

  return {
    youtubeFrame
  }
}())
