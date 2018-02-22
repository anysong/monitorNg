angular.module("zc").controller("SettingsMonitorCtrl", ['$scope',function($scope){
	console.log('SettingsMonitorCtrl');

	var initData = function(){
		$scope.oLayout = {
			'number': 2,
			'list': [null,null]
		};
	};

	var selectLayout = function(number){
		//初始化；
		$scope.oLayout.number = number;
		$scope.oLayout.list = [];

		for(var i=0;i<number;i++){
			$scope.oLayout.list.push({
				'type': null,
				'params': null
			})
		};
		console.log($scope.oLayout.list.length)
	};
	var initFunc = function(){
		$scope.selectLayout = selectLayout;
	};
	var init = function(){
		initData();
		initFunc();
	};

	init();
}])