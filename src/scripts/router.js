
angular.module('zc').config(['$locationProvider','$stateProvider',
 function($locationProvider, $stateProvider){
	$locationProvider.html5Mode(true);
	//<base href="/src/">
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	console.log('222');
	
	
	$stateProvider

	  	.state('main', {
	  		url: '/main',
	  		// template:'<div ng-bind="title">闭合111</div>',
	  		controller: 'MainCtrl',
	  		templateUrl: 'views/main/index.html'
	  	})
	
}]);