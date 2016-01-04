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

module.exports = Snake;
