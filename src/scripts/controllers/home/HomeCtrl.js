angular.module("zc").controller("HomeCtrl", ['$scope','$state','$timeout','MonitorQuery',
function($scope, $state, $timeout, MonitorQuery){
	var initParams = function(){
        $scope.curMonitor = {}; //当前大屏
        $scope.aParamsList = []; //参数列表
        $scope.aChartsList = []; //图标列表


        $scope.onlineChat = {};   //在线－会话相关
        $scope.onlineServer = {}; //在线－客服相关

        $scope.callParams = {};
    };

    var initFunc = function(){

    };
    var initEvent = function(){

    };

    var getMonitorInfoById = function(){

		$scope.curMonitor = {
			'monitorCategoryName': '在线大屏监控',
			'monitorCategoryId': 'online',
			'monitorCategory': 1,   //1-在线，2-呼叫
			'monitorStatus': 0,     //'监控类型，0-默认，1-自定义',
			'customTypeName': '当前咨询客户数,当前排队客户数,接通率,排队离开率,好评率,30s应答率',
			'chartTypeName': '当前客服工作状态,首次响应时间,今日客户来源,排队离开趋势,今日会话细分对比'
		};
		$scope.aParamsList = [];  //参数初始化
		$scope.aChartsList = [];  //图表初始化

		if($scope.curMonitor.customTypeName){
			var arrParams = $scope.curMonitor.customTypeName.split(',');
			for(var i=0;i<arrParams.length;i++){
				$scope.aParamsList.push({
					'name': arrParams[i]
				})
			};
		};
		if($scope.curMonitor.chartTypeName){
			var arrCharts = $scope.curMonitor.chartTypeName.split(',');
			for(var i=0;i<arrCharts.length;i++){
				$scope.aChartsList.push({
					'name': arrCharts[i]
				})
			};
		};

		console.log('$scope.aParamsList',$scope.aParamsList);
		console.log('$scope.aChartsList',$scope.aChartsList);
		getParamsData(); //获取自定义参数数据

		/////  以上测试  ////

        MonitorQuery.getMonitorInfoById({
            'monitorCategoryId': 'online'
        }).then(function(data){

            if(data.retCode == '000000'){
                if(data && data.item){
                    $scope.curMonitor = data.item;
                }else {
                    if($state.params.typeID === 'online'){
                        $scope.curMonitor = {
                            'monitorCategoryName': '在线大屏监控',
                            'monitorCategoryId': 'online',
                            'monitorCategory': 1,   //1-在线，2-呼叫
                            'monitorStatus': 0,     //'监控类型，0-默认，1-自定义',
                            'customTypeName': '当前咨询客户数,当前排队客户数,接通率,排队离开率,好评率,30s应答率',
                            'chartTypeName': '当前客服工作状态,首次响应时间,今日客户来源,排队离开趋势,今日会话细分对比'
                        };
                    }else if($state.params.typeID === 'call'){
                        $scope.curMonitor = {
                            'monitorCategoryName': '呼叫大屏监控',
                            'monitorCategoryId': 'call',
                            'monitorCategory': 2,
                            'monitorStatus': 0,     //'监控类型，0-默认，1-自定义',
                            'customTypeName': '当前来电总数,当前排队人数,20s接听数,通话率,20s接听率,排队离开平均时长',
                            'chartTypeName': '当前客服工作状态,服务水平监控,呼入量趋势监控'
                        };
                    };
                };

                $scope.aParamsList = [];  //参数初始化
                $scope.aChartsList = [];  //图表初始化

                if($scope.curMonitor.customTypeName){
                    var arrParams = $scope.curMonitor.customTypeName.split(',');
                    for(var i=0;i<arrParams.length;i++){
                        $scope.aParamsList.push({
                            'name': arrParams[i]
                        })
                    };
                };
                if($scope.curMonitor.chartTypeName){
                    var arrCharts = $scope.curMonitor.chartTypeName.split(',');
                    for(var i=0;i<arrCharts.length;i++){
                        $scope.aChartsList.push({
                            'name': arrCharts[i]
                        })
                    };
                };

                console.log('$scope.aParamsList',$scope.aParamsList);
                console.log('$scope.aChartsList',$scope.aChartsList);
                getParamsData(); //获取自定义参数数据
            };
        });
    };
    var getParamsData = function(){
        if($scope.curMonitor.monitorCategory == '1'){
            //在线

            querySessionStatsSurvey();  //会话相关
            queryStaffStatsSurvey();    //客服相关

            for(var i=0;i<$scope.aParamsList.length;i++){
                var item = $scope.aParamsList[i];
                (function(index){
                    switch (item.name) {
                        case '当前咨询客户数':
                            queryCustomerOnline(index);
                            break;
                        case '当前排队客户数':
                            queryCustomerQueue(index);
                            break;
                        case '一次性解决率':
                            queryOneTimeSolved(index);
                            break;
                        default:
                    };
                })(i)
            };
        }else {
            //呼叫

            getCallMonitorCustomDataReport();  //参数
        };
    };


    //当前咨询客户数－在线
    var queryCustomerOnline = function(index){
        MonitorQuery.queryCustomerOnline({
            'groupIds': ''
        }).then(function(data){
            if(data.retCode == '000000'){
                if(data.item){
                    $scope.aParamsList[index].value = data.item;
                }else {
                    $scope.aParamsList[index].value = 0;
                };
            };
        });
    };
    //当前排队客户数－在线
    var queryCustomerQueue = function(index){
        MonitorQuery.queryCustomerQueue({
            'groupIds': ''
        }).then(function(data){
            if(data.retCode == '000000'){
                if(data.item){
                    $scope.aParamsList[index].value = data.item;
                }else {
                    $scope.aParamsList[index].value = 0;
                };
            };
        });
    };
    //一次性解决率－在线
    var queryOneTimeSolved = function(index){
        MonitorQuery.queryOneTimeSolved({
            'groupIds': ''
        }).then(function(data){
            if(data.retCode == '000000'){
                if(data.item){
                    $scope.aParamsList[index].value = data.item.rateStr;
                }else {
                    $scope.aParamsList[index].value = 0;
                };
            };
        });
    };
    //会话相关－在线
    var querySessionStatsSurvey = function(){
        MonitorQuery.querySessionStatsSurvey({
            'groupIds': ''
        }).then(function(data){

            if(data.retCode == '000000'){

                $scope.onlineChat = data.item || {};

                for(var i=0;i<$scope.aParamsList.length;i++){
                    var item = $scope.aParamsList[i];
                    switch (item.name) {
                        case '接通率':
                            item.value = $scope.onlineChat.acceptRate;
                            break;
                        case '排队离开率':
                            item.value = $scope.onlineChat.queueLeaveRate;
                            break;
                        case '转接率':
                            item.value = $scope.onlineChat.transferRate;
                            break;
                        case '平均排队接通时长':
                            item.value = $scope.onlineChat.avgQueueAcceptDuration;
                            break;
                        case '平均排队离开时长':
                            item.value = $scope.onlineChat.avgQueueLeaveDuration;
                            break;
                        default:
                    };
                };
            };
        });
    };
    //客服相关－在线
    var queryStaffStatsSurvey = function(){
        MonitorQuery.queryStaffStatsSurvey({
            'groupIds': ''
        }).then(function(data){

            if(data.retCode == '000000'){
                $scope.onlineServer = data.item || {};

                for(var i=0;i<$scope.aParamsList.length;i++){
                    var item = $scope.aParamsList[i];
                    switch (item.name) {
                        case '好评率':
                            item.value = $scope.onlineServer.score5Rate;
                            break;
                        case '参评率':
                            item.value = $scope.onlineServer.commentRate;
                            break;
                        case '平均首次响应率':
                            item.value = $scope.onlineServer.firstResponseRate;
                            break;
                        case '答问比':
                            item.value = $scope.onlineServer.answerThan;
                            break;
                        case '30s应答率':
                            item.value = $scope.onlineServer.responseIn30sRate;
                            break;
                        case '平均接待时长':
                            item.value = $scope.onlineServer.avgSessionDuration;
                            break;
                        case '平均响应时长':
                            item.value = $scope.onlineServer.avgResponseDuration;
                            break;
                        default:
                    };
                };
            };
        });
    };

    //自定义数据－呼叫
    var getCallMonitorCustomDataReport = function(){

        MonitorQuery.getCallMonitorCustomDataReport({
            'groupIds': ''
        }).then(function(data){

            if(data.retCode == '000000'){
                $scope.callParams = data.item || {};

                for(var i=0;i<$scope.aParamsList.length;i++){
                    var item = $scope.aParamsList[i];
                    switch (item.name) {
                        case '当前来电总数':
                            item.value = $scope.callParams.callTotal;
                            break;
                        case '当前排队人数':
                            item.value = $scope.callParams.inQueue;
                            break;
                        case '排队离开数':
                            item.value = $scope.callParams.leaveInQueue;
                            break;
                        case '20s接听数':
                            item.value = $scope.callParams.answer20sCount;
                            break;
                        case '呼入接听数':
                            item.value = $scope.callParams.callInSucc;
                            break;
                        case '排队超时数':
                            item.value = $scope.callParams.timeoutInQueue;
                            break;
                        case '振铃未接听数':
                            item.value = $scope.callParams.alertNotAnswerCount;
                            break;
                        case '呼入总数':
                            item.value = $scope.callParams.callIn;
                            break;
                        case '呼出总数':
                            item.value = $scope.callParams.callOut;
                            break;
                        case 'IVR放弃数':
                            item.value = $scope.callParams.ivrAbandonCount;
                            break;
                        case '通话率':
                            item.value = $scope.callParams.callRateStr;
                            break;
                        case '相对满意率':
                            item.value = $scope.callParams.satisfactionRateStr;
                            break;
                        case '20s接听率':
                            item.value = $scope.callParams.callIn20sRateStr;
                            break;
                        case '呼损率':
                            item.value = $scope.callParams.callFailRateStr;
                            break;
                        case '呼入接听率':
                            item.value = $scope.callParams.callInRateStr;
                            break;
                        case '呼入相对满意率':
                            item.value = $scope.callParams.callInSatisfactionRateStr;
                            break;
                        case '呼入呼损率':
                            item.value = $scope.callParams.callInFailRateStr;
                            break;
                        case '呼出接听率':
                            item.value = $scope.callParams.callOutRateStr;
                            break;
                        case '呼出相对满意率':
                            item.value = $scope.callParams.callOutSatisfactionRateStr;
                            break;
                        case '呼出呼损率':
                            item.value = $scope.callParams.callOutFailRateStr;
                            break;
                        case '排队离开平均时长':
                            item.value = $scope.callParams.callInAbandAveQueeDurationStr;
                            break;
                        case '排队成功平均时长':
                            item.value = $scope.callParams.callInSuccAveQueeDurationStr;
                            break;
                        default:
                    };
                };
            };
        });
    };





    var init = function(){
        initParams();
        initFunc();
        initEvent();

        getMonitorInfoById();
    };
    init();
}]);
