
var app = angular.module("Hyuga",['ngCookies']);
//원 단위 세자리씩 끊기 filter
app.filter('currencywon', function(){
	return function(w) {
		if(w.length<4) {
			return w+"원(100g)";
		}else {
			// var str = String(w);
			// str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
			// return str + "₩";
			var empty = "";
			var str = String(w);
			var strlen = str.length-1;
			var cnt = 0;
			for(var i = strlen; i>=0;i--) {
				if(cnt%3==0 && cnt!=0) {
					empty = str[i] + "," + empty;
					cnt = cnt+1;
				}else {
					empty =  str[i] + empty;
					cnt = cnt+1;	
				}
				
			}
			return empty+"원(100g)";
		}
	};
});
app.controller('ItemSelected',function($scope, $http, $cookies){
    $scope.pensionprice = $cookies.get("price");
    
    $scope.itemlist=[]; $http.get("js/parse_emart.json").success(function(data){
        $scope.items = data;
    });
    $scope.getitem = function(i) {
        console.log($scope.itemlist);
        $scope.itemlist.push(i);
        console.log($scope.itemlist);
    };
});

app.controller('PensionPostsCtrlAjax', function($scope, $http){
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
});
app.controller('PensionSelected',function($scope,$http,$cookies){
    $scope.showMe = false;
    $scope.pensionprice = 0;
    $scope.sum = 0;
    $scope.myFunc = function() {
        $scope.showMe = true;
        $cookies.put("price", $scope.pensionprice);
    };
    $scope.addSum = function(p) {
        $scope.pensionprice = p.cost;
        $scope.sum += $scope.pensionprice;
    };
});

app.controller('Real_item_ctrl', function($scope, $http, $cookies){
    $scope.pensionprice = $cookies.get("price");
    
});
