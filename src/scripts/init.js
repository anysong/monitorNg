angular.module('zc').run(['$rootScope', function($rootScope){
	/** 执行初始化 **/
	console.log('run init');

	/** 路由监听器 **/
	$rootScope.$on("$stateChangeStart", function(){
		console.log('2',arguments);
		
	})

	/** 清除所有弹层 **/
}])