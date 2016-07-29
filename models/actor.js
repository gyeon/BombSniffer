var Actor = (function(){
  var counter = 1;
  return class {
    constructor(name) {
      this.name = name;
      this.id = counter++
      Store.actors.push(this)
    }
    movies(){

    }

    worstMovie(){

    }
  }
}())
