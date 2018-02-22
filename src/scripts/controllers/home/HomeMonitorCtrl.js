angular.module("zc").controller("HomeMonitorCtrl", ['$scope','$rootScope',function($scope,$rootScope){
	console.log('HomeMonitorCtrl');
	console.log('$rootScope',$rootScope.objLayout);
	/** 根据模版加载展示区 **/
	$scope.layoutList = [
		{
			'name': 'chart_1', //图表名称
			'type': 'pie'      //图表样式
		},
		{
			'name': 'chart_2', //图表名称
			'type': 'line'      //图表样式
		},
		{
			'name': 'chart_3', //图表名称
			'type': 'bar'     //图表样式
		},
		{
			'name': 'chart_4', //图表名称
			'type': 'bar'     //图表样式
		}
	];
	var initParams = function(){

	};
	var initFunc = function(){

	};
	var getConfig = function(){
		//获取配置项
		//$rootScope.objLayout.number = 4;  layout
		
	};
	var init = function(){
		initParams();
		initFunc();
		getConfig();
	};
	init();
}]);