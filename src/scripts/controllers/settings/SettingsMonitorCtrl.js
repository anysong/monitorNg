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
				name: '当前会话统计',
				value: 'currentConversation',
				type: 'bar'
			},
			{
				name: '在线统计',
				value: '003',
				type: 'line'
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
