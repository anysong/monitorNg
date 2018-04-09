angular.module("zc").directive("zcChartMonitor", ['$timeout','MonitorQuery',
    function($timeout, MonitorQuery) {
        var link = function(s, e) {
            var $scope = s,
                $node = $(e[0]);

            var myChartSource,option;
            var aParamsOnline= [
                '当前咨询客户数',
                '当前排队客户数',
                '接通率',
                '排队离开率',
                '好评率',
                '参评率',
                '转接率',
                '平均首次响应率',
                '一次性解决率',
                '答问比',
                '30s应答率',
                '平均排队接通时长',
                '平均排队离开时长',
                '平均接待时长',
                '平均响应时长'
            ];
            var aParamsCall = [
                '当前来电总数',
                '当前排队人数',
                '排队离开数',
                '20s接听数',
                '呼入接听数',
                '排队超时数',
                '振铃未接听数',
                '呼入总数',
                '呼出总数',
                'IVR放弃数',
                '通话率',
                '相对满意率',
                '20s接听率',
                '呼损率',
                '呼入接听率',
                '呼入相对满意率',
                '呼入呼损率',
                '呼出接听率',
                '呼出相对满意率',
                '呼出呼损率',
                '排队离开平均时长',
                '排队成功平均时长'
            ];
            var aChartsOnline = [
                '当前客服工作状态',
                '首次响应时间',
                '今日客户来源',
                '排队离开趋势',
                '今日会话细分对比'
            ];
            var aChartsCall = [
                '当前客服工作状态',
                '服务水平监控',
                '呼入量趋势监控'
            ];

            var initConfig = function(){

            };
            var initParams = function() {

            };
            var initFunc = function() {
                $(window).resize(function(){
                    $scope.$apply(function(){
                        myChartSource? myChartSource.resize():'';
                    });
                });
            };
            var getTimeStr = function(val) {

                var ret = '';
                if (!isNaN(val) && val === val) {
                    var no = Number(val);
                    if (no > 9)
                        ret = no + ':00';
                    else
                        ret = '0' + no + ':00';
                }
                return ret;
            };
            var switchData = function(){

                if($scope.chartType == 2){
                    //呼叫
                    switch ($scope.chartName) {
                        case '当前客服工作状态':
                            getCallMonitorCurrentServiceStatus();
                            break;
                        case '服务水平监控':
                            getCallMonitorServiceDetailIn();
                            break;
                        case '呼入量趋势监控':
                            getCallMonitorServiceDetailIn2();
                            break;
                        default:
                    };
                }else {
                    //在线
                    switch ($scope.chartName) {
                        case '首次响应时间':
                            getFirstResponse();
                            break;
                        case '当前客服工作状态':
                            getAdminStatus();
                            break;
                        case '今日客户来源':
                            getVisitorSourceChart();
                            break;
                        case '排队离开趋势':
                            getQueueLeave();
                            break;
                        case '今日会话细分对比':
                            getSessionStatsChart();
                            break;
                        default:

                    };
                };
            };

            //首次响应时间-在线
            var getCallMonitorCurrentServiceStatus = function(){
                MonitorQuery.getCallMonitorCurrentServiceStatus(

                ).then(function(data){
                    var dataItem = data.item;
                    MonitorQuery.getCallMonitorCustomServiceStatus({
                        dictCode: 1028,
                        modelFlag: 2
                    }).then(function(data){
                        if(data.retCode == '000000'){

                            var defList = [{
                                name: '签入坐席',
                                value: dataItem.login
                            },{
                                name: '接听坐席',
                                value: dataItem.callIn
                            },{
                                name: '外呼坐席',
                                value: dataItem.callOut
                            },{
                                name: '置忙坐席',
                                value: dataItem.busy
                            },{
                                name: '空闲坐席',
                                value: dataItem.free
                            },{
                                name: '排队数',
                                value: dataItem.quee
                            }];

                            if(data.item){
                                var result = data.item.result;
                                for(var i=0; i<result.length; i++){
                                    switch (result[i].dictName) {
                                        case '小休':
                                            defList.push({
                                                name: '小休',
                                                value: dataItem.restDuration_ch
                                            })
                                            break;
                                        case '后处理':
                                            defList.push({
                                                name: '后处理',
                                                value: dataItem.hadleafcallDuration_ch
                                            })
                                            break;
                                        case '培训':
                                            defList.push({
                                                name: '培训',
                                                value: dataItem.trainDuration_ch
                                            })
                                            break;
                                        case '会议':
                                            defList.push({
                                                name: '会议',
                                                value: dataItem.mettingDuration_ch
                                            })
                                            break;
                                        case '用餐':
                                            defList.push({
                                                name: '用餐',
                                                value: dataItem.eatingDuration_ch
                                            })
                                            break;
                                        case '活动':
                                            defList.push({
                                                name: '活动',
                                                value: dataItem.activityDuration_ch
                                            })
                                            break;
                                        default:

                                    }
                                };
                            }

                            setCurrentServiceStatusOption(defList);
                        };
                    })
                })
            };
            var setCurrentServiceStatusOption = function(defList){

                var nameList = [];
                var valueList = [];

                for(var i=0; i<defList.length; i++){
                    nameList.push(defList[i].name);
                    valueList.push(defList[i].value);
                };

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '当前客服工作状态',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#4D9DFE"],
                    grid: {
                        // x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    xAxis : [
                       {
                            type : 'category',
                            data : nameList,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#99A6BF',
                                    width: 1
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#F2F2F2',
                                    width: 1
                                }
                            },
                            axisTick: {show: false},
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8F95A6',
                                    fontSize: 12
                                }
                            }
                       }
                    ],
                    yAxis : [
                       {
                           type : 'value',
                           axisLine: {
                               show: false,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           axisTick: {show: false},
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           splitArea: {show: false}
                       }
                    ],
                    series: [
                        {
                            z: 3,
                            type:'bar',
                            name: '当前客服工作状态',
                            data: valueList
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };
            //服务水平监控
            var getCallMonitorServiceDetailIn = function(){
                MonitorQuery.getCallMonitorServiceDetailIn(

                ).then(function(data){
                    var list = data.items || [];
                    // callIn          呼入数
                    // callInSucc      接听数
                    // answer20sCount  20s接听数
                    // callInRate      呼入接听率
                    // callIn20sRate   20s接听率
                    setServiceDetailInOption(list);
                })
            };
            var setServiceDetailInOption = function(list){
                var timeList = [];
                var valueList = [];
                var callIn20sRate = [];  //20s接听率
                var callInRate = [];     //呼入接听率

                for (var i = 0; i < list.length; i++) {
                    callInRate.push(list[i].callInRate);
                    callIn20sRate.push(list[i].callIn20sRate);
                    timeList.push(i);
                };

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '服务水平监控',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#4D9DFE","#FFB675"],
                    grid: {
                        // x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top',
                        padding: 30,
                        // itemWidth: 10,
                        // itemHeight: 10,
                        data: [{
                            name: '接听率',
                            icon: 'force'
                        },{
                            name: '20s接听率',
                            icon: 'force'
                        }]
                    },
                    xAxis : [
                       {
                            type : 'category',
                            data : timeList,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#99A6BF',
                                    width: 1
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#F2F2F2',
                                    width: 1
                                }
                            },
                            axisTick: {show: false},
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8F95A6',
                                    fontSize: 12
                                }
                            }
                       }
                    ],
                    yAxis : [
                       {
                           type : 'value',
                           axisLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           axisTick: {show: false},
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           splitArea: {show: false}
                       }
                    ],
                    series: [
                        {
                            type:'line',
                            symbol: 'emptyCircle',
                            name: '接听率',
                            data: callInRate
                        },{
                            type:'line',
                            symbol: 'emptyCircle',
                            name: '20s接听率',
                            data: callIn20sRate
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };
            //呼入量趋势监控数据
            var getCallMonitorServiceDetailIn2 = function(){
                MonitorQuery.getCallMonitorServiceDetailIn(

                ).then(function(data){
                    var list = data.items || [];
                    // callIn          呼入数
                    // callInSucc      接听数
                    // answer20sCount  20s接听数
                    // callInRate      呼入接听率
                    // callIn20sRate   20s接听率
                    setServiceDetailInOption2(list);
                })
            };
            var setServiceDetailInOption2 = function(list){
                var timeList = [];

                var callIn = [];            //呼入数
                var callInSucc = [];        //接听数
                var answer20sCount = [];    //20s接听数

                for (var i = 0; i < list.length; i++) {
                    callIn.push(list[i].callIn);
                    callInSucc.push(list[i].callInSucc);
                    answer20sCount.push(list[i].answer20sCount);
                    timeList.push(i);
                };

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '呼入量趋势监控',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#1FCDCF","#4D9DFE","#FFB675"],
                    grid: {
                        // x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top',
                        padding: 30,
                        // itemWidth: 10,
                        // itemHeight: 10,
                        data: [{
                            name: '呼入数',
                            icon: 'force'
                        },{
                            name: '接听数',
                            icon: 'force'
                        },{
                            name: '20s接听数',
                            icon: 'force'
                        }]
                    },
                    xAxis : [
                       {
                            type : 'category',
                            data : timeList,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#99A6BF',
                                    width: 1
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#F2F2F2',
                                    width: 1
                                }
                            },
                            axisTick: {show: false},
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8F95A6',
                                    fontSize: 12
                                }
                            }
                       }
                    ],
                    yAxis : [
                       {
                           type : 'value',
                           axisLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           axisTick: {show: false},
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           splitArea: {show: false}
                       }
                    ],
                    series: [
                        {
                            z: 1,
                            type:'line',
                            symbol: 'emptyCircle',
                            name: '呼入数',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        color: "#1FCDCF",
                                        type: 'default'
                                    }
                                }
                            },
                            data: callIn
                        },{
                            z: 2,
                            type:'line',
                            symbol: 'emptyCircle',
                            name: '接听数',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        color: "#4D9DFE",
                                        type: 'default'
                                    }
                                }
                            },
                            data: callInSucc
                        },{
                            z: 3,
                            type:'line',
                            symbol: 'emptyCircle',
                            name: '20s接听数',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        color: "#FFB675",
                                        type: 'default'
                                    }
                                }
                            },
                            data: answer20sCount
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };

            //首次响应时间-在线
            var getFirstResponse = function(){
                MonitorQuery.queryFirstResponseChart(

                ).then(function(data){
                    var list = data.items || [];
                    setFirstResponseOption(list);
                })
            };
            var setFirstResponseOption = function(list){

                var nameList = [];
                var nameList2 = [];
                var valueList = [];
                var shadowList = [];
                var total = 0;

                for (var i = 0; i < list.length; i++) {
                    nameList.push(list[i].title);       //名称列表
                    nameList2.push(list[i].ratioStr);   //右侧标题
                    valueList.push(list[i].count);      //数值
                    total += list[i].count;
                };
                for (var i = 0; i < list.length; i++) {
                    shadowList.push(total);
                };
                nameList.reverse();
                valueList.reverse();

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '首次响应时间',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#FFB675"],
                    grid: {
                        // x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    xAxis : [
                       {
                            min: 0,
                            max: total,
                            type : 'value',
                            axisTick: {show: false},
                            axisLabel: {show: false},
                            splitLine: {show: false},
                            axisLine: {show: false}
                       }
                    ],
                    yAxis : [
                       {
                           type : 'category',
                           data : nameList,
                           axisTick: {
                               show: false
                           },
                           axisLine: {show: false},
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           splitLine: {show: false},
                           splitArea: {show: false}
                       },{
                           type : 'category',
                           data : nameList2,
                           positon: 'right',
                           axisTick: {
                               show: false
                           },
                           axisLine: {
                               show: false,
                               lineStyle: {
                                   color: '#99A6BF',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F0F0F0',
                                   width: 1
                               }
                           },
                           splitArea: {
                               show: false
                           }
                       }
                    ],
                    series: [
                        {
                            z: 3,
                            type:'bar',
                            barGap:'-100%', //柱间距离，默认为柱形宽度的30%
                            barCategoryGap: '20%',
                            name: '首次响应时间',
                            // itemStyle: {
                            //     normal: {
                            //         label: {
                            //             show: true,
                            //             position: 'inside'
                            //         }
                            //     }
                            // },
                            data: valueList
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };
            //排队离开趋势-在线
            var getQueueLeave = function(){
                MonitorQuery.queryQueueLeaveLineChart(

                ).then(function(data){
                    var list = data.items[0] || [];
                    setQetQueueLeaveOption(list);
                })
            };
            var setQetQueueLeaveOption = function(list){

                var timeList = [];
                var valueList = [];

                for (var i = 0; i < list.length; i++) {
                    timeList.push(getTimeStr(list[i].time));       //时间列表
                    valueList.push(list[i].value);      //数值
                };

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '排队离开趋势',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#4D9DFE"],
                    grid: {
                        // x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top',
                        padding: 30,
                        // itemWidth: 10,
                        // itemHeight: 10,
                        data: [{
                            name: '排队离开趋势',
                            icon: 'bar'
                        }]
                    },
                    xAxis : [
                       {
                            type : 'category',
                            data : timeList,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#99A6BF',
                                    width: 1
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#F2F2F2',
                                    width: 1
                                }
                            },
                            axisTick: {show: false},
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8F95A6',
                                    fontSize: 12
                                }
                            }
                       }
                    ],
                    yAxis : [
                       {
                           type : 'value',
                           axisLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           axisTick: {show: false},
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           splitArea: {show: false}
                       }
                    ],
                    series: [
                        {
                            z: 3,
                            type:'line',
                            symbol: 'emptyCircle',
                            name: '排队离开趋势',
                            data: valueList
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };
            //当前客服状态-在线
            var getAdminStatus = function(){
                MonitorQuery.getAdminStatus(

                ).then(function(data){
                    var data = data || {};
                    setAdminStatusOption(data);
                })
            };
            var setAdminStatusOption = function(data){

                var adminBusy = data.adminBusy || {},
                    adminOnline = data.adminOnline || {},
                    adminLeave = data.adminLeave || {};


                var nameList = ['在线','忙碌','离线'];
                var valueList = [adminOnline.count, adminBusy.count, adminLeave.count];

                var sum = adminOnline.count + adminBusy.count + adminLeave.count;

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '当前客服工作状态',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#4D9DFE"],
                    grid: {
                        // x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    xAxis : [
                       {
                            type : 'category',
                            data : nameList,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#99A6BF',
                                    width: 1
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#F2F2F2',
                                    width: 1
                                }
                            },
                            axisTick: {show: false},
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#8F95A6',
                                    fontSize: 12
                                }
                            }
                       }
                    ],
                    yAxis : [
                       {
                           type : 'value',
                           axisLine: {
                               show: false,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           axisTick: {show: false},
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F2F2F2',
                                   width: 1
                               }
                           },
                           splitArea: {show: false}
                       }
                    ],
                    series: [
                        {
                            z: 3,
                            type:'bar',
                            name: '当前客服工作状态',
                            data: valueList
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };
            //今日客户来源-在线
            var getVisitorSourceChart = function(){
                MonitorQuery.getVisitorSourceChart(

                ).then(function(data){
                    var list = data.items || [];
                    setVisitorSourceOption(list);
                })
            };
            var setVisitorSourceOption = function(list){
                var nameList = [];
                var nameList2 = [];
                var valueList = [];
                var shadowList = [];
                var total = 0;

                for (var i = 0; i < list.length; i++) {
                    nameList.push(list[i].title);       //名称列表
                    nameList2.push(list[i].count);   //右侧标题
                    valueList.push(list[i].count);      //数值
                    total += list[i].count;
                };
                for (var i = 0; i < list.length; i++) {
                    shadowList.push(total);
                };
                nameList.reverse();
                nameList2.reverse();
                valueList.reverse();

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '今日客户来源',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#1FCDCF"],
                    grid: {
                        x: 100,  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    xAxis : [
                       {
                            min: 0,
                            max: total,
                            type : 'value',
                            axisTick: {show: false},
                            axisLabel: {show: false},
                            splitLine: {show: false},
                            axisLine: {show: false}
                       }
                    ],
                    yAxis : [
                       {
                           type : 'category',
                           data : nameList,
                           axisTick: {
                               show: false
                           },
                           axisLine: {show: false},
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           splitLine: {show: false},
                           splitArea: {show: false}
                       },{
                           type : 'category',
                           data : nameList2,
                           positon: 'right',
                           axisTick: {
                               show: false
                           },
                           axisLine: {
                               show: false,
                               lineStyle: {
                                   color: '#99A6BF',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F0F0F0',
                                   width: 1
                               }
                           },
                           splitArea: {
                               show: false
                           }
                       }
                    ],
                    series: [
                        {
                            z: 3,
                            type:'bar',
                            barGap:'-100%', //柱间距离，默认为柱形宽度的30%
                            barCategoryGap: '20%',
                            name: '今日客户来源',
                            // itemStyle: {
                            //     normal: {
                            //         label: {
                            //             show: true,
                            //             position: 'inside'
                            //         }
                            //     }
                            // },
                            data: valueList
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };
            //今日会话细分对比-在线
            var getSessionStatsChart = function(){
                MonitorQuery.getSessionStatsChart(

                ).then(function(data){
                    var list = data.items || [];
                    setSessionStatsOption(list);
                })
            };
            var setSessionStatsOption = function(list){
                var nameList = [];
                var nameList2 = [];
                var valueList = [];
                var shadowList = [];
                var total = 0;

                for (var i = 0; i < list.length; i++) {
                    nameList.push(list[i].title);       //名称列表
                    nameList2.push(list[i].count);   //右侧标题
                    valueList.push(list[i].count);      //数值
                    total += list[i].count;
                };
                for (var i = 0; i < list.length; i++) {
                    shadowList.push(total);
                };
                nameList.reverse();
                nameList2.reverse();
                valueList.reverse();

                option = {
                    animation: false,
                    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                           effect: {
                               n: 0
                           }
                       }
                    },
                    //标题
                    title: {
                        x: 'left',
                        y: 'top',
                        text: '今日会话细分对比',
                        padding: 20,
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
                        }
                    },
                    color: ["#1FCDCF"],
                    grid: {
                        x: '130',  //左上角x
                        // y1: 0,  //左上角y
                        // x2: 120, //右下角x
                        // y2: 20,  //右下角y
                        borderWidth: 0
                    },
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    calculable : false,
                    xAxis : [
                       {
                            min: 0,
                            max: total,
                            type : 'value',
                            axisTick: {show: false},
                            axisLabel: {show: false},
                            splitLine: {show: false},
                            axisLine: {show: false}
                       }
                    ],
                    yAxis : [
                       {
                           type : 'category',
                           data : nameList,
                           axisTick: {
                               show: false
                           },
                           axisLine: {show: false},
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           splitLine: {show: false},
                           splitArea: {show: false}
                       },{
                           type : 'category',
                           data : nameList2,
                           positon: 'right',
                           axisTick: {
                               show: false
                           },
                           axisLine: {
                               show: false,
                               lineStyle: {
                                   color: '#99A6BF',
                                   width: 1
                               }
                           },
                           axisLabel: {
                               textStyle: {
                                   color: '#8F95A6',
                                   fontSize: 12
                               }
                           },
                           splitLine: {
                               show: true,
                               lineStyle: {
                                   color: '#F0F0F0',
                                   width: 1
                               }
                           },
                           splitArea: {
                               show: false
                           }
                       }
                    ],
                    series: [
                        {
                            z: 3,
                            type:'bar',
                            barGap:'-100%', //柱间距离，默认为柱形宽度的30%
                            barCategoryGap: '20%',
                            name: '今日会话细分对比',
                            // itemStyle: {
                            //     normal: {
                            //         label: {
                            //             show: true,
                            //             position: 'inside'
                            //         }
                            //     }
                            // },
                            data: valueList
                        }
                    ]
                };


                render($node.find('.js-chart-render')[0], option);
            };

            /*
            *  渲染
            *
            */

            var render = function(dom, option){
                myChartSource = echarts.init(dom);
                myChartSource.setOption(option);
            };

            var init = function() {
                initConfig();
                initParams();
                initFunc();
                switchData();
            };
            init();
        };

        return {
            'restrict': 'A',
            'replace': true,
            'scope': {
                'chartType': '=',           //online call
                'chartName': '=',          //当前数据名称
                'groupIds': '='           //技能组
            },
            'templateUrl': "views/directive/monitor/zc-chart-monitor.html",
            'link': link
        };
    }
])
