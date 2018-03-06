angular.module("zc").directive('zcChartBar',['$timeout',function($timeout){
	/** 线形图表 **/
	var link = function(s, e){
		var $scope = s,
			option = {},
			$node = $(e[0]);

			// var myChart = echarts.init($node.find('.js-chart-box')[0]);
			var myChart = echarts.init($node[0]);

			//生成图表
			var dataAxis = ['在线'];
			var data = [220, 182];
			var yMax = 500;
			var dataShadow = [];

			for (var i = 0; i < data.length; i++) {
			    dataShadow.push(yMax);
			}

			option = {
				color: ['#62aefa','#50d0da','#fc769d','#be70f5','#fa9d31','#f5756e','#8bd153','#fadd31'],
			    title: {
			        text: '在线在线',
			        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
			    },
			    xAxis: {
			        data: dataAxis,
			        axisLabel: {
			            inside: true,
			            textStyle: {
			                color: '#fff'
			            }
			        },
			        axisTick: {
			            show: false
			        },
			        axisLine: {
			            show: false
			        },
			        z: 10
			    },
			    yAxis: {
			        axisLine: {
			            show: false
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			            textStyle: {
			                color: '#999'
			            }
			        }
			    },
				legend: {
					data: ['1','2']
				},
			    dataZoom: [
			        {
			            type: 'inside'
			        }
			    ],
			    series: [
			        {
			            type: 'bar',
						name: '在线',
			            data: data
			        },
					{
			            type: 'bar',
						name: '忙碌',
			            data: data
			        }
			    ]
			};

			// Enable data zoom when user click bar.
			var zoomSize = 6;
			myChart.on('click', function (params) {
			    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
			    myChart.dispatchAction({
			        type: 'dataZoom',
			        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
			    });
			});
			// 渲染
			myChart.setOption(option);

			$(window).resize(function () {
              $scope.$apply(function () {
                console.info("重置");
                myChart.resize()
              })
            });
            var initEvent = function(){
				$scope.$on('echarts.bar.render', function(ev, uuid, dataList){
					if($scope.uuid === uuid){
						console.log('render1',uuid);
						var xNameList = [];
						var onlineValue = [];
						var busyValue = [];
						for(var i=0;i<dataList.length;i++){
							if(dataList[i].name == '在线'){
								onlineValue.push(dataList[i].value);
							}else {
								busyValue.push(dataList[i].value);
							};
							xNameList.push(dataList[i].name);
						};
						option.series[0].data = onlineValue;
						option.series[1].data = busyValue;
						option.xAxis.data = xNameList;
						option.title.subtext = 'xxxxxxxxbar';
						//图例
						// option.legend.data = xNameList;
						// 渲染
						myChart.setOption(option);
					};
				});

			};
            var init = function(){
            	initEvent();
            };
            init();
	};

	return {
		'restrict': 'A',
		'replace': true,
		'scope': {
			'chartItem': '=',
			'uuid': '@'
		},
		'templateUrl': 'views/directives/zcChartBar.html',
		link: link
	}
}])

angular.module("zc").directive('zcChartLine',[function(){
	/** 线形图表 **/
	var link = function(s, e){
		var $scope = s,
			option = {},
			$node = $(e[0]);

			var myChart = echarts.init($node[0]);

			option = {
			    title: {
			        text: '堆叠区域图'
			    },
			    tooltip : {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            label: {
			                backgroundColor: '#6a7985'
			            }
			        }
			    },
			    legend: {
			        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {}
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['周一','周二','周三','周四','周五','周六','周日']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'邮件营销',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:[120, 132, 101, 134, 90, 230, 210]
			        },
			        {
			            name:'联盟广告',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'视频广告',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:[150, 232, 201, 154, 190, 330, 410]
			        },
			        {
			            name:'直接访问',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:[320, 332, 301, 334, 390, 330, 320]
			        },
			        {
			            name:'搜索引擎',
			            type:'line',
			            stack: '总量',
			            label: {
			                normal: {
			                    show: true,
			                    position: 'top'
			                }
			            },
			            areaStyle: {normal: {}},
			            data:[820, 932, 901, 934, 1290, 1330, 1320]
			        }
			    ]
			};
			// 渲染
			myChart.setOption(option);

			$(window).resize(function () {
              $scope.$apply(function () {
                console.info("重置");
                myChart.resize()
              })
            });
            var initEvent = function(){
				$scope.$on('echarts.line.render', function(ev, uuid){
					
					if($scope.uuid === uuid){
						console.log('uuid',$scope.uuid);
						// 渲染
						myChart.setOption(option);
					};
				});
			};
            var init = function(){
            	initEvent();
            };
            init();
	};

	return {
		'restrict': 'A',
		'replace': true,
		'scope': {
			'chartItem': '='
		},
		'templateUrl': 'views/directives/zcChartLine.html',
		link: link
	}
}])
angular.module("zc").directive('zcChartPie',[function(){
	/** 线形图表 **/
	var link = function(s, e){
		var $scope = s,
			option = {},
			$node = $(e[0]);

			// var data = genData(2);

			var num = 0;

			var myChart = echarts.init($node[0]);

			option = {
				color: ['#62aefa','#50d0da','#fc769d','#be70f5','#fa9d31','#f5756e','#8bd153','#fadd31'],
				textStyle: {
					fontSize: '16px'
				},
			    title : {
			        text: '同名数量统计',
			        subtext: '纯属虚构',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    series : [
			        {
			            name: '姓名',
			            type: 'pie',
			            radius : '55%',
			            center: ['40%', '50%'],
			            data: [],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            },
						label: {
							show: true,
							fontSize: '20',
							fontWeight: 'bold'
						}
			        }
			    ]
			};

			function genData(count) {
			    var nameList = ['赵', '钱'];
			    var legendData = [];
			    var seriesData = [];
			    var selected = {};
			    for (var i = 0; i < 2; i++) {
			        name = Math.random() > 0.65
			            ? makeWord(4, 1) + '·' + makeWord(3, 0)
			            : makeWord(2, 1);
			        legendData.push(name);
			        seriesData.push({
			            name: name,
			            value: Math.round(Math.random() * 100000)
			        });
			        selected[name] = i < 6;
			    }

			    return {
			        legendData: legendData,
			        seriesData: seriesData,
			        selected: selected
			    };

			    function makeWord(max, min) {
			        var nameLen = Math.ceil(Math.random() * max + min);
			        var name = [];
			        for (var i = 0; i < nameLen; i++) {
			            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
			        }
			        return name.join('');
			    }
			};

			$(window).resize(function () {
              $scope.$apply(function () {
                console.info("重置");
                myChart.resize();
              })
            });
			var initEvent = function(){
				$scope.$on('echarts.pie.render', function(ev, uuid, dataList){
					if($scope.uuid === uuid){
						console.log('render1',uuid);
						option.series[0].data = dataList;
						option.title.subtext = 'xxxxxxxx';
						// 渲染
						myChart.setOption(option);
					};
				});
			};
            var init = function(){
            	initEvent();
            };
            init();
	};

	return {
		'restrict': 'A',
		'replace': true,
		'scope': {
			'chartItem': '=',
			'uuid': '@'
		},
		'templateUrl': 'views/directives/zcChartPie.html',
		link: link
	}
}])
