'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'myCtrl'
  });
}])

.controller('myCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.content = '',
  $http({
    url: 'https://ssdev.superagent.ru/TestApp/swagger/#/Values/GetWithParent',
    method: "POST",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
    }),
  $http.get('https://ssdev.superagent.ru/TestApp/swagger/#/Values/GetWithParent')
  .then(function(response) {
    $scope.content = response.data;
    console.log($scope.response)
  }, function(response){
    $scope.content = "Something went wrong";
  });
}]);