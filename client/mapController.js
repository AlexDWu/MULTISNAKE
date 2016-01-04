angularModel('multiSnake.map',[])

.controller('mapController', function (Game) {
  this.data = {};
  this.data.ready = false;
  Game.connect();

  this.ready = function () {
    this.data.ready = !this.data.ready;
    Game.ready(this.data.ready);
  }
  Game.getBoard().then(function(data){
    this.data.board = data;
  });
});
