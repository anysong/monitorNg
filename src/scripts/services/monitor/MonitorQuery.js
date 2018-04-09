/**
* 大屏接口整合
*/

angular.module('zc').factory('MonitorQuery',['BaseServ',function(BaseServ){
    var data = {};
    var GET_MONITOR = [
        'getMonitorInfoAllList', //监控菜单查询
        'getMonitorInfoById'     //获取信息
    ];
    var POST_MONITOR = [
        'insertMonitorInfo',   //新增
        'updateMonitorInfo'    //修改
    ];
    //在线
    var GET_MONITOR_DATA = [
        'queryCustomerOnline',       //当前咨询客户数 －单独 v
        'queryCustomerQueue',        //当前排队客户数 －单独 v
        'querySessionStatsSurvey',   //会话相关数据统计 －复合 v
        'queryStaffStatsSurvey',     //客服相关数据统计 －复合 v
        'queryOneTimeSolved',        //一次性解决率 －单独 v
        'queryFirstResponseChart',    //首次响应时间柱状图 －图表 v
        'queryQueueLeaveLineChart',   //排队离开趋势   v
        'getVisitorSourceChart',      //今日访客来源   v
        'getSessionStatsChart'       //今日会话细分对比   v
    ];
    //在线 老接口
    var GET_MONITOR_CHAT = [
        'getAdminStatus'             //当前客服工作状态 v
    ];
    //呼叫
    var GET_MONITOR_CALL = [
        'getCallMonitorCustomDataReport',     //自定义数据
        'getCallMonitorCurrentServiceStatus', //当前客服工作状态
        'getCallMonitorCustomServiceStatus',  //获取客服状态自定义设置
        'getCallMonitorServiceDetailIn'       //服务水平监控和呼入量趋势监控数据
    ];

    for(var i=0;i<GET_MONITOR.length;i++){
        (function(i){
            data[GET_MONITOR[i]] = function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    Serv : true,
                    urlServ : 'basic-set/' + GET_MONITOR[i],
                    params: params
                });
                return promise;
            };
        })(i);
    };
    for(var i=0;i<POST_MONITOR.length;i++){
        (function(i){
            data[POST_MONITOR[i]] = function(params){
                var promise = BaseServ.query({
                    method: 'POST',
                    Serv : true,
                    urlServ : 'basic-set/' + POST_MONITOR[i],
                    params: params
                });
                return promise;
            };
        })(i);
    };
    for(var i=0;i<GET_MONITOR_DATA.length;i++){
        (function(i){
            data[GET_MONITOR_DATA[i]] = function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    Serv : true,
                    urlServ : 'chat-wb/monitor/' + GET_MONITOR_DATA[i],
                    params: params
                });
                return promise;
            };
        })(i);
    };
    for(var i=0;i<GET_MONITOR_CHAT.length;i++){
        (function(i){
            data[GET_MONITOR_CHAT[i]] = function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    ChatServ : true,
                    urlServ : 'chat-web/data/' + 'getAdminStatus' + '.action',
                    params: params
                });
                return promise;
            };
        })(i);
    };
    for(var i=0;i<GET_MONITOR_CALL.length;i++){
        (function(i){
            data[GET_MONITOR_CALL[i]] = function(params){
                var promise = BaseServ.query({
                    method: 'GET',
                    Serv : true,
                    urlServ : 'call-report/' + GET_MONITOR_CALL[i],
                    params: params
                });
                return promise;
            };
        })(i);
    };
    return data;
}])
