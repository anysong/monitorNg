angular.module("zc").controller("MainCtrl", ['$scope', function($scope){

	$scope.title = '1';
	$scope.body = '2';
	$scope.footer = '3';
	console.log('MainCtrl')
}])
angular.module("zc").controller("HomeCtrl", [function(){
	console.log('HomeCtrl');
}]);
angular.module("zc").controller("HomeMonitorCtrl", [function(){
	console.log('HomeMonitorCtrl');
}]);
angular.module("zc").controller("SettingsCtrl",[function(){
	console.log('SettingsCtrl');
}]);
angular.module("zc").controller("SettingsMonitorCtrl", [function(){
	console.log('SettingsMonitorCtrl');
}])