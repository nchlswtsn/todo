'use strict';
var app = angular.module('sample', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/templates/home.html',
    controller: 'main'
  });
  $urlRouterProvider.otherwise('/');
});

app.controller('main', ['$scope', '$http', '$state', function($scope, $http, $state){

  $http.get('/tasks')
    .then(function(data){
      $scope.tasks = data.data;
    });

  $scope.newToDo = function(){
    var task = {
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      task: $scope.todo,
      complete: false
    };
    $http.post('/tasks', task)
      .then(function(data){
        $state.go($state.current, {}, {reload: true})
      });
    $scope.todo = '';
  };

  $scope.status = function(task){
    $http.put('/tasks/' + task._id)
      .then(function(data){
        $state.go($state.current, {}, {reload: true})
      })
  };
}]);
