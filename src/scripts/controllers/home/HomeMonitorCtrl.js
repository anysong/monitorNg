angular.module("zc").controller("HomeMonitorCtrl", ['$scope',function($scope){
	console.log('HomeMonitorCtrl');

	/** 根据模版加载展示区 **/
	$scope.layoutList = [
		{
			'name': 'chart_1', //图表名称
			'type': 'pie',     //图表样式
		},
		{
			'name': 'chart_1', //图表名称
			'type': 'line',     //图表样式
		},
		{
			'name': 'chart_1', //图表名称
			'type': 'line',     //图表样式
		},
		{
			'name': 'chart_1', //图表名称
			'type': 'line',     //图表样式
		}
	];
}]);