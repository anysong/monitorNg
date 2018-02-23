angular.module("zc").controller("SettingsMonitorCtrl", ['$scope','$rootScope',
	function($scope,$rootScope){

	var initConfig = function(){
		$scope.typeList = [
			{
				name: '地区统计',
				value: '001',
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
	var setType = function(item, parentIndex, index){
		console.log(item.name);
		// console.log(index);
		$scope.oLayout.list[parentIndex].name = item.name;
		$scope.oLayout.list[parentIndex].value = item.value;
		$scope.oLayout.list[parentIndex].type = item.type;

		//获取不同分类的下拉子选项
		$scope.oLayout.list[parentIndex].choicedOpt = '全部';
		$scope.oLayout.list[parentIndex].options = getOptions(item.value);
		console.log($scope.oLayout);
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