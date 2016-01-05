var Game = require('./Game.js');
var Snake = require('./Snake.js');
var _ = require('underscore');

var myGame = new Game(40, 40);

var snakeStore = {};
var colors = ["blue","red","green","yellow"];
var defaults = {
  blue: {direction: "up", position: {x:19,y:20}, color: "blue", size: 5},
  red: {direction: "down", position: {x:20, y:19}, color: "red", size: 5},
  green: {direction: "left", position: {x:20, y:20}, color: "green", size: 5},
  yellow: {direction: "right", position: {x:19, y:19}, color: "yellow", size: 5}
};
var numPlayers = 0;

module.exports = {

  setDirection: function(request, response, next){
    response.json("direction set to " + 
      snakeStore[request.session.snake].setDirection(request.body));
  },

  getBoard: function(request, response, next){
    response.json(myGame.getBoard());
  },

  connect: function(request, response, next){
    if(request.session.snake === undefined){
     request.session.snake = colors[numPlayers];
     numPlayers++;
    }
    var color = request.session.snake;
    var myClone = _.clone(defaults[color]);
    myClone.position = _.clone(defaults[color].position);
    snakeStore[color] = new Snake(myClone);
    console.error("new " + color + " was created");
    myGame.addSnake(request.session.snake, snakeStore[request.session.snake]);
    response.end(request.session.snake);
  },

  ready: function(request, response, next){
    snakeStore[request.session.snake].ready = request.body;
    myGame.start();
    console.error(request.session.snake + " snake says it's ready: " + snakeStore[request.session.snake].ready);
    response.json(snakeStore[request.session.snake].ready);
  }
}
