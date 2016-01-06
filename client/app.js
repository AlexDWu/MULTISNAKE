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

    disconnect: function(){
      return $http.get('/api/disconnect').then(genericResponseHandler);
    },

    getPlayerStatus: function () {
      return $http.get('/api/playerstatus').then(genericResponseHandler);
    },
  };
})

.controller('mapController', function ($scope, $interval, Game) {
  $scope.data = {};
  $scope.data.ready = false;
  $scope.data.map = [];
  $scope.data.connected = false;

  var keyMap = {
    40: "down",
    37: "left",
    39: "right",
    38: "up",
    current: "up"
  };

  $scope.connect = function () {
    Game.connect().then(function (data){
      if(data === "blue" || data === "red" || 
        data === "green" || data === "orange"){
        $scope.data.color = data;
        $scope.data.connected = true;
      }
    });
  };

  $scope.disconnect = function(){
    Game.disconnect().then(function(data){
      delete $scope.data.color;
      $scope.data.connected = false;
    })
  }

  $scope.ready = function () {
    Game.ready(!$scope.data.ready).then(function (data) {
      console.log(data);
      $scope.data.ready = data;
    });
  };


  $scope.setDirection = function ($event) {
    if(keyMap[$event.keyCode]){
      var direction = keyMap[$event.keyCode];
      if (((direction === "up" || direction === "down") && 
        (keyMap.current === "left" || keyMap.current === "right")) || 
        ((direction === "left" || direction == "right") &&
          (keyMap.current === "up" || keyMap.current === "down")))
      {
        Game.setDirection(direction).then(function(data){
          keyMap.current = data;
        });
      }
    }
  };

  // get game board
  $interval(function () {
    Game.getBoard().then(function (data) {
      $scope.data.map = data;
    });  
  }, 125);

  // get player status
  $interval(function () {
    Game.getPlayerStatus().then(function (data) {
      $scope.data.playerStatus = data;
    })
  }, 500);
});
