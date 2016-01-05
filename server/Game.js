var Game = function(width, height){
  this.snakes = [] // array of snakes to keep track of
  this.width = width; // game board width
  this.height = height; // game board height
  this.gameBoard = []; // two dimentional array of colors
  this.speed = 500; // step interval;

  // set up the game board
  for(var i = 0; i < this.height; i++){
    this.gameBoard[i] = [];
    for(var j = 0; j < this.width; j++){
      this.gameBoard[i][j] = "grey";
    }
  }
};

// step moves every snake forward
Game.prototype.step = function () {
  var game = this;
  this.snakes.forEach(function (snake) {
    if(!snake.dead){
      if(snake.direction === "up"){
        // moving up is negative y
        snake.head.y--;
      } else if (snake.direction === "down"){
        // moving down is positive y
        snake.head.y++;
      } else if(snake.direction === "left"){
        // moving left is negative x
        snake.head.x--;
      } else if(snake.direction === "right"){
        // moving right is positive x
      }
      // check collisions
      if(snake.head.x < 0 || snake.head.y < 0 ||
        snake.head.x > game.width || snake.head.y > game.height){
        snake.die()
      }
      if (!snake.dead){
        var oldSegments = snake.move();
        game.removeSegements(oldSegments);
      }
    }
    if(snake.dead){
      game.removeSnake(snake);
    }
  });
  // return whether or not all the snakes are dead
  return this.gameOver();
}

Game.prototype.gameOver = function(){
  return this.snakes.reduce(function(memo, snake){
    return memo && snake.dead;
  },true);
};

Game.prototype.start = function(){
  var intervalID = setInterval(function(){}, this.speed);
};

Game.prototype.addSnake = function(mySnake){
  this.snakes.push(mySnake);
  return mySnake;
};

Game.prototype.getBoard = function(){
  return this.gameBoard;
};
// remove the snake from the game
// maybe keep around in a cemetary for score keeping?
Game.prototype.removeSnake = function(snake) {
};

// remove body segmenst from the game board
Game.prototype.removeSegements = function(segments){
};

module.exports = Game;
