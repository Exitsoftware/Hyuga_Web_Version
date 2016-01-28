var app = angular.module("login", ['firebase']);
app.controller("Ctrl", function($scope, $firebaseArray){
	$scope.name;
	$scope.crew;
	$scope.master;
	$scope.date;
	$scope.pension_name;
	$scope.pension_people;
	$scope.pension_cost;
	$scope.es_itemName = "";
	$scope.real_itemName = "";
	
	var firebaseURL = "https://testobject.firebaseio.com/";
	
	$scope.getPensionList = function() {
		var pensionRef = new firebaseURL(firebaseURL + $scope.$authData['uid'] + '/pension');
		$scope.pensionArr = $firebaseArray(pensionRef);
	};
	
	$scope.getEsItemList = function(){
		var esItemRef = new firebaseURL(firebaseURL + $scope.$authData['uid'] + '/es_itemList');
		$scope.esItemArr = $firebaseArray(esItemRef);
	};
	
	$scope.getRealItemList = function(){
		var realItemRef = new firebaseURL(firebaseURL + $scope.$authData['uid'] + '/real_itemList');
		$scope.realItemArr = $firebaseArray(realItemRef);
	};
	
	$scope.getName = function(){
		var nameRef = new firebaseURL(firebaseURL + $scope.$authData['uid'] + '/events').child($scope.name);
		$scope.name = nameRef.key();
	};
	
	$scope.getCrew = function(){
		var crewRef = new firebaseURL(firebaseURL + $scope.$authData['uid'] + '/events').child($scope.crew);
		$scope.crew = crewRef.key();
	};
	
	$scope.getDate = function(){
		var dateRef = new firebaseURL(firebaseURL + $scope.$authData['uid'] + '/events').child(0);
		var key = dateRef.date();
		$scope.date = key;
	};
	
	//setter method
	$scope.es_setItem = function(es_itemName, es_itemCost, es_itemNumber){
		$scope.name = es_itemName;
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		var itemRef = reference.child("es_itemList").child($scope.name);
		itemRef.set({
			item_name: es_itemName,
			item_cost: es_itemCost,
			item_number: es_itemNumber
		});
	};
	
	$scope.real_setItem = function(real_itemName, real_itemCost, real_itemNumber){
		$scope.name = real_itemName;
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		var itemRef = reference.child("real_itemList").child($scope.name);
		itemRef.set({
			item_name: real_itemName,
			item_cost: real_itemCost,
			item_number: real_itemNumber
		});
	};
	
	$scope.setPension = function(pensionName, pensionCost, pensionPeople){
		$scope.name = pensionName;
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		var itemRef = reference.child("pension");
		itemRef.set({
			pension_name: pensionName,
			pension_people: pensionPeople,
			pension_cost: pensionCost
		});
	};
	
	$scope.setAdminName = function(adminName){
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		reference.set({
			name: adminName
		});
	};
	
	$scope.setCrew = function(newCrew){
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		reference.set({
			crew: newCrew
		});
	};
	
	$scope.setDate = function(newDate){
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		reference.set({
			date: newDate
		});
	};
	
/*	still developing..

	//getter method
	$scope.es_getItem = function(es_itemName){
		$scope.name = itemRef.child(item_name).toString();
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		var itemRef = reference.child("es_itemList").child($scope.name);
		$scope.cost = itemRef.child(item_cost).toString();
		$scope.number = itemRef.child(item_number).toString();
		return [$scope.name,$scope.cost,$scope.number];
	};
	ref.once("value", function(data) {
		
	});
	
	$scope.real_getItem = function(real_itemName, real_itemCost, real_itemNumber){
		$scope.name = real_itemName;
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		var itemRef = reference.child("real_itemList").child($scope.name);
		itemRef.set({
			item_name: real_itemName,
			item_cost: real_itemCost,
			item_number: real_itemNumber
		});
	};
	
	$scope.getPension = function(pensionName, pensionCost, pensionPeople){
		$scope.name = pensionName;
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		var itemRef = reference.child("pension");
		itemRef.set({
			pension_name: pensionName,
			pension_people: pensionPeople,
			pension_cost: pensionCost
		});
	};
	
	$scope.getAdminName = function(adminName){
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		reference.set({
			name: adminName
		});
	};
	
	$scope.getCrew = function(newCrew){
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		reference.set({
			crew: newCrew
		});
	};
	
	$scope.getDate = function(newDate){
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/");
		reference.set({
			date: newDate
		});
	};
	*/
	$scope.init = function() {
		var reference = new Firebase(firebaseURL + $scope.$authData['uid'] + "/events/");
		reference.once("value", function(Snapshot){
			if(!Snapshot.hasChildren()){
				reference.push({
					name: "",
					crew: 0,
					date: ""
				});
				var pensionRef = reference.child('pension');
				pensionRef.push({
					pension_name: "",
					pension_people: 0,
					pension_cost: 0
				});
				var es_itemRef = reference.child("es_itemList");
				es_itemRef.push({
					item_name: "",
					item_cost: 0,
					item_number: 0
				});
				var real_itemRef = reference.child("real_itemList");
				real_itemRef.push({
					item_name: "",
					item_cost: 0,
					item_number: 0
				});
			}
		});
	};
	
	
	
	$scope.FBLogin = function () {
      var ref = new Firebase(firebaseURL);
      ref.authWithOAuthPopup("facebook", function(error, authData) {
      	if (error) {
        	console.log("Login Failed!", error);
      	} else {
        	$scope.$apply(function() {
        		$scope.$authData = authData;
      		});
      		console.log("Authenticated successfully with payload:", authData);
		  
      // do something with the login info
			$scope.init();
	  }
	 });
	};

	$scope.FBLogout = function () {
		var ref = new Firebase(firebaseURL);
		ref.unauth();
		delete $scope.$authData;
  // do something after logout
	};

    
})