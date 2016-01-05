var Game = require('./Game');
var Snake = require('./Snake');

myGame = new Game(40, 40);

module.exports = {

  setDirection: function(request, response, next){
    if (request.data === "up" || request.data === "down" ||
      requst.data ==="left" || request .data ==="right"){
      request.session.snake.direction = request.data;
      response.json("direction set to " + request.data);
    } else {
      response.status(400).send(request.data + " is not a valid direction");
    }
  },

  getBoard: function(request, response, next){
    response.json(myGame.getBoard());
  },

  connect: function(request, response, next){
    request.session.snake = new Snake('up', {x:20,y:20} , 'blue', 5);
    myGame.addSnake(request.session.snake);
    response.end();
  },

  ready: function(request, response, next){
    response.json((request.data));
  },

}
