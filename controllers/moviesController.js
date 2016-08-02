var moviesController = (function(){
  const modal = new VanillaModal();
  function youtubeFrame(link) {
    // $('#youtubeFrame').empty()
    $('#modal-content').append(
      `<iframe width="420" height="315" src="${link}?autoplay=1"></iframe></div>`
      )
    }

  return {
    youtubeFrame
  }
}())
