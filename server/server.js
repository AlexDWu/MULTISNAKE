var express = require('express');
var gameController = require('./gameController');
var bodyParser = require('body-parser');

var session = require('express-session');

var app = express();
// MIDDLEWARE
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json({strict: false}));
app.use(express.static(__dirname + '/../client'));

// ROUTES
// set the snake's direction
app.post('/api/direction', gameController.setDirection);

// get the game state
app.get('/api/board', gameController.getBoard);

// connect to the game (create user's snake);
app.get('/api/connect', gameController.connect);

// Player is ready
app.post('/api/ready', gameController.ready);

app.listen(process.env.PORT || 8000);
console.log('Listening to port: 8000');
