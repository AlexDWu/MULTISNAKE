var Game = require('./Game');
var Snake = require('./Snake');

myGame = new Game(40, 40);

var snakeStore = [];

module.exports = {

  setDirection: function(request, response, next){
    response.json("direction set to " + 
      snakeStore[request.session.snake].setDirection(request.body));
  },

  getBoard: function(request, response, next){
    response.json(myGame.getBoard());
  },

  connect: function(request, response, next){
    request.session.snake = 
    snakeStore.push(new Snake('up', {x:20,y:20} , 'blue', 5)) - 1;
    myGame.addSnake(snakeStore[request.session.snake]);
    response.end("snake created");
  },

  ready: function(request, response, next){
    //request.session.snake.ready = request.body;
    myGame.start();
    response.json((request.body));
  },

}
