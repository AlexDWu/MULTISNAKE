var express = require('express');
var snakeController = require('snakes/snakeController.js');
var gameController = require('game/gameController.js')


// MIDDLEWARE
app.use(express.static(__dirname + '/../client'));

// ROUTES
// set the snake's direction
app.post('/api/direction', snakeController.setDirection);

// get the game state
app.get('/api/data', gameController.getData);
