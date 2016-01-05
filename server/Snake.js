var _ = require('underscore');

var Snake = function(options){
  // the Snake will keep track of it's position state
  // but it will assume the game will give it it's next
  // positions because Snake doesn't know the size of the
  // game board.

  // Top left corner is (0,0)
  // Up is negative y
  // Down is positive y
  // Left is negative x
  // Right in positive x
  this.direction = options.direction; // direciton of travel
  this.head = options.position; // x,y cordinates of the head
  this.color = options.color;
  this.size = options.size // default starting size
  this.body = [] // queue for storing positon of body segments
  this.dead = false // is the snake dead or alive?
  this.ready = false // is the snake/player ready?
}

// Increments the snake
// - The game will provide the next position of the head, 
// because snake doesn't know about the game boarders
Snake.prototype.move = function (nextposition) {
  this.head = nextposition || this.head;
  this.body.unshift(_.clone(this.head));
// Returns the positions of segements removed from the body.
// (maybe an empty array). 
  var output = []
// Tail won't be removed if queue is smaller than the 
// snake's size. this might happen when the snake eats food.
// Not sure why more than one segment will be removed yet.
  while(this.body.length > this.size){
    output.push(this.body.pop());
  }
  return output;
};

// Not sure how a snake will die yet
Snake.prototype.die = function () {
  console.log('snake died');
  this.dead = true;
};

Snake.prototype.setDirection = function (direction){
  if (((direction === "up" || direction === "down") && 
    (this.direction === "left" || this.direction === "right")) || 
    ((direction === "left" || direction == "right") &&
      (this.direction === "up" || this.direction === "down")))
  {
    this.direction = direction;
    console.error(this.color + " snake changed direction " + this.direction);
  }
  return this.direction
}


module.exports = Snake;
