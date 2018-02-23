angular.module("zc").controller("HomeMonitorCtrl", ['$scope','$rootScope','CallServ',
	function($scope,$rootScope,CallServ){
	
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
	var getConfig = function(){
		//获取配置项
		//$rootScope.objLayout.number = 4;  layout
		$rootScope.objLayout.list.map(function(item, index){
			switch (item.value){
				case '001':
					//当前在线客服
					CallServ.getOnceData().then(function(rs){
						console.log('22', rs.data);
						item.params = rs.data;
						item.render = true; //渲染
					});
					break;
				case '002':

					break;
				default:
			};
		})

	};
	var init = function(){
		initParams();
		initFunc();
		getConfig();
	};
	init();
}]);