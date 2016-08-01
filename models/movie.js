var Movie = (function(){
  counter = 1
  return class {
    constructor(name, year, movieId, overview, poster, budget, revenue, imdbId, youtubeLink) {
      this.name = name;
      this.year = year;
      this.movieId = movieId;
      this.overview = overview;
      this.poster = poster;
      this.budget = budget;
      this.revenue = revenue;
      this.imdbId = imdbId;
      this.youtubeLink = youtubeLink
      Store.movies.push(this);
    }
  }
}())
