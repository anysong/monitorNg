angular.module('zc',['ui.router'])


angular.module('zc').config(['$locationProvider','$stateProvider',
 function($locationProvider, $stateProvider){
	$locationProvider.html5Mode(true);
	//<base href="/src/">
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	
	$stateProvider

	  	.state('main', {
	  		url: '/main',
	  		template:'<div ng-bind="title">闭合111</div>',
	  		controller: 'MainCtrl'
	  	})
	
}]);
angular.module('zc').controller('MainCtrl', ['$scope', function($scope){

	$scope.title = '展示页面any';
	

}])