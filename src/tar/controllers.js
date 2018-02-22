angular.module("zc").controller("MainCtrl", ['$scope','$state','$rootScope','ChatServ','CallServ',
	function($scope,$state,$rootScope,ChatServ,CallServ){

	$scope.title = '1';
	$scope.body = '2';
	$scope.footer = '3';

	CallServ.getCallStaffJobInfoListNG_all();
	CallServ.xxxxx();

	/** sidebarList **/
	$scope.sidebarList = [
		{
			'name': 'home',
			'title': '首页',
			'sref': 'zc.main.home.monitor',
		},
		{
			'name': 'settings',
			'title': '设置',
			'sref': 'zc.main.settings.monitor'
		}
	];

	/** activeSidebarItem **/
	for(var i=0;i<$scope.sidebarList.length;i++){
		if($scope.sidebarList[i].sref == $state.current.name){
			$scope.activeSidebarItem = $scope.sidebarList[i].name;
		};
	};
	var stateGo = function(item){
		$scope.activeSidebarItem = item.name;
		if(item.params){
			$state.go(item.sref, item.params);
		}else {
			$state.go(item.sref);
		};
	};
	var initFunc = function(){
		$scope.stateGo = stateGo;
	};
	var init = function(){
		initFunc();
	};

	init();
}])
angular.module("zc").controller("HomeCtrl", [function(){
	console.log('HomeCtrl');
}]);
angular.module("zc").controller("HomeMonitorCtrl", ['$scope',function($scope){
	console.log('HomeMonitorCtrl');

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

}]);
angular.module("zc").controller("SettingsCtrl",[function(){
	console.log('SettingsCtrl');
}]);
angular.module("zc").controller("SettingsMonitorCtrl", ['$scope',function($scope){
	console.log('SettingsMonitorCtrl');

	var initData = function(){
		$scope.oLayout = {
			'number': 2,
			'list': [null,null]
		};
	};

	var selectLayout = function(number){
		//初始化；
		$scope.oLayout.number = number;
		$scope.oLayout.list = [];

		for(var i=0;i<number;i++){
			$scope.oLayout.list.push({
				'type': null,
				'params': null
			})
		};
		console.log($scope.oLayout.list.length)
	};
	var initFunc = function(){
		$scope.selectLayout = selectLayout;
	};
	var init = function(){
		initData();
		initFunc();
	};

	init();
}])