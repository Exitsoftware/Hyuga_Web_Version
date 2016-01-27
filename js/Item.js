var app1 = angular.module("Item",['firebase']);
app1.controller("Ctrl1",function($scope,$firebaseArray,$http){/*
    function Item(name, number, price) {
        "use strict";
        this.name = name;
        this.number = number;
        this.price = price;

        this.setName = function (name) {
            this.name = name;
        };
        this.getName = function () {
            return name;
        };
        this.setNumber = function (number) {
            this.number = number;
        };
        this.getNumber = function () {
            return number;
        };
        this.setPrice = function (price) {
            this.price = price;
        };
        this.getPrice = function () {
            return price;
        };

        this.getNumPrice = function () {
            return price * number;
        };
    }*/
    $scope.Item;
    $scope.ItemArr = [];
    var firebaseURL ="";
    $scope.getList = function() {
        var echoRef = new Firebase(firebaseURL);
        var query = echoRef
        $scope.ItemArr = $firebaseArray(query);
    }
    $scope.add = function() {
        $scope.ItemArr.$add({
            name : $scope.name,
            number : $scope.number,
            price : $scope.price
        });
    };
    $scope.remove = function (Item) {
        $scope.ItemArr.$remove(Item);
    }
})
angular.module('textInputExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
      $scope.number = {
        count: 1
      };
}]);

function ItemPostsCtrlAjax($scope,$http){
    $http({
        method: 'POST',
        item: 'js/parse_emart.json'
    }).success(function(data){
        $scope.items = JSON.parse(data);
    });
}

app1.directive('ItemCard',function(){
    return {
        restrict: 'EA',
        template: '<div class="item" ng-repeat="i in items"> <h3 class="left" style="display:inline"> </h3> <div class="right"> <input class="input_number" type="number" min="1" ng-model="number.count"></input> <span>개</span> </div> <strong><div class="price">\'{{i.price}}*\'*\'{{number.count}}\'원</div></strong> </div>'
    }
})

TotalSum = function (ItemList) {
    "use strict";
    var sum = 0;
    for (var i = ItemList.length - 1; i >= 0; i--) {
        sum += ItemList[i]
    };
    return sum;
}

var app2 = angular.module("Pension",[]);
/*app2.controller("Ctrl2", function($scope,$){
    function Pension(photoURL, name, number, price, day) {
        "use strict";
        this.photoURL = photoURL;
        this.name = name;
        this.number = number;
        this.price = price;
        this.day = day;
        
        this.setPhotoURL = function (photoURL) {
            this.photoURL = photoURL;
        };
        this.getPhotoURL = function () {
            return photoURL;
        };
        this.setName = function (name) {
            this.name = name;
        };
        this.getName = function () {
            return name;
        };
        this.setNumber = function (number) {
            this.number = number;
        };
        this.getNumber = function () {
            return number;
        };
        this.setPrice = function (price) {
            this.price = price;
        };
        this.getPrice = function () {
            return price;
        };
        this.setDay = function (price) {
            this.day = day;
        };
        this.getDay = function () {
            return day;
        };
    }
    $scope.Pension;
    $scope.PensionArr = [];
    var firebaseURL ="";
    $scope.getList = function() {
        var echoRef = new Firebase(firebaseURL);
        var query = echoRef
        $scope.PensionArr = $firebaseArray(query);
    }
})*/
app2.controller('PensionPostsCtrlAjax', function($scope, $http){
    $http({method: 'POST', url: 'js/parse_inn.json'}).success(function(data){
        $scope.posts = data;
    });
})
app2.directive('pensionCard',function(){
    return {
        restrict: 'EA',
        template: 'Item_Card.html'
    }
})