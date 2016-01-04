var Game = require('./Game');
var Snake = require('./Snake');

model.exports = {

  setDirection: function(request, response, next){
    if (request.data === "up" || request.data === "down" ||
      requst.data ==="left" || request .data ==="right"){
      request.session.snake.direction = request.data;
    }
    response.end();
  },

  getBoard: function(request, response, next){
    response.json(Game.getBoard());
  },

  connnect: function(request, response, next){
    request.session.snake = Game.addSnake();
    response.end();
  }

}
