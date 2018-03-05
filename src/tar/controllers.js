angular.module("zc").controller("MainCtrl", ['$scope','$state','$rootScope','ChatServ','CallServ',
	function($scope,$state,$rootScope,ChatServ,CallServ){

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
	
}]);
angular.module("zc").controller("HomeMonitorCtrl", ['$scope','$rootScope','CallServ',
	function($scope,$rootScope,CallServ){

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
					CallServ.getOnceData().then(function(rs){
						var dataList = getServiceStatusList(rs.data);
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

angular.module("zc").controller("SettingsCtrl",[function(){
	
}]);
angular.module("zc").controller("SettingsMonitorCtrl", ['$scope','$rootScope',
	function($scope,$rootScope){

	var initConfig = function(){
		$scope.typeList = [
			{
				name: '当前客服状态',
				value: 'serviceStatus',
				type: 'pie'
			},
			{
				name: '通话统计',
				value: '002',
				type: 'line'
			},
			{
				name: '在线统计',
				value: '003',
				type: 'bar'
			}
		];
	};
	var initData = function(){
		$scope.oLayout = {
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

	var selectLayout = function(number){
		//初始化；
		$scope.oLayout.number = number;
		$scope.oLayout.list = [];

		for(var i=0;i<number;i++){
			$scope.oLayout.list.push({
				'name': '请选择分类',   //分类名称
				'value': '',          //
				'type': '',           //
				'options': [],            //选项
				'choicedOpt': '全部'		  //选中项
			});
		};
		console.log($scope.oLayout.list.length)
	};
	var getOptions = function(value){
		var arr = [];
		switch (value){
			case '001':
				arr = ['北京','上海','杭州'];
				break;
			case '002':
				arr = ['xini','ni','xx'];
				break;
			default:
		};

		return arr;
	};
	var uuid = function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };
	var setType = function(item, parentIndex, index){

		$scope.oLayout.list[parentIndex].name = item.name;
		$scope.oLayout.list[parentIndex].value = item.value;
		$scope.oLayout.list[parentIndex].type = item.type;
		$scope.oLayout.list[parentIndex].uuid = uuid();

		//获取不同分类的下拉子选项
		$scope.oLayout.list[parentIndex].choicedOpt = '全部';
		$scope.oLayout.list[parentIndex].options = getOptions(item.value);

		$rootScope.objLayout = $scope.oLayout
	};
	var setOptions = function(){

	};
	var initFunc = function(){
		$scope.selectLayout = selectLayout;
		$scope.setType = setType;
		$scope.setOptions = setOptions;
	};
	var init = function(){
		initConfig();
		initData();
		initFunc();
	};

	init();
}])
