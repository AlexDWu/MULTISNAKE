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
      return $http.post('/api/direction', direction).then(genericResponseHandler);
    },

    ready: function(state){
      return $http.post('/api/ready', state).then(genericResponseHandler);
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
    console.log("playre is ready");
  };

  setInterval(function () {
    Game.getBoard().then(function(data){
      $scope.data.map = data;
    });  
  }, 500);
});
