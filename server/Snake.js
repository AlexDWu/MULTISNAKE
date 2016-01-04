var Snake = function(startDirection, startPosition, startColor, startSize){
  // the Snake will keep track of it's position state
  // but it will assume the game will give it it's next
  // positions because Snake doesn't know the size of the
  // game board.

  // Top left corner is (0,0)
  // Up is negative y
  // Down is positive y
  // Left is negative x
  // Right in positive x
  this.direction = startDirection; // direciton of travel
  this.head = startPositon; // x,y cordinates of the head
  this.color = startColor;
  this.size = startSize // default starting size
  this.body = [] // queue for storing positon of body segments
  this.dead = false // is the snake dead or alive?

  // - Push initial positions into body
  // - Body segemnts will line up behind the head
  //   based off of the starting direction
  // - Assumes board did the math so that none of it's
  //   body segments will be off the board.
  //   (then again, putting body segements off the board
  //    isn't than big of a deal).
  var nextSegment = this.head;
  for(var i = 0; i < this.size; i++){
    this.body.push[nextSegment];
    if(this.direction === "up"){
      nextSegment.y++;
    } else if (this.direction === "down"){
      nextSegment.y--;
    } else if (this.direction === "left"){
      nextSegment.x++;
    } else if (this.direction === "right"){
      nextSegment.x--;
    }
  }
}

// Increments the snake
// - The game will provide the next position of the head, 
// because snake doesn't know about the game boarders
Snake.prototype.move = function (nextposition) {
  this.head = nextposition || this.head;
  this.body.unshift(this.head);
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
  this.dead = true;
};


module.exports = Snake;
