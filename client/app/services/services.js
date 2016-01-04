angular.module('multiSnake.services', [])

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
});
