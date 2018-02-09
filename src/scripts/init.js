angular.module('zc').run(['$rootScope', function($rootScope){
	/** 执行初始化 **/
	console.log('run init');

	/** 路由监听器 **/
	$rootScope.$on("$stateChangeStart", function(){
		console.log('2',arguments);
		
	})

	/** 清除所有弹层 **/


	/** 校验token **/
	var token = window.sessionStorage.getItem('temp-id');
	if(token){

	}else {
		console.log('token获取失败');
		//跳转到登录
		// window.location = '/console/login';
		// window.location = 'https://www.sobot.com/console/login';
	};
}])