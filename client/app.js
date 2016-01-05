angular.module('multiSnake', [])

.factory('Game', function ($http) {
  var genericResponseHandler = function(response){
    return response.data;
  }
  return {
    getBoard: function(){
      return $http.get('api/board').then(genericResponseHandler);
    },

    connect: function(){
      return $http.get('/api/connect').then(genericResponseHandler);
    },

    setDirection: function(direction){
      return $http.post('/api/direction', JSON.stringify(direction)).then(genericResponseHandler);
    },

    ready: function(state){
      return $http.post('/api/ready', JSON.stringify(state)).then(genericResponseHandler);
    },
  };
})

.controller('mapController', function ($scope, Game) {
  $scope.data = {};
  $scope.data.ready = false;
  $scope.data.map = [];

  Game.connect();

  $scope.ready = function () {
    $scope.data.ready = !this.data.ready;
    Game.ready(this.data.ready);
  };

  $scope.setDirection = function ($event) {
    var keyMap = {
      40: "down",
      37: "left",
      39: "right",
      38: "up"
    }
    if(keyMap[$event.keyCode]){
      Game.setDirection(keyMap[$event.keyCode]);
    }
  };

  setInterval(function () {
    Game.getBoard().then(function(data){
      $scope.data.map = data;
    });  
  }, 500);
});
