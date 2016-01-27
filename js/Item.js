var app1 = angular.module("Item",[]);
//app1.filter('currencywon', function(){
//	return function(w) {
//		if(w.length<4) {
//			return w+'₩'
//		}else {
//			// var str = String(w);
//			// str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
//			// return str + "₩";
//			var empty = "";
//			var str = String(w);
//			var strlen = str.length-1;
//			var cnt = 0;
//			for(var i = strlen; i>=0;i—) {
//				if(cnt%3==0 && cnt!=0) {
//					empty = str[i] + "," + empty;
//					cnt = cnt+1;
//				}else {
//					empty =  str[i] + empty;
//					cnt = cnt+1;	
//				}
//				
//			}
//			return empty+'₩';
//		}
//	};
//});

angular.module('textInputExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
      $scope.number = {
        count: 1
      };
}]);

app1.directive('ItemCard',function(){
    return {
        restrict: 'EA',
        template: '<div class="item" ng-repeat="i in items"> <h3 class="left" style="display:inline"> </h3> <div class="right"> <input class="input_number" type="number" min="1" ng-model="number.count"></input> <span>개</span> </div> <strong><div class="price">\'{{i.price}}*\'*\'{{number.count}}\'원</div></strong> </div>'
    }
})

app1.controller('ItemSelected',function($scope, $http){
    $scope.itemlist=[];
    $http.get("js/parse_emart.json").success(function(data){
        $scope.items = data;
    });
    
    $scope.getitem = function(i) {
        console.log($scope.itemlist);
        $scope.itemlist.push(i);
        console.log($scope.itemlist);
    };
});
/*
var sum = 0;
ItemTotalSum = function (ItemList) {
    "use strict";
    for (var i = ItemList.length - 1; i >= 0; i--) {
        sum += ItemList[i]
    };
    return sum;
}
*/
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
        /*
        $scope.posts_people = data.sort(function (a, b) {
            "use strict";
            return a.people < b.people ? -1 : a.people > b.people ? 1 : 0;
        });
        $scope.posts_cost = data.sort(function (a, b) {
            "use strict";
            return a.cost < b.cost ? -1 : a.cost > b.cost ? 1 : 0;
        });*/
    });
})
/*
app2.directive('pensionCard',function(){
    return {
        restrict: 'EA',
        template: 'Item_Card.html'
    }
})*/
app2.controller('PensionSelected',function($scope,$http){
    $scope.showMe = false;
    $scope.pensionprice = 0;
    $scope.sum = 0;
    $scope.myFunc = function() {
        $scope.showMe = true;
        $scope.pensionprice = $scope.p.cost;
    };
    $scope.addSum = function(p) {
        $scope.pensionprice = p.cost;
        $scope.sum += $scope.pensionprice;
    };
})