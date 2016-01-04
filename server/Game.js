var Game = function(width, height)){
  this.snakes = [] // array of snakes to keep track of
  this.width = width; // game board width
  this.height = height; // game board height
  this.gameBoard = [] // two dimentional array of colors
};

module.exports = Game;
