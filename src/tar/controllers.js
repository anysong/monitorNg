angular.module('zc').controller('MainCtrl', ['$scope', function($scope){

	$scope.title = '1';
	$scope.body = '2';
	$scope.footer = '3';
	
}])
angular.module('zc').controller('SettingsCtrl',[function(){
	
	console.log('SettingsCtrl');
}]);