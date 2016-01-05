angular.module('multiSnake', [])

.factory('Game', function ($http) {
  return {
    getBoard: function(){
      return $http.get('api/board').then(function(response){
        return response.data;
      });
    },

    connect: function(){
      return $http.get('/api/connect').then(function(response){
        return response.data;
      });
    },

    setDirection: function(direction){
      return $http.post('/api/direction', direction).then(function(response){
        return response.data;
      });
    },

    ready: function(state){
      return $http.post('/api/ready', state).then(function(response){
        return response.data;
      });
    },
  };
})

.controller('mapController', function ($scope, Game) {
  $scope.data = {};
  $scope.data.ready = "this";
  $scope.data.map = [];

  Game.connect();

  this.ready = function () {
    $scope.data.ready = !this.data.ready;
    Game.ready(this.data.ready);
  }
  Game.getBoard().then(function(data){
    $scope.data.map = data;
  });
});
