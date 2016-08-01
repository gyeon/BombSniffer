var Movie = (function(){
  counter = 1
  return class {
    constructor(name, year, movieId, overview, poster, studio, boxOffice) {
      this.name = name;
      this.year = year;
      this.movieId = movieId;
      this.overview = overview;
      this.poster = poster;
      this.studio = studio;
      this.boxOffice = boxOffice;
      Store.movies.push(this);
    }

    cast(){
      
    }

    director(){

    }

    // rating(){
    //
    // }
  }
}())
