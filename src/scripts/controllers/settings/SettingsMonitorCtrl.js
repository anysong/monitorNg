angular.module("zc").controller("SettingsMonitorCtrl", ['$scope',function($scope){
	console.log('SettingsMonitorCtrl');

	var initConfig = function(){
		$scope.typeList = [
			{
				typeName: '地区统计',
				typeValue: '001'
			},
			{
				typeName: '通话统计',
				typeValue: '002'
			}
		];
	};
	var initData = function(){
		$scope.oLayout = {
			'number': 2,
			'list': [{
				'typeName': '请选择分类',   
				'typeValue': null,        
				'options': [],            
				'choicedOpt': '全部'		  
			},{
				'typeName': '请选择分类',   
				'typeValue': null,        
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
				'typeName': '请选择分类',   //分类名称
				'typeValue': null,        //分类ID
				'options': [],            //选项
				'choicedOpt': '全部'		  //选中项
			});
		};
		console.log($scope.oLayout.list.length)
	};
	var getOptions = function(typeValue){
		var arr = [];
		switch (typeValue){
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
	var setType = function(type, parentIndex, index){
		console.log(type.typeName);
		// console.log(index);
		$scope.oLayout.list[parentIndex].typeName = type.typeName;
		$scope.oLayout.list[parentIndex].typeValue = type.typeValue;

		//获取不同分类的下拉子选项
		$scope.oLayout.list[parentIndex].choicedOpt = '全部';
		$scope.oLayout.list[parentIndex].options = getOptions(type.typeValue);

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