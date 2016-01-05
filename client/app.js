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

.controller('mapController', function ($scope, $interval, Game) {
  $scope.data = {};
  $scope.data.ready = false;
  $scope.data.map = [];

  Game.connect().then(function (data){
    console.log(data);
    $scope.data.color = data;
  });

  $scope.ready = function () {
    Game.ready(!$scope.data.ready).then(function (data) {
      console.log(data);
      $scope.data.ready = data;
    });
  };

  var keyMap = {
    40: "down",
    37: "left",
    39: "right",
    38: "up",
    current: "up"
  };

  $scope.setDirection = function ($event) {
    if(keyMap[$event.keyCode]){
      var direction = keyMap[$event.keyCode];
      if (((direction === "up" || direction === "down") && 
        (keyMap.current === "left" || keyMap.current === "right")) || 
        ((direction === "left" || direction == "right") &&
          (keyMap.current === "up" || keyMap.current === "down")))
      {
        keyMap.current = direction;
        Game.setDirection(direction);
      }
    }
  };

  $interval(function () {
    Game.getBoard().then(function(data){
      $scope.data.map = data;
    });  
  }, 250);
});
