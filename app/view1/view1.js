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
  $scope.things = [1,2,3];
  $scope.sortedGoods = [];
  console.log($scope.selected)

  $scope.inBuckettest = function () {
    console.log('testlogldk')
    $scope.printArray($scope.things);
    }

  $scope.printArray = function (array) {
    console.log(array)
    };

  $scope.inBucket = function(array) {
    console.log(array);
    for (let item in $scope.selected) {
      $scope.goodsInCart.push($scope.selected[item])
      for (let i in $scope.sortedGoods) {
        if ($scope.sortedGoods[i].id === $scope.selected[item].id) {
            $scope.sortedGoods.splice(i, 1)
        }
      }
    }
  // console.log($scope.selected)
};

$scope.getData = function () {
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
            // console.log(obj[item].group);
            $scope.things.push(obj[item]);
          }
          // console.log(obj)
          // console.log($scope.things);
        }
      }, function(response){
        $scope.content = "Something went wrong";
      });
  };

  $scope.getData()
}])

.controller('checkBox', ['$scope', function($scope) {
  $scope.checkboxModel = {
  value: true};
}])
