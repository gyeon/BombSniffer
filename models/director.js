var Director = (function(){
  var counter = 1;
  return class {
    constructor(name) {
      this.name = name;
      this.id = counter++
      Store.directors.push(this)
    }
    movies(){

    }

    worstMovie(){

    }
  }
}())
