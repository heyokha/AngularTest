'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'myCtrl'
  });
}])

.controller('myCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.content = '';
  let things = [];
  $http({
    url: 'https://ssdev.superagent.ru/TestApp/Values/GetWithParent',
    method: "GET",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
    })
  // $http.get('https://ssdev.superagent.ru/TestApp/swagger/#/Values/GetWithParent')
  .then(function(response) {
    $scope.content = response.data;
    for (let i in response.data) {
      let obj = response.data[i].skus
      for (let item in obj) {
        obj[item].group = response.data[i].group.name
        console.log(obj[item].group)
      }
      for (let arr in obj){
        things.push(obj[arr])
      }
      return things
      console.log(things)
    }
    console.log(response)
  }, function(response){
    $scope.content = "Something went wrong";
  });
}]);

