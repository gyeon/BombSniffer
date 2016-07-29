var Movie = (function(){
  counter = 1
  return class {
    constructor(name, year, rating, review, poster, studio, boxOffice) {
      this.name = name;
      this.year = year;
      this.rating = rating;
      this.review = review;
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
