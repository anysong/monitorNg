
angular.module('zc').config(['$locationProvider','$stateProvider','$urlRouterProvider',
 function($locationProvider, $stateProvider, $urlRouterProvider){

 	// 需要配 <base href="/src/">
	$locationProvider.html5Mode(true);

	var BaseRouterUrl = '/';

	/*
	* home 直接跳转到 monitor 多个子路由需要取消该规则
	*/

	$urlRouterProvider
		.when('/', BaseRouterUrl + 'login')
		.otherwise('/')

	$stateProvider

        /** login **/
        .state('login', {
            url: '/login',
            views :{
                'zcMain': {
                    controller: 'LoginCtrl',
                    templateUrl: 'views/login/index.html'
                }
            }
        })

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

	  	.state('zc.main.home', {
	  		url: 'home',
	  		views :{
	  			'zcMainBodyMain': {
	  				controller: 'HomeCtrl',
	  				templateUrl: 'views/home/index.html'
	  			}
	  		}
	  	})

}]);
