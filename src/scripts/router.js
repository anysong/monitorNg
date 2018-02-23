
angular.module('zc').config(['$locationProvider','$stateProvider','$urlRouterProvider',
 function($locationProvider, $stateProvider, $urlRouterProvider){
 	
 	// 需要配 <base href="/src/">
	$locationProvider.html5Mode(true);
	
	var BaseRouterUrl = '/';

	/*
	* home 直接跳转到 monitor 多个子路由需要取消该规则
	*/

	$urlRouterProvider
		.when('/', BaseRouterUrl + 'home')
		.when('/home', '/home/monitor')
		.otherwise('/')
	
	$stateProvider

	  	.state('zc', {
	  		abstract: true,   //抽象模版
	  		url: BaseRouterUrl,
	  		views :{
	  			'zcMain': {
	  				controller: 'MainCtrl',
	  				templateUrl: 'views/public/main.html'
	  			}
	  			
	  		}
	  	})
	  	.state('zc.main', {
	  		views :{
	  			'zcMainHeader': {
	  				templateUrl: 'views/public/main-header.html'
	  			},
	  			'zcMainBody': {
	  				templateUrl: 'views/public/main-body.html'
	  			}
	  		}
	  	})

	  	/** home **/
	  	
	  	.state('zc.main.home', {
	  		url: 'home',
	  		views :{
	  			'zcMainBodyMain': {
	  				controller: 'HomeCtrl',
	  				templateUrl: 'views/home/index.html'
	  			}
	  		}
	  	})
	  	.state('zc.main.home.monitor', {
	  		url: '/monitor',
	  		views :{
	  			'zcMainBodyMainContent': {
	  				controller: 'HomeMonitorCtrl',
	  				templateUrl: 'views/home/home-monitor.html'
	  			}
	  		}
	  	})

	  	/** settings **/

	  	.state('zc.main.settings', {
	  		url: 'settings',
	  		views :{
	  			'zcMainBodyMain': {
	  				controller: 'SettingsCtrl',
	  				templateUrl: 'views/settings/index.html'
	  			}
	  		}
	  	})
	  	.state('zc.main.settings.monitor', {
	  		url: '/monitor',
	  		views :{
	  			'zcMainBodyMainContent': {
	  				controller: 'SettingsMonitorCtrl',
	  				templateUrl: 'views/settings/settings-monitor.html'
	  			}
	  		}
	  	})
	
}]);