var express = require('express');
var gameController = require('./gameController');
var bodyParser = require('body-parser');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = require('redis').createClient(process.env.REDIS_URL||{
    host: "localhost",
    port: 6379,
  });


var app = express();
// MIDDLEWARE
app.use(session({
    store: new RedisStore({
    client: client,
  }),
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
app.get('/api/disconnect', gameController.disconnect);

// Player is ready
app.post('/api/ready', gameController.ready);
app.get('/api/playerstatus', gameController.playerStatus)

app.listen(process.env.PORT || 8000);
console.log('Listening to port: 8000');
