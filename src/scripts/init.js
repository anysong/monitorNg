angular.module('zc').run(['$rootScope','$state', function($rootScope,$state){
	/** 执行初始化 **/
	

	/** 路由监听器 方法没了 **/
	// $rootScope.$on("$stateChangeStart", function(){
	// 	console.log('2',arguments);
		
	// })

	/** 清除所有弹层 **/


	/** 校验token **/
	var token = window.localStorage.getItem('temp-id');
	if(token){
		console.log('token获取成功！');
	}else {
		console.log('token获取失败');
		//跳转到登录
		// window.location = '/console/login';
		// window.location = 'https://www.sobot.com/console/login';
	};

}])