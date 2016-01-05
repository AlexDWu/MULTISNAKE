var Game = require('./Game.js');
var Snake = require('./Snake.js');
var _ = require('underscore');

var myGame = new Game(40, 40);

// defaults
var colors = ["blue","red","green","orange"];
var defaults = {
  blue: {direction: "up", position: {x:19,y:20}, color: "blue", size: 5},
  red: {direction: "down", position: {x:20, y:19}, color: "red", size: 5},
  green: {direction: "left", position: {x:20, y:20}, color: "green", size: 5},
  orange: {direction: "right", position: {x:19, y:19}, color: "orange", size: 5}
};

// initilization
var snakeStore = {};
var numPlayers = 0;
var availibleColors = colors.slice();

module.exports = {

  setDirection: function(request, response, next){
    response.json( 
      snakeStore[request.session.snake].setDirection(request.body));
  },

  getBoard: function(request, response, next){
    response.json(myGame.getBoard());
  },

  connect: function(request, response, next){
    if(numPlayers > 3){
      response.end("too many connected players");
    }
    if(request.session.snake === undefined){
     request.session.snake = availibleColors.shift();
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

  disconnect: function(request, response,next){
    // check if the player connected and initialized
    if(request.session.snake !== undefined){
      myGame.removeSnake(snakeStore[request.session.snake])
      availibleColors.push(request.session.snake);
      request.session.destroy();
      numPlayers--;
    }
    response.end();
  },

  ready: function(request, response, next){
    if(request.session.snake !== undefined){
      snakeStore[request.session.snake].ready = request.body;
      myGame.start();
      console.error(request.session.snake + " snake says it's ready: " + snakeStore[request.session.snake].ready);
      response.json(snakeStore[request.session.snake].ready);
    } else {
      response.end("you are not connected");
    }
  },

  playerStatus: function (request,response, next){
    response.json(myGame.snakes);
  },

  // reset: function () {
  //   var snakeStore = {};
  //   var numPlayers = 0;
  //   var availibleColors = colors.slice();
  // },
}
