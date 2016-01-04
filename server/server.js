var express = require('express');
var requestHandler = require('handler/requestHandler.js');

var session = require('express-session');

var app = express();
// MIDDLEWARE
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(__dirname + '/../client'));

// ROUTES
// set the snake's direction
app.post('/api/direction', gameController.setDirection);

// get the game state
app.get('/api/board', gameController.getBoard);

// connect to the game (create user's snake);
app.get('/api/connect', gameController.connect);
