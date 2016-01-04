var Game = require('./Game');
var Snake = require('./Snake');

model.exports = {

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
    response.json(Game.getBoard());
  },

  connnect: function(request, response, next){
    request.session.snake = Game.addSnake();
    response.end();
  }

  ready: function(request, response, next){
    response.json(Game.read(request.data));
  }

}
