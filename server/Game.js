var Game = function(width, height){
  this.snakes = [] // array of snakes to keep track of
  this.width = width; // game board width
  this.height = height; // game board height
  this.gameBoard = []; // two dimentional array of colors
  this.speed = 500; // step interval;
  this.food = false;

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
        snake.head.x++;
      }
      // eat food?
      if (game.gameBoard[snake.head.y][snake.head.x] === "black"){
        // reset space
        game.gameBoard[snake.head.y][snake.head.x] = "grey";
        // snake grows
        snake.size++;
        // need to place another food
        game.food = false;
      }
      // check collisions
      if(snake.head.x < 0 || snake.head.y < 0 ||
        snake.head.x > game.width || snake.head.y > game.height ||
        game.gameBoard[snake.head.y][snake.head.x] !== "grey"){
        snake.die()
      }
      if (!snake.dead){
        game.gameBoard[snake.head.y][snake.head.x] = snake.color;
        var oldSegments = snake.move();
        game.removeSegements(oldSegments);
      }
    }
    if(snake.dead){
      game.removeSnake(snake);
    }
  });
  // add the food, make sure it's not on top of something
  while(!game.food){
    var x = Math.floor(Math.random() * game.width);
    var y = Math.floor(Math.random() * game.height);
    if(game.gameBoard[y][x] === "grey"){
      game.gameBoard[y][x] = "black";
      game.food = true;
    }
  }
  // return whether or not all the snakes are dead
  return this.gameOver();
}

Game.prototype.gameOver = function(){
  return this.snakes.reduce(function(memo, snake){
    return memo && snake.dead;
  },true);
};

Game.prototype.start = function(){
  // if all the snakes are ready
  if (this.snakes.reduce(function (memo, snake) {
    return memo && snake.ready;
  }, true)) {
    var game = this;
    console.error("game start")
    var intervalID = setInterval(function(){
      if(game.gameOver()){
        console.error("game over");
        clearInterval(intervalID);
      } else {
        game.step();
      }
    }, this.speed);
  }
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
  this.removeSegements(snake.body);
};

// remove body segmenst from the game board
Game.prototype.removeSegements = function(segments){
  var game = this;
  segments.forEach(function(position){
    game.gameBoard[position.y][position.x] = "grey";
  });
};

module.exports = Game;
