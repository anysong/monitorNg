angular.module("zc").controller("HomeMonitorCtrl", ['$scope','$rootScope','CallServ',
	function($scope,$rootScope,CallServ){

	/** 根据模版加载展示区 **/
	// $scope.layoutList = [
	// 	{
	// 		'name': 'chart_1', //图表名称
	// 		'type': 'pie'      //图表样式
	// 	},
	// 	{
	// 		'name': 'chart_2', //图表名称
	// 		'type': 'line'      //图表样式
	// 	},
	// 	{
	// 		'name': 'chart_3', //图表名称
	// 		'type': 'bar'     //图表样式
	// 	},
	// 	{
	// 		'name': 'chart_4', //图表名称
	// 		'type': 'bar'     //图表样式
	// 	}
	// ];
	var initParams = function(){
		if(!$rootScope.objLayout){
			$rootScope.objLayout = {
				'number': 2,
				'list': [{
					'name': '请选择分类',
					'value': '',
					'type': '',
					'options': [],
					'choicedOpt': '全部'
				},{
					'name': '请选择分类',
					'value': '',
					'type': '',
					'options': [],
					'choicedOpt': '全部'
				}]
			};
		};

	};
	var initFunc = function(){

	};
	var cont = 10;
	var updateChart = function(){
		$rootScope.objLayout.list.map(function(item, index){
			switch (item.value){
				case '001':
					//当前在线客服
					CallServ.getOnceData().then(function(rs){
						console.log('获取接口');
						item.params = rs.data;
						var dataList = getDataList(rs.data);
						$scope.$broadcast('echarts.pie.render', item.uuid, dataList);
					});
					break;
				case '002':

					break;
				default:

			};
		});

		setTimeout(function(){
			updateChart();
		}, 50000);
	};

	var getDataList = function(data){
		var list = data.adminList || [];
		list = [{
			'name': 'aa',
			'value': 12
		},{
			'name': 'bb',
			'value': 50
		}]
		cont += 5;
		list[0].value += cont;
		return list;
	};
	var getConfig = function(){
		//获取配置项
		//$rootScope.objLayout.number = 4;  layout
		// initChart();
		updateChart();
	};




	var init = function(){
		initParams();
		initFunc();
		getConfig();
	};
	init();
}]);
