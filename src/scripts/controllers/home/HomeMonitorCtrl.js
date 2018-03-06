angular.module("zc").controller("HomeMonitorCtrl", ['$scope','$rootScope','CallServ','ChatServ',
	function($scope,$rootScope,CallServ,ChatServ){

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
	var updateChart = function(){
		$rootScope.objLayout.list.map(function(item, index){
			switch (item.value){
				case 'serviceStatus':
					//当前客服状态
					ChatServ.getOnceData().then(function(rs){
						var dataList = getServiceStatusList(rs.data);
						$scope.$broadcast('echarts.pie.render', item.uuid, dataList);
					});
					break;
				case 'currentConversation':
					//当前会话统计
					ChatServ.getOnceData().then(function(rs){
						var dataList = getServiceStatusList(rs.data);
						$scope.$broadcast('echarts.bar.render', item.uuid, dataList);
					})
					break;
				default:

			};
		});

		setTimeout(function(){
			updateChart();
		}, 10000);
	};
	//当前客服状态
	var getServiceStatusList = function(data){
		var list = data.adminList || [];
		var online = 0,busy = 0;
		list.map(function(item){
			if(item.status == 1){
				online ++;
			}else if(item.status == 2){
				busy ++;
			}else {};
		});
		list = [{
			'name': '在线',
			'value': online
		},{
			'name': '忙碌',
			'value': busy
		}];
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
