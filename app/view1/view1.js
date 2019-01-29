'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'myCtrl',
  });
}])

.controller('myCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.content = '';
  $scope.things = [];
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
      $scope.things = obj;
      console.log($scope.things);
    }
    console.log(response)
  }, function(response){
    $scope.content = "Something went wrong";
  });
}])

.controller('checkBox', ['$scope', function($scope) {
  $scope.checkboxModel = {
  value: true};
}])

.controller('bucketCtrl', function($scope) {
  for (let item in this.selected) {
    this.goodsInCart.push(this.selected[item])
    for (let i in this.sortedGoods) {
      if (this.sortedGoods[i].id === this.selected[item].id) {
        this.sortedGoods.splice(i, 1)
      }
    }
  }
$scope.selected = []
console.log($scope.selected)
});